import React, { useState } from 'react'
import Video from '../components/Video'

export default function Home() {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        e.target.files && setFile(e.target.files[0]);
        console.dir(e.target.files[0]);
    }
    return (
        <div className="home">
            <input type="file" accept='video/*' onChange={handleFileChange} />
            <Video videoFile={file} />
        </div>
    )
}
