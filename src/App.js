import React, { useState } from 'react';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // ⚠️ IMPORTANT: Replace this with your Render URL from above
  const BACKEND_URL = 'https://tiktok-backend-bf5g.onrender.com';

  const handleDownload = async () => {
    if (!url) {
      setError('Please paste a TikTok URL');
      return;
    }

    if (!url.includes('tiktok.com')) {
      setError('Invalid TikTok URL');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch(`${BACKEND_URL}/download`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage('✅ Video downloaded! It\'s saved on the server.');
        setUrl('');
      } else {
        setError(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setError('❌ Connection failed. Is your backend running?');
      console.error(err);
    }

    setLoading(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleDownload();
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>🎵 TikTok Downloader</h1>
        <p>No watermark • No limits • Personal use</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Paste TikTok URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
          />
          <button onClick={handleDownload} disabled={loading}>
            {loading ? '⏳ Downloading...' : '⬇️ Download'}
          </button>
        </div>

        {message && <div className="success">{message}</div>}
        {error && <div className="error">{error}</div>}

        <div className="info">
          <p>How to use:</p>
          <ol>
            <li>Copy a TikTok video link</li>
            <li>Paste it above</li>
            <li>Click Download</li>
            <li>Wait 30-60 seconds (first time is slower)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
