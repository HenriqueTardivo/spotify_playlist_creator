import { X } from "phosphor-react";
import "./styles.scss";

interface Props {
  artists: string[];
  removeArtist: (artist: string) => void;
}

export function ArtistsGrid({ artists, removeArtist }: Props) {
  return (
    <div className="artistGrid">
      {artists.map((artist, index) => (
        <button
          className="buttonGrid"
          key={index}
          onClick={() => removeArtist(artist)}
        >
          {artist}
          <X size={16} />
        </button>
      ))}
    </div>
  );
}
