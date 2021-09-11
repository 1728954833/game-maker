import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export interface VideoProps {
    src: string,
    type: 'audio' | 'video',
    autoPlay?: boolean,
    loop?: boolean,
    muted?: boolean,
    preload?: string,
    hidden?: boolean
}

export interface VideoState {
    duration: number,
    paused: boolean,
    muted: boolean,
    time: number,
    volume: number,
    speed: number
}

export interface Video {
    media: React.ReactElement<any>,
    mediaState: VideoState,
    play: () => void,
    rePlay: () => void,
    pause: () => void,
    mute: (muted: boolean) => void,
    setVolume: (volume: number) => void,
    seek: (time: number) => void,
    setSpeed: (value: number) => void,
}

const useVideo = (videoProps: VideoProps): Video => {
    const { type, ...rest } = videoProps
    const [mediaState, setMediaState] = useState<VideoState>({
        duration: 0,
        paused: true,
        muted: true,
        time: 0,
        volume: 0,
        speed: 1
    })
    const mediaRef = useRef<HTMLMediaElement>(null)
    const play = useCallback(() => {
        const el = mediaRef.current
        if (el) {
            el.play()
            setMediaState({
                ...mediaState,
                paused: false
            })
        }
    }, [mediaRef, mediaState])

    const pause = useCallback(() => {
        const el = mediaRef.current
        if (el) {
            el.pause()
            setMediaState({
                ...mediaState,
                paused: true
            })
        }
    }, [mediaRef, mediaState])


    const setSpeed = useCallback((speed: number) => {
        const el = mediaRef.current
        if (el) {
            el.playbackRate = speed
            setMediaState({
                ...mediaState,
                speed
            })
        }
    }, [mediaRef, mediaState])

    const mute = useCallback((muted: boolean) => {
        const el = mediaRef.current
        if (el) {
            el.muted = muted
            setMediaState({
                ...mediaState,
                muted
            })
        }
    }, [mediaRef, mediaState])

    const setVolume = useCallback((volume: number) => {
        const el = mediaRef.current
        if (el) {
            el.volume = volume
        }
    }, [mediaRef])

    const seek = useCallback((time: number) => {
        const el = mediaRef.current
        if (el) {
            time = Math.min(el.duration, Math.max(0, time))
            el.currentTime = time
        }
    }, [mediaRef])

    const rePlay = useCallback(() => {
        const el = mediaRef.current
        if (el) {
            seek(0)
            play()
        }
    }, [mediaRef, seek, play])

    const onDurationChange = () => {
        const el = mediaRef.current
        if (el) {
            setMediaState({
                ...mediaState,
                duration: el.duration
            })
        }
    }

    const onVolumeChange = () => {
        const el = mediaRef.current
        if (el) {
            setMediaState({
                ...mediaState,
                volume: el.volume
            })
        }
    }

    function onTimeUpdate() {
        const el = mediaRef.current
        if (el) {
            setMediaState({
                ...mediaState,
                time: el.currentTime
            })
        }
    }

    const media = React.createElement(type, {
        ref: mediaRef,
        ...rest,
        onDurationChange,
        onVolumeChange,
        onTimeUpdate,
    }, "你的浏览器不支持video标签")

    return {
        media,
        mediaState,
        play,
        seek,
        setSpeed,
        setVolume,
        mute,
        pause,
        rePlay
    }
}

export default useVideo;