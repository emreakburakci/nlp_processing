import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Dashboard() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [action, setAction] = useState('');
  const [activeButton, setActiveButton] = useState('');

// check if user is logged in
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
  }
  


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


  const handleButtonClick = (action) => {
    setAction(action);
    setActiveButton(action);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="d-flex justify-content-center mb-4">
      <button
          className={`btn ${activeButton === 'nlp/perform_ner' ? 'btn-success' : 'btn-secondary'} mr-2`}
          onClick={() => handleButtonClick('nlp/perform_ner')}
        >
          Perform NER
        </button>
        <button
          className={`btn ${activeButton === 'nlp/infer_subject' ? 'btn-success' : 'btn-secondary'}`}
          onClick={() => handleButtonClick('nlp/infer_subject')}
        >
          Infer Subject From Text
        </button>
      </div>
      {action && (
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="form-group">
            <textarea
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here"
              rows="5"
            />
          </div>
          <button type="submit" className="btn btn-success btn-block">Submit</button>
        </form>
      )}
      {result && (
        <div className="card">
          <div className="card-body">
            <pre>{result}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;