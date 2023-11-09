import React, { useEffect, useRef, useState } from 'react'
import './Video.css'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
export default function Video({ videoFile, onDurationChange }) {

    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const [showControls, setShowControls] = useState(true);
    const [iconState, setIconState] = useState("pause");
    const [videoSource, setVideoSource] = useState(null);
    const [canPlay, setCanPlay] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const fps = 60;
        canvas.width = 600;
        canvas.height = 400;

        const drawImage = () => {
            const ctx = canvas.getContext('2d', { alpha: false });
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        };

        let canvasInterval;

        const togglePlayPause = () => {
            if (video.paused) {
                video.play();
                setIconState("pause");
            } else {
                video.pause();
                setIconState("play");
            }
        };

        video.onpause = function () {
            clearInterval(canvasInterval);
        };
        video.onended = function () {
            clearInterval(canvasInterval);
        };
        video.onplay = function () {
            clearInterval(canvasInterval);
            canvasInterval = window.setInterval(() => {
                drawImage(video);
            }, 1000 / fps);
        };

        const handleMouseEnter = () => {
            setShowControls(true);
        }
        const handleMouseLeave = () => {
            setShowControls(false);
        }
        const handleCanPlay = () => {
            setCanPlay(true);
        };
        const handleDurationChange = () => {
            onDurationChange(video.duration);
        };

        if (videoFile) {
            const videoURL = URL.createObjectURL(videoFile);
            setVideoSource(videoURL);
            video.load();
            canvas.addEventListener('click', togglePlayPause);
            video.addEventListener('durationchange', handleDurationChange);
        }

        video.addEventListener('canplay', handleCanPlay);
        canvas.addEventListener('mouseenter', handleMouseEnter);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(canvasInterval);
            canvas.removeEventListener('click', togglePlayPause);
            canvas.removeEventListener('mouseenter', handleMouseEnter);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            video.removeEventListener('canplay', handleCanPlay);
        };

    }, [videoFile, canPlay, onDurationChange])


    return (
        <div className="video">
            <canvas width="600" height="400" ref={canvasRef}></canvas>
            {videoFile && showControls &&
                <div className="controls">
                    <div className="playPauseIcon" onClick={videoRef.current && videoRef.current.click()}>
                        {iconState === "play" ? <AiFillPlayCircle className='icon' size={56} /> : <AiFillPauseCircle className='icon' size={56} />}
                    </div>
                </div>
            }
            <video
                controls
                width="600"
                height="400"
                autoPlay
                playsInline
                loop
                ref={videoRef}
                hidden
            >
                <source src={videoSource} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>

    )
}
