import { Request, Response } from "express";
import { AppError } from "../shared/error/AppError";
import { getSpotifyToken } from "../services/get-spotify-token";
import { FindTracks, FindAllProps } from "../services/find-tracks";

export class GeneratePlaylistController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { songsQty, artists }: FindAllProps = request.body;

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

      return response.status(200).json({ message: "Sucesso", access_token });
    } catch (error) {
      throw new AppError("Erro ao criar playlist");
    }
  }
}
