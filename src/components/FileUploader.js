import React, { useState } from 'react';
import axios from 'axios';

const FileUploader = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [existingBooks, setExistingBooks] = useState([]);

  const handleFileUrlChange = (e) => {
    setFileUrl(e.target.value);
  };

  const handleUpload = async () => {
    try {
      // Send the file URL to Flask for uploading to Google Cloud Storage
      await axios.post('http://localhost:5000/upload', { fileUrl });

      // Update the list of existing books
      const response = await axios.get('http://localhost:5000/books');
      setExistingBooks(response.data.books);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      <h2>File Uploader</h2>
      <div>
        <label>
          File URL:
          <input type="text" value={fileUrl} onChange={handleFileUrlChange} />
        </label>
      </div>
      <div>
        <button onClick={handleUpload}>Upload to Google Cloud Storage</button>
      </div>
      <div>
        <h3>Existing Books in the Bucket:</h3>
        <ul>
          {existingBooks.map((book) => (
            <li key={book}>{book}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploader;
