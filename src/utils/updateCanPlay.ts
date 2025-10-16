import { ISong } from "interfases/ISongBase";

export default function updateCanPlay(currentSong: ISong | null, playlist: ISong[]): { canPlayNext: boolean, canPlayPrev: boolean } {
    const index = currentSong ? playlist.findIndex(s => s.id === currentSong.id) : -1;
    if (index === -1) {
        return { canPlayNext: false, canPlayPrev: false };
    }

    return {
        canPlayNext: playlist.length > 1,
        canPlayPrev: playlist.length > 1,
    }
};