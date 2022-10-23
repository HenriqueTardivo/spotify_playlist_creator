import { Check } from "phosphor-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { PlaylistContext } from "../../contexts/playlist-context";
import { api } from "../../service/api";
import "./styles.scss";

export function Playlist() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false),
    { requestData } = useContext(PlaylistContext);

  useEffect(() => {
    const makeRequest = async () => {
      await api
        .post("generate-playlist", requestData)
        .then(() => setIsLoading(false));
    };

    makeRequest();
  });

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
