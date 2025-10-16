export interface IAudioStore<TSong> {
    audio: HTMLAudioElement;

    playlist: TSong[];
    currentSong: TSong | null;
    canPlayNext: boolean;
    canPlayPrev: boolean;
    lastPlaylistKey: string | null;

    isPlaying: boolean;
    time: number;
    duration: number;
    volume: number;
    isMuted: boolean;

    playSong: (song: TSong) => void;
    playNext: () => void;
    playPrev: () => void;
    togglePlay: () => void;
    seekTime: (seconds: number) => void;
    handleTime: (value: number) => void;
    handleVolume: (value: number) => void;
    handleIsMuted: (value: boolean) => void;

    setPlaylist: (songs: TSong[]) => void;
    setPlaylistByKey: (key: string, songs: TSong[]) => void;
    addToPlaylist: (song: TSong) => void;
    removeFromPlaylist: (song: TSong) => void;
    setAtIndexPlaylist: (from: number, to: number) => void;

    // function to rewrite a URL
    // for example: <`${process.env.MY_API}/api/audio?url=${song.url}`>
    // otherwise song.url will be used
    buildUrlFn: (song: TSong) => string;
    setBuildUrlFn: (fn: (song: TSong) => string) => void;
    reset: () => void;
};