import React, { useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [action, setAction] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post(
        `http://localhost:8000/${action}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => setAction('tokenize')}>Tokenize Text</button>
      <button onClick={() => setAction('infer_subject')}>Infer Subject From Text</button>
      {action && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text here"
          />
          <button type="submit">Submit</button>
        </form>
      )}
      {result && (
        <pre>{result}</pre>
      )}
    </div>
  );
}

export default Dashboard;