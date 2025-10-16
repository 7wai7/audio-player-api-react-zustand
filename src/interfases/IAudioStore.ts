import ISong from "./ISong";

export interface AudioStore {
    audio: HTMLAudioElement;
    _audioListenersInitialized: boolean;

    playlist: ISong[];
    currentSong: ISong | null;
    canPlayNext: boolean;
    canPlayPrev: boolean;
    lastPlaylistKey: string | null;

    isPlaying: boolean;
    time: number;
    duration: number;
    volume: number;
    isMuted: boolean;

    playSong: (song: ISong) => void;
    playNext: () => void;
    playPrev: () => void;
    togglePlay: () => void;
    seekTime: (seconds: number) => void;
    handleTime: (value: number) => void;
    handleVolume: (value: number) => void;
    handleIsMuted: (value: boolean) => void;

    setPlaylist: (songs: ISong[]) => void;
    setPlaylistByKey: (key: string, songs: ISong[]) => void;
    addToPlaylist: (song: ISong) => void;
    removeFromPlaylist: (song: ISong) => void;
    setAtIndexPlaylist: (from: number, to: number) => void;

    // function to rewrite a URL
    // for example: <`${process.env.MY_API}/api/audio?url=${song.url}`>
    // otherwise song.url will be used
    buildUrlFn: (song: ISong) => string;
    setBuildUrlFn: (fn: () => string) => void;
    reset: () => void;
};