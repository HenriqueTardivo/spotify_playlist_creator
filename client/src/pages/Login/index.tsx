import "./styles.scss";

export function Login() {
  const redirectUrl = [
    "https://accounts.spotify.com/authorize",
    "?response_type=token",
    "&client_id=" + import.meta.env.VITE_CLIENT_ID,
    "&redirect_uri=" + import.meta.env.VITE_REDIRECT_URL,
    "&scope=",
    ["playlist-modify-public", "playlist-modify-private"].join("%20"),
    "&response_type=token&show_dialog=true",
  ].join("");

  return (
    <div className="loginPage">
      <div className="container loginBox">
        <strong>Faça login com o Spotify para criar suas playlists!</strong>

        <div className="center">
          <button
            onClick={() => {
              const win: Window = window;
              win.location = redirectUrl;
            }}
          >
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}
