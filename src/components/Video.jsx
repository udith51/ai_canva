import React, { useEffect, useRef, useState } from 'react'
import './Video.css'
import videoSource from "../sample.mp4"
export default function Video() {

    const canvasRef = useRef(null);
    const videoRef = useRef(null);
    const [showControls, setShowControls] = useState(true);
    const [iconState, setIconState] = useState("play");

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
            } else {
                video.pause();
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

        canvas.addEventListener('click', togglePlayPause);
        canvas.addEventListener('mouseenter', handleMouseEnter);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            clearInterval(canvasInterval);
            canvas.removeEventListener('click', togglePlayPause);
            canvas.removeEventListener('mouseenter', handleMouseEnter);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
        };

    }, [])


    return (
        <div className="video">
            <canvas width="600" height="400" ref={canvasRef}></canvas>
            {showControls &&
                <div className="controls">
                    <div className="playPauseIcon" onClick={videoRef.current && videoRef.current.click()}>
                        {videoRef.current && videoRef.current.paused ? '▶️' : '⏸️'}
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
