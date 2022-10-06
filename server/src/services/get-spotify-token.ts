import axios from "axios";
import { endpoints } from "../shared/utils/endpoints";
import { serialize } from "../shared/utils/serialize";

interface TokenResponse {
  access_token: string;
}

export async function getSpotifyToken(): Promise<string> {
  const headers = {
    Authorization:
      "Basic " +
      Buffer.from(
        process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET
      ).toString("base64"),
  };

  const formData = serialize({ grant_type: "client_credentials" });

  const config = {
    method: "POST",
    url: endpoints.TOKEN,
    data: formData,
    headers,
  };

  const { data } = await axios<TokenResponse>(config);

  return data.access_token;
}
