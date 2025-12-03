"use client";

import { useRef, useState } from "react";
import MeditationBenefitsCarousel from "../../components/MeditationBenefits";

const Meditation = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <>
            <div className="mt-30 max-md:mt-20 mx-auto w-fit max-md:w-full">

                {!videoLoaded && <div className="h-[720] text-2xl max-md:text-xl flex justify-center items-center">Loading video...</div>}
                <video
                    className="max-md:aspect-9/16 object-cover object-center"
                    onLoadedData={() => setVideoLoaded(true)}
                    ref={videoRef}
                    src="/music/Forest-Meditation.mp4"
                    type="video/mp4"
                    loop
                ></video>

            </div>

            <div className="mx-auto w-fit mt-6 max-md:scale-80">
                {!isPlaying ? (

                    <button
                        className="cursor-pointer py-3 px-5 soft-green-bg rounded-full font-semibold"
                        onClick={() => {
                            if (videoRef.current) {
                                videoRef.current.play();
                                setIsPlaying(true);
                            }
                        }}
                    >
                        Start Meditation
                    </button>
                ) : (

                    <button
                        className="cursor-pointer py-3 px-5 soft-green-bg rounded-full font-semibold"
                        onClick={() => {
                            if (videoRef.current) {
                                videoRef.current.pause();
                                setIsPlaying(false);
                            }
                        }}
                    >
                        End Meditation
                    </button>
                )}
            </div>


            <MeditationBenefitsCarousel />
        </>
    );
};

export default Meditation;
