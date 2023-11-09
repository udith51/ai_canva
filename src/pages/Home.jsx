import React, { useState } from 'react'
import Video from '../components/Video'
import Metadata from '../components/Metadata';
import "./Home.css"

export default function Home() {
    const [file, setFile] = useState(null);
    const [duration, setDuration] = useState(null);

    const handleFileChange = (e) => {
        e.target.files && setFile(e.target.files[0]);
        console.dir(e.target.files[0]);
        setDuration(null);
    }
    const handleDurationChange = (duration) => {
        setDuration(duration);
    };

    return (
        <div className="home">
            <div className="top">
                <input type="file" accept='video/*' onChange={handleFileChange} />
            </div>
            <div className="middle">
                <Video videoFile={file} onDurationChange={handleDurationChange} />

                {file && <Metadata file={file} duration={duration} />}
            </div>
            <div className="bottom">

            </div>
        </div>
    )
}
