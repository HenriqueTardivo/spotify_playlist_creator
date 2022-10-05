import axios from "axios";
import { endpoints } from "../shared/utils/endpoints";
import { AppError } from "../shared/error/AppError";
import { serialize } from "../shared/utils/serialize";

interface TokenResponse {
  access_token: string;
}

export async function getSpotifyToken(): Promise<string> {
  try {
    const headers = {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
        ).toString("base64"),
    };

    const formData = serialize({ grant_type: "client_credential" });

    const config = {
      method: "POST",
      url: endpoints.TOKEN,
      data: formData,
      headers,
    };

    const { data } = await axios<TokenResponse>(config);

    return data.access_token;
  } catch (error: any) {
    throw new AppError("Erro ao buscar o token do spotify" + error?.response);
  }
}
