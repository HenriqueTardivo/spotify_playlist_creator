import { useRef, useState } from "react";
import { ArtistsGrid } from "../../components/ArtistsGrid/ArtistsGrid";
import "./styles.scss";

export function Home() {
  const [artists, setArtists] = useState<string[]>([]),
    artistInput = useRef<HTMLInputElement>(null);

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

  function removeArtist(artist: string) {
    setArtists(artists.filter((a) => a !== artist));
  }

  return (
    <div className="homePage">
      <div className="container formBox">
        <div className="form">
          <label htmlFor="playlist">URL ou ID da playlist</label>
          <input
            type="text"
            name="playlist"
            placeholder="https://open.spotify.com/playlist/63Tv711O6hf5ZwOEPyVMgc?si=90439958675a4bdc"
          />
        </div>

        <div className="form">
          <label htmlFor="">Quantidade de músicas para cada artista</label>
          <input type="number" name="songsQty" placeholder="5" />
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
          <button>Gerar playlist</button>
          <button onClick={handleAddArtist}>Adicionar artista</button>
        </div>

        <ArtistsGrid
          artists={artists}
          removeArtist={(artist) => removeArtist(artist)}
        />
      </div>
    </div>
  );
}
