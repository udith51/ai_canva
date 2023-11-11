import React, { useState } from 'react';
import Video from '../components/Video';
import Metadata from '../components/Metadata';
import "./Home.css";
import { AiOutlineCloudUpload } from 'react-icons/ai';

export default function Home() {
    const [videoFile, setVideoFile] = useState(null);
    const [duration, setDuration] = useState(null);
    const [videoSource, setVideoSource] = useState(null);

    const handleFileChange = (e) => {
        e.target.files && setVideoFile(e.target.files[0]);
        setVideoSource(e.target.files && URL.createObjectURL(e.target.files[0]));
        setDuration(null);
    };

    const handleDurationChange = (duration) => {
        setDuration(duration);
    };

    return (
        <div className="home">
            <div className="top">
                <label htmlFor="file-upload" class="custom-file-upload">
                    <AiOutlineCloudUpload /> Custom Upload
                </label>
                <input id="file-upload" type="file" accept='video/*' onChange={handleFileChange} />
            </div>
            <div className="middle">
                <Video videoFile={videoFile}
                    videoSource={videoSource}
                    onDurationChange={handleDurationChange} />
                {videoFile && <Metadata file={videoFile} duration={duration} />}
            </div>
            <div className="bottom">
                {/* Additional content in the bottom section if needed */}
            </div>
        </div>
    );
}