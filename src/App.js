import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Assignments from './pages/Assignments';
import Classes from './pages/Classes';
import './styles/global.css';

// Import other pages when they're created
// import Courses from './pages/Courses';
// import Exams from './pages/Exams';
// import Goals from './pages/Goals';
// import Library from './pages/Library';
// import Notes from './pages/Notes';
// import Pomodoro from './pages/Pomodoro';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already signed in
    const userData = localStorage.getItem('stupid-user');
    if (userData) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleSignIn = () => {
    setIsAuthenticated(true);
  };

  const handleSignOut = () => {
    localStorage.removeItem('stupid-user');
    setIsAuthenticated(false);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        background: 'var(--bg-primary)'
      }}>
        <div className="glass" style={{ padding: '32px', borderRadius: '20px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid var(--border-color)', 
            borderTop: '3px solid var(--accent-color)', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
          <p style={{ marginTop: '16px', color: 'var(--text-primary)' }}>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <div style={{ minHeight: '100vh' }}>
          <Navigation 
            isAuthenticated={isAuthenticated} 
            onSignOut={handleSignOut} 
          />
          
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Landing />} 
            />
            <Route 
              path="/signin" 
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignIn onSignIn={handleSignIn} />} 
            />
            <Route 
              path="/dashboard" 
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/assignments" 
              element={isAuthenticated ? <Assignments /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/classes" 
              element={isAuthenticated ? <Classes /> : <Navigate to="/signin" />} 
            />
            {/* Add routes for other pages when they're created */}
            {/* 
            <Route 
              path="/courses" 
              element={isAuthenticated ? <Courses /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/exams" 
              element={isAuthenticated ? <Exams /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/goals" 
              element={isAuthenticated ? <Goals /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/library" 
              element={isAuthenticated ? <Library /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/notes" 
              element={isAuthenticated ? <Notes /> : <Navigate to="/signin" />} 
            />
            <Route 
              path="/pomodoro" 
              element={isAuthenticated ? <Pomodoro /> : <Navigate to="/signin" />} 
            />
            */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        
        <style jsx>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Router>
    </ThemeProvider>
  );
};

export default App;