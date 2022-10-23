import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtistsGrid } from "../../components/ArtistsGrid";
import { PlaylistContext } from "../../contexts/playlist-context";

import "./styles.scss";

export function Home() {
  const navigate = useNavigate();

  const [artists, setArtists] = useState<string[]>([]),
    [authToken, setAuthToken] = useState<string | undefined>(undefined),
    artistInput = useRef<HTMLInputElement>(null),
    songsQtyInput = useRef<HTMLInputElement>(null),
    playlistInput = useRef<HTMLInputElement>(null),
    { setRequestData, isValidRequest } = useContext(PlaylistContext);

  useEffect(() => {
    const hash = window.location.hash;

    const access_token = hash.split("&")[0].split("=")[1];

    if (!access_token) navigate("/login");

    setAuthToken(access_token);
  });

  function generatePlaylist() {
    const requestData = {
      artists,
      songsQty: artistInput.current?.value,
      playlist_id: playlistInput.current?.value,
      OAuthToken: authToken,
    };

    if (isValidRequest(requestData)) {
      setRequestData(requestData);
      return navigate("/playlist");
    }

    // TODO toast de erro, parametros faltando
  }

  function handleAddArtist() {
    if (artistInput.current?.value) {
      setArtists(
        artists
          ? [...artists, artistInput.current.value]
          : [artistInput.current.value]
      );

      artistInput.current.value = "";
    }
  }

  return (
    <div className="homePage">
      <div className="container formBox">
        <div className="form">
          <label htmlFor="playlist">URL ou ID da playlist</label>
          <input
            type="text"
            ref={playlistInput}
            name="playlist"
            placeholder="https://open.spotify.com/playlist/63Tv711O6hf5ZwOEPyVMgc?si=90439958675a4bdc"
          />
        </div>

        <div className="form">
          <label htmlFor="">Quantidade de músicas para cada artista</label>
          <input
            type="number"
            ref={songsQtyInput}
            name="songsQty"
            placeholder="5"
          />
        </div>

        <div className="form">
          <label htmlFor="">Artista</label>
          <input
            type="text"
            name="artist"
            ref={artistInput}
            placeholder={"The Beatles"}
          />
        </div>

        <div className="form">
          <button onClick={generatePlaylist}>Gerar playlist</button>
          <button onClick={handleAddArtist}>Adicionar artista</button>
        </div>

        <ArtistsGrid
          artists={artists}
          removeArtist={(artist) =>
            setArtists(artists.filter((a) => a !== artist))
          }
        />
      </div>
    </div>
  );
}
