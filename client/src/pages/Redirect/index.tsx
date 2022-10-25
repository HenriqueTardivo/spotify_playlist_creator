import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlaylistContext } from "../../contexts/playlist-context";

export function Redirect() {
  const navigate = useNavigate(),
    { setAuth } = useContext(PlaylistContext);

  useEffect(() => {
    const hash = window.location.hash,
      authResponse: string[] = hash.split("&"),
      oauthToken = {
        access_token: authResponse.find((a) => a.includes("access_token")),
        expires_in: authResponse.find((a) => a.includes("expires_in")),
      };

    if (oauthToken.access_token && oauthToken.expires_in) {
      setAuth({
        OAuthToken: oauthToken.access_token.split("=")[1],
        expires_in: Number(oauthToken.expires_in.split("=")[1]),
      });
      navigate("/home");
    }
  });

  return <h1>Redirencionando...</h1>;
}
