import { IAudioStore } from "interfases/IAudioStore";
import { ISongBase } from "interfases/ISongBase";
import playNextOrPrev from "utils/playNextOrPrev";
import updateCanPlay from "utils/updateCanPlay";
import { create } from "zustand";

const audio = new Audio();
let _audioListenersInitialized = false;

export const createAudioStore = <TSong extends ISongBase>() =>
    create<IAudioStore<TSong>>((set, get) => {

        if (!_audioListenersInitialized) {
            audio.addEventListener("canplay", () => audio.play());
            audio.addEventListener("play", () => set({ isPlaying: true }));
            audio.addEventListener("pause", () => set({ isPlaying: false }));
            audio.addEventListener("timeupdate", () => set({ time: audio.currentTime }));
            audio.addEventListener("volumechange", () => set({ volume: audio.volume }));
            audio.addEventListener("loadedmetadata", () =>
                set({ duration: audio.duration, time: 0 })
            );
            audio.addEventListener("ended", () => playNextOrPrev(1, get()));

            _audioListenersInitialized = true;
        }

        return {
            audio,
            playlist: [],
            currentSong: null,
            canPlayNext: false,
            canPlayPrev: false,
            lastPlaylistKey: null,
            isPlaying: false,
            time: 0,
            duration: 0,
            volume: 0.5,
            isMuted: false,

            playSong: (song) => {
                const { currentSong, togglePlay, playlist, buildUrlFn } = get();
                if (currentSong && currentSong.id === song.id) {
                    togglePlay();
                    return;
                }

                audio.pause();
                audio.src = buildUrlFn(song);
                audio.load();
                set({ currentSong: song, ...updateCanPlay(song, playlist) });
            },
            playNext: () => playNextOrPrev(1, get()),
            playPrev: () => playNextOrPrev(-1, get()),
            togglePlay: () => {
                if (audio.paused) audio.play();
                else audio.pause();
            },
            seekTime: (seconds: number) => {
                get().handleTime(audio.currentTime + seconds);
            },
            handleTime: (value) => {
                audio.currentTime = value;
                set({ time: value });
            },
            handleVolume: (value) => {
                audio.volume = value;
                audio.muted = value === 0;
                set({ volume: value, isMuted: value === 0 });
            },
            handleIsMuted: (value) => {
                audio.muted = value;
                set({ isMuted: value });
            },

            setPlaylist: (songs) => {
                set({ playlist: songs, ...updateCanPlay(get().currentSong, songs) });
            },
            addToPlaylist: (song) => {
                const { playlist, setPlaylist } = get();
                const filtered = playlist.filter((s) => s.id !== song.id);
                setPlaylist([...filtered, song]);
            },
            removeFromPlaylist: (song) => {
                const { playlist, setPlaylist } = get();
                setPlaylist(playlist.filter((s) => s.id !== song.id));
            },
            setAtIndexPlaylist: (from, to) => {
                const { playlist, setPlaylist } = get();
                if (from === to) return;
                const updated = [...playlist];
                const [moved] = updated.splice(from, 1);
                updated.splice(to, 0, moved);
                setPlaylist(updated);
            },
            setPlaylistByKey: (key, songs) => set((state) => {
                if (state.lastPlaylistKey === key) return {};
                state.setPlaylist(songs);
                return { lastPlaylistKey: key };
            }),


            buildUrlFn: (song) => song.url,
            setBuildUrlFn: (fn) => set({ buildUrlFn: fn }),
            reset: () => {
                const { audio } = get();
                audio.pause();
                audio.src = "";
                set({
                    playlist: [],
                    currentSong: null,
                    canPlayNext: false,
                    canPlayPrev: false,
                    lastPlaylistKey: null,
                    isPlaying: false,
                    time: 0,
                    duration: 0,
                    volume: 0.5,
                    isMuted: false,
                });
            },

        };
    });
