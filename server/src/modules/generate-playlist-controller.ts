import { Request, Response } from "express";
import { getSpotifyToken } from "../services/get-spotify-token";
import { FindTracks, FindAllProps } from "../services/find-tracks";
import { AddItensPlaylist } from "../services/add-itens-playlist";

interface IPayload extends FindAllProps {
  playlist_id: string;
  OAuthToken: string;
}

export class GeneratePlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { songsQty, artists, playlist_id, OAuthToken }: IPayload =
        request.body;

      const access_token = await getSpotifyToken();

      const findTracks = new FindTracks(access_token);

      const tracks = await findTracks.findAllTracks({
        songsQty,
        artists,
      });

      if (tracks.length === 0) {
        return response
          .status(200)
          .json({ message: "Nenhuma track encontrada" });
      }

      await AddItensPlaylist({
        playlist_id,
        tracks,
        OAuthToken,
      });

      return response
        .status(200)
        .json({ message: "Musicas adicionadas na playlist com sucesso" });
    } catch (error: any) {
      return response.status(401).json({
        message: "Erro ao criar playlist ",
        error: error?.response?.data ?? "unknow error",
      });
    }
  }
}
