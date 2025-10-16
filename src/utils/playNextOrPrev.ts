import { AudioStore } from "interfases/IAudioStore";
import clampIndex from "./clampIndex";

export default function playNextOrPrev(direction: 1 | -1, state: AudioStore) {
    const { currentSong, playlist, playSong } = state;
    if (!currentSong || playlist.length <= 1) return;
    const index = playlist.findIndex((s) => s.id === currentSong.id);
    if (index !== -1) {
        const nextSong = playlist[clampIndex(index + direction, playlist.length)];
        playSong(nextSong);
    }
};