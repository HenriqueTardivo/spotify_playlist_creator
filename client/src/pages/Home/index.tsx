import { useContext, useEffect, useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { ArtistsGrid } from "../../components/ArtistsGrid";
import { PlaylistContext } from "../../contexts/playlist-context";

import "./styles.scss";

export function Home() {
  const navigate = useNavigate();

  const [artists, setArtists] = useState<string[]>([]),
    artistInput = useRef<HTMLInputElement>(null),
    songsQtyInput = useRef<HTMLInputElement>(null),
    playlistInput = useRef<HTMLInputElement>(null),
    { auth, isValidRequest, createPlaylist } = useContext(PlaylistContext);

  function generatePlaylist() {
    if (!auth.OAuthToken) return redirect("/login");

    const request = {
      artists,
      songsQty: songsQtyInput.current?.value,
      playlist_id: playlistInput.current?.value,
      OAuthToken: auth.OAuthToken,
      expires_in: auth.expires_in,
    };

    if (isValidRequest(request)) {
      createPlaylist(request);
      return navigate("/playlist");
    }
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

  useEffect(() => {
    !auth.hasOwnProperty("OAuthToken") && navigate("/login");
  });

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
            onKeyDown={(key) => {
              if (key.key === "enter") handleAddArtist;
            }}
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
