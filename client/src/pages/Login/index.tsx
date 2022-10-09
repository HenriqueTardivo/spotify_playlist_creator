import "./styles.scss";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  return (
    <div className="loginPage">
      <div className="container loginBox">
        <strong>Faça login com o Spotify para criar suas playlists!</strong>

        <div className="center">
          <button onClick={() => navigate("/home")}>LOG IN</button>
        </div>
      </div>
    </div>
  );
}
