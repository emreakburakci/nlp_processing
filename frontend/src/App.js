import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
      <nav>
          {isLoggedIn && <Link to="/logout">Logout</Link>}
        </nav>
        <Routes>
          <Route
            path="/"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;