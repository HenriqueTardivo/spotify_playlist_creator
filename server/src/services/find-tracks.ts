import axios from "axios";
import { endpoints } from "../shared/utils/endpoints";

interface IFindTracks {
  findAllTracks: (props: FindAllProps) => Promise<string[]>;
  findArtist: (artistName: string) => Promise<string>;
  findTopTracks: (artistId: string) => Promise<[{ id: string }]>;
}

export interface FindAllProps {
  songsQty: number;
  artists: string[];
}

interface FindArtistResponse {
  artists: {
    items: [{ id: string }];
  };
}

interface FindTracksResponse {
  tracks: [{ id: string }];
}

export class FindTracks implements IFindTracks {
  constructor(private readonly access_token: string) {}

  public async findAllTracks(props: FindAllProps): Promise<string[]> {
    const tracksPromise = props.artists.map(async (artist) => {
      const artistId = await this.findArtist(artist);
      if (!artistId) return "";

      const tracks = await this.findTopTracks(artistId);

      return tracks
        .slice(0, props.songsQty)
        .map((track) => `spotify:track:${track.id}`);
    });

    const tracks = (await Promise.all(tracksPromise)).filter(Boolean).flat();

    return tracks;
  }

  public async findArtist(artistName: string): Promise<string> {
    try {
      const { data } = await axios.get<FindArtistResponse>(
        endpoints.FIND_ARTIST,
        {
          params: {
            q: artistName,
            type: "artist",
          },
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        }
      );

      return data.artists.items[0].id;
    } catch (error) {
      throw new Error("Erro ao buscar artista");
    }
  }

  public async findTopTracks(artistId: string) {
    try {
      const { data } = await axios.get<FindTracksResponse>(
        endpoints.TOP_TRACKS.replace("{id}", artistId),
        {
          params: {
            market: "BR",
          },
          headers: {
            Authorization: `Bearer ${this.access_token}`,
          },
        }
      );

      return data.tracks;
    } catch (error) {
      throw new Error("Erro ao buscar artista ");
    }
  }
}
