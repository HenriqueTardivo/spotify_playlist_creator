import { createContext, ReactNode, useState } from "react";

export interface RequestData {
  artists?: string[];
  songsQty?: number;
  playlist_id?: string;
  OAuthToken: string;
  expires_in: number;
}

interface Provider {
  requestData: RequestData;
  setRequestData: (prop: RequestData) => void;
  isValidRequest: (data: any) => data is RequestData;
}

interface ProviderProps {
  children: ReactNode;
}

export const PlaylistContext = createContext<Provider>({} as Provider);

export default function PlaylistProvider({ children }: ProviderProps) {
  const [requestData, setRequestData] = useState<RequestData>(
    {} as RequestData
  );

  const isValidRequest = (data: any): data is RequestData => {
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

  return (
    <PlaylistContext.Provider
      value={{ requestData, setRequestData, isValidRequest }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
