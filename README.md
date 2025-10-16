# audio-player-api-react-zustand

A lightweight Zustand-based audio store for React applications.
Easily manage playlists and control audio playback with a simple API.

---

## Features

- Built with Zustand for state management
- Play, pause, seek songs
- Next / previous track support
- Playlist management
- Extensible song interface (custom fields supported)

---

## Usage

Define your own song interface and create a store:
```TypeScript
interface MySong extends ISongBase {
  title: string;
  artist: string;
  coverUrl?: string;
}

export const useAudioStore = createAudioStore<MySong>();
```

Optionally, define how your audio source URL should be built:
```TypeScript
useAudioStore.getState().setBuildUrlFn((song: MySong) => {
    return `${process.env.MY_API}/api/audio?url=${song.url}`
})
```

## Installation

```bash
npm install audio-player-api-react-zustand
```