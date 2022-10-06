import axios from "axios";
import { endpoints } from "../shared/utils/endpoints";

interface Props {
  playlist_id: string;
  tracks: string[];
  OAuthToken: string;
}

export async function AddItensPlaylist(props: Props): Promise<void> {
  await axios.post(
    endpoints.ADD_ITENS_TO_PLAYLIST.replace("{playlist_id}", props.playlist_id),
    { uris: props.tracks },
    {
      headers: {
        Authorization: `Bearer ${props.OAuthToken}`,
      },
    }
  );
}
