'use client'
import React, { useState } from 'react'
import axios from 'axios';

const File = () => {
    const [file, setFile] = useState();


    const onSubmit = async (e) => {
        e.preventDefault();
        console.log({ file })
        const data = new FormData();
        console.log({ data })
        data.set("file", file);
        const result = await fetch('/api/upload', {
            method: 'POST',
            body: data
        })
        console.log({ result })
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="file"
                    name='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                />
                <button>Upload Image</button>
            </form>
        </div>
    )
}

export default File