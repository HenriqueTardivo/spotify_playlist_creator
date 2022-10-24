import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PlaylistContext } from "../../contexts/playlist-context";

export function Redirect() {
  const navigate = useNavigate(),
    { setRequestData } = useContext(PlaylistContext);

  useEffect(() => {
    const hash = window.location.hash,
      authResponse: string[] = hash.split("&"),
      oauthToken = {
        access_token: authResponse.find((a) => a.includes("access_token")),
        expires_in: authResponse.find((a) => a.includes("expires_in")),
      };

    if (oauthToken.access_token && oauthToken.expires_in) {
      setRequestData({
        OAuthToken: oauthToken.access_token,
        expires_in: Number(oauthToken.expires_in),
      });
      return navigate("/home");
    }

    return navigate("/login");
  });

  return <h1>Redirencionando...</h1>;
}
