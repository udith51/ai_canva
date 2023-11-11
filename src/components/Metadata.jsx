import React from 'react'

export default function Metadata({ file, duration }) {
    let dateObj = file.lastModifiedDate;
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    return (
        <div className="metadata">
            File Name: {file.name}
            <br />
            Duration: {Math.floor(duration)} sec
            <br />
            LastModified: {day}-{month}-{year}
            <br />
            Type: {file.type}
        </div>
    )
}
