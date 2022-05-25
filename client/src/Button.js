import React from 'react';
import axios from 'axios';
import * as UpChunk from '@mux/upchunk';
import './Button.css';

async function handleUpload(inputRef) {
  try {
    const response = await axios.post('http://localhost:3001/upload');

    console.log('👉 Authenticated upload url:', response.data.url);
  
    const upload = UpChunk.createUpload({
      endpoint: response.data.url,
      file: inputRef.files[0], // the file object with all your video file’s data
      chunkSize: 5120, // Uploads the file in ~5mb chunks
    });

      // Subscribe to events
    upload.on('error', error => {
      console.error('💥 🙀', error.detail);
    });

    upload.on('progress', progress => {
      console.log(`So far we've uploaded ${progress.detail}% of this file.`);
    });

    upload.on('success', () => {
      console.log("Done uploading file " + inputRef.files[0].name);
    });
  
  } catch (error) {
    console.log(`😱 Creating authenticated upload url failed: ${error}`);
  }
}

function Button() {
  return (
    <div className="button-container">
      <h1>File upload button</h1>
      <label htmlFor="file-upload">Select a video file:</label>

      <input onChange={(e) => handleUpload(e.target)} type="file"
              id="file-upload" name="file-upload"/ >
    </div>
  );
}

export default Button;
