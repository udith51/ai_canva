import React from 'react'
import "./Metadata.css"

export default function Metadata({ file, duration }) {
    let dateObj = file.lastModifiedDate;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return (
        <div className="metadata">
            <div >
                File Name: {file.name}
            </div>
            <div >
                Duration: {Math.floor(duration)} sec
            </div>
            <div >
                LastModified: {day}-{month}-{year}
            </div>
            <div >
                Type: {file.type}
            </div>
        </div>
    )
}
