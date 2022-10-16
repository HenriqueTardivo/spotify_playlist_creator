import { useEffect, useState } from "react";
import { Loading } from "../../components/Loading";

export interface RequestData {
  artists: string[];
  songsQty: number;
  playlist_id: string;
  OAuthToken: string;
}

export const isValidRequest = (data: any): data is RequestData => {
  if (
    data.artists &&
    data.artists.length > 0 &&
    data.songsQty &&
    data.playlist_id &&
    data.OAuthToken
  )
    return true;
  return false;
};

export function Playlist() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {});

  if (isLoading) {
    return <Loading />;
  }

  return; //TODO tela de sucesso playlist criada;
}
