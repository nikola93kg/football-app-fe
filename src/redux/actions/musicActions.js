import { PLAY_MUSIC, PAUSE_MUSIC } from "../types/types";

export const playMusic = () => ({
  type: PLAY_MUSIC,
});

export const pauseMusic = () => ({
  type: PAUSE_MUSIC,
});