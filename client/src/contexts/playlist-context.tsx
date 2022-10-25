import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { api } from "../service/api";

export interface RequestData extends IAuth {
  artists: string[];
  songsQty: number;
  playlist_id: string;
}

interface IAuth {
  OAuthToken: string;
  expires_in: number;
}

interface Provider {
  auth: IAuth;
  setAuth: (prop: IAuth) => void;
  isValidRequest: (data: any) => data is RequestData;
  createPlaylist: (requestData: RequestData) => Promise<void>;
  isLoading: boolean;
}

interface ProviderProps {
  children: ReactNode;
}

export const PlaylistContext = createContext<Provider>({} as Provider);

export default function PlaylistProvider({ children }: ProviderProps) {
  const [auth, setAuth] = useState<IAuth>(
    JSON.parse(localStorage.getItem("auth") || "{}") as IAuth
  );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const isValidRequest = (data: any): data is RequestData => {
    if (
      data.artists &&
      data.artists.length > 0 &&
      data.songsQty &&
      data.playlist_id &&
      data.OAuthToken &&
      data.expires_in
    )
      return true;
    return false;
  };

  async function createPlaylist(requestData: RequestData) {
    setIsLoading(true);
    await api
      .post("generate-playlist", requestData)
      .then(() => setIsLoading(false));
  }

  return (
    <PlaylistContext.Provider
      value={{ auth, setAuth, isValidRequest, createPlaylist, isLoading }}
    >
      {children}
    </PlaylistContext.Provider>
  );
}
