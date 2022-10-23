import PlaylistProvider from "./contexts/playlist-context";
import "./global.scss";
import { Rotues } from "./Routes";

export default function App() {
  return (
    <PlaylistProvider>
      <Rotues />
    </PlaylistProvider>
  );
}
