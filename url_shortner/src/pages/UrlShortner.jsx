import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const UrlShortner = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');

  const handleShorten = async () => {
    try {
      const API_BASE_URL = "https://url-shortner-app-2.onrender.com";
      const { data } = await axios.post(`${API_BASE_URL}/api/url/shorten`, { originalUrl: url });
      setShortUrl(`${API_BASE_URL}/api/url/${data.shortUrl}`);
      toast.success('URL shortened successfully!');
      setUrl("")
    } catch (error) {
      toast.error('Failed to shorten URL');
    }
  };

  return (
    <div className=" d-flex flex-column align-items-center justify-content-center min-vh-100 bg-dark text-white">
      <div className="card bg-secondary text-light p-4 shadow-lg" style={{ maxWidth: '500px', width: '100%' }}>
        <h2 className="text-center">URL Shortener</h2>
        <div className="mb-3">
          <input 
            type='text' 
            value={url} 
            onChange={(e) => setUrl(e.target.value)} 
            placeholder='Enter URL' 
            className="form-control" 
            required
          />
        </div>
        <button className="btn btn-primary w-100 mb-3" onClick={handleShorten}>Shorten</button>
        {shortUrl && (
          <div className="alert alert-info text-center">
            Shortened URL: <a href={shortUrl} target='_blank' rel='noopener noreferrer' className="text-green">{shortUrl}</a>
          </div>
        )}
      </div>
      <ToastContainer theme="dark" />
    </div>
  );
};

export default UrlShortner;