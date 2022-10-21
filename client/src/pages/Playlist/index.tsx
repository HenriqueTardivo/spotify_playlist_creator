import { Check, CircleNotch } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { api } from "../../service/api";
import "./styles.scss";

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
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const requestData = localStorage.getItem("requestData");

  //   const makeRequest = async () => {
  //     await api
  //       .post("generate-playlist", requestData)
  //       .then(() => setIsLoading(false));
  //   };

  //   makeRequest();
  // });

  return (
    <div className="playlistPage">
      {isLoading ? (
        <div className="container sucesso ">
          <ClipLoader color="black" size={32} />
          <strong>A playlist está sendo criada</strong>
        </div>
      ) : (
        <div className="container sucesso">
          <Check size={32} />
          <strong>Playlist criada com sucesso!</strong>

          <button onClick={() => navigate("home")}>Voltar</button>
        </div>
      )}
    </div>
  );
}
