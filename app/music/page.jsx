'use client'

import { useState, useRef } from "react";

export default function MusicPlayer() {
    const tracks = [
        { title: "Soothing Guitar", src: "/music/guitar.mp3" },
        { title: "Upbeat Track", src: "/music/upbeat.mp3" },
        { title: "Lofi Beat", src: "/music/lofi.mp3" },
    ];

    const [currentTrack, setCurrentTrack] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const nextTrack = () => {
        const newIndex = (currentTrack + 1) % tracks.length;
        setCurrentTrack(newIndex);
        audioRef.current.load();
        audioRef.current.play();
    };

    const prevTrack = () => {
        const newIndex = (currentTrack - 1 + tracks.length) % tracks.length;
        setCurrentTrack(newIndex);
        audioRef.current.load();
        audioRef.current.play();
    };

    return (
        <div className="mx-auto mt-50 max-md:mt-30 px-40 max-md:px-10 py-20 rounded-2xl w-fit flex flex-col gap-8 max-md:gap-4 items-center bg-[#161616]">

            {/* Header */}
            <div className="flex items-center justify-center w-fit gap-1">
                <div><img src="/musicIcon.svg" alt="musicIcon" className="h-12 w-12 max-md:h-8 max-md:w-8"/></div>
                <div><h2 className="text-5xl max-md:text-4xl font-semibold text-blue-400">Set the Vibe </h2></div>
            </div>

            {/* Gif*/}
            <div>
                <img src="musicGif.gif" alt="musicGif" />
            </div>

            {/* Track Title */}
            <div className="text-2xl text-white">{tracks[currentTrack].title}</div>

            {/* Audio element */}
            <audio ref={audioRef} loop>
                <source src={tracks[currentTrack].src} type="audio/mpeg" />
            </audio>

            {/* Controls */}
            <div className="space-x-6">
                <button onClick={prevTrack} className="hover:cursor-pointer">
                    <img src="/prevSong.svg" alt="previous" height={50} width={50} />
                </button>

                <button onClick={togglePlay} className="hover:cursor-pointer">
                    {isPlaying ? <img src="/pause.svg" alt="pause" height={50} width={50} />
                        : <img src="/play.svg" alt="play" height={50} width={50} />}
                </button>

                <button onClick={nextTrack} className="hover:cursor-pointer">
                    <img src="/nextSong.svg" alt="next" height={50} width={50} />
                </button>
            </div>
        </div>
    );
}
