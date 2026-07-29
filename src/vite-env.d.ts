/// <reference types="vite/client" />

interface Window {
  onYouTubeIframeAPIReady?: () => void
  YT?: {
    Player: new (
      element: HTMLElement | string,
      options: {
        height?: string | number
        width?: string | number
        videoId?: string
        playerVars?: Record<string, number | string>
        events?: {
          onReady?: (event: { target: YouTubePlayerInstance }) => void
          onStateChange?: (event: { data: number; target: YouTubePlayerInstance }) => void
        }
      },
    ) => YouTubePlayerInstance
    PlayerState: {
      PLAYING: number
      PAUSED: number
      ENDED: number
    }
  }
}

interface YouTubePlayerInstance {
  playVideo: () => void
  pauseVideo: () => void
  destroy: () => void
}
