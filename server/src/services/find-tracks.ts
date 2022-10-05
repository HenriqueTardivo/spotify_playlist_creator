import axios from "axios";
import { endpoints } from "../shared/utils/endpoints";

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

export class FindTracks {
  constructor(private readonly access_token: string) {}

  async findAllTracks(props: FindAllProps): Promise<
    (
      | ""
      | {
          id: string;
        }[]
    )[]
  > {
    const tracksPromise = props.artists.map(async (artist) => {
      const artistId = await this.findArtist(artist);
      if (!artistId) return "";

      const tracks = await this.findTopTracks(artistId);

      return tracks.slice(0, props.songsQty);
    });

    const tracks = await Promise.all(tracksPromise);

    return tracks;
  }

  public async findArtist(artistName: string): Promise<string> {
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
  }

  public async findTopTracks(artistId: string) {
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
  }
}
