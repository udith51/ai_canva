import React, { useEffect, useRef, useState } from 'react'
import './Video.css'
import { AiFillPauseCircle, AiFillPlayCircle } from 'react-icons/ai';
export default function Video({ videoFile, videoSource, onDurationChange }) {

    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const [showControls, setShowControls] = useState(true);
    const [iconState, setIconState] = useState("pause");
    const [canPlay, setCanPlay] = useState(false);
    const width = 650;
    const height = 475;

    useEffect(() => {
        const canvas = canvasRef.current;
        const video = videoRef.current;
        const fps = 60;

        const drawImage = () => {
            const ctx = canvas.getContext('2d', { alpha: false });
            ctx.drawImage(video, 0, 0, width, height);
        };

        let canvasInterval;

        const togglePlayPause = () => {
            if (video.paused) {
                video.play();
                setIconState("pause");
            } else {
                video.pause();
                setIconState("play")
            }
        };
        video.onplay = () => {
            clearInterval(canvasInterval);
            canvasInterval = window.setInterval(() => {
                drawImage(video);
            }, 1000 / fps);
        };
        video.onpause = () => {
            clearInterval(canvasInterval);
        };
        video.onended = () => {
            clearInterval(canvasInterval);
        };

        const handleCanPlay = () => {
            setCanPlay(true);
        };
        const handleMouseEnter = () => {
            setShowControls(true);
        }
        const handleMouseLeave = () => {
            setShowControls(false);
        }
        const handleDurationChange = () => {
            onDurationChange(video.duration);
        };

        if (videoFile) {
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
    }, [videoFile, canPlay, onDurationChange]);



    return (
        <div className="video">
            <canvas width={width} height={height} ref={canvasRef}></canvas>
            {videoFile && showControls &&
                <div className="controls">
                    <div className="playPauseIcon"
                        onClick={videoRef.current && videoRef.current.click()}>
                        {iconState === "pause" ? <AiFillPauseCircle className='icon' size={56} /> : <AiFillPlayCircle className='icon' size={56} />}
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
