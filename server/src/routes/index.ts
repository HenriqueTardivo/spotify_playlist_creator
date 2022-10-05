import { Router } from "express";
import { GeneratePlaylistController } from "../modules/generate-playlist-controller";

const router = Router();

router.post("/generate-playlist", new GeneratePlaylistController().handle);

export { router };
