import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Lock, ArrowRight } from 'lucide-react';

const SignIn = ({ onSignIn }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.studentId.trim()) {
      newErrors.studentId = 'Student ID is required';
    } else if (formData.studentId.length < 3) {
      newErrors.studentId = 'Student ID must be at least 3 characters';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store user data (in real app, this would be API call)
      localStorage.setItem('stupid-user', JSON.stringify({
        studentId: formData.studentId,
        signedInAt: new Date().toISOString()
      }));
      
      onSignIn();
      navigate('/dashboard');
    }
  };

  return (
    <div style={{ 
      paddingTop: '100px', 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div className="container">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <div className="glass fade-in" style={{ padding: '48px 32px' }}>
            <div className="text-center mb-3">
              <h1 style={{ 
                fontSize: '2rem', 
                fontWeight: '600', 
                marginBottom: '8px',
                color: 'var(--accent-color)'
              }}>
                Welcome Back
              </h1>
              <p style={{ color: 'var(--text-secondary)' }}>
                Sign in to your stupid account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Student ID
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter your student ID"
                    style={{ paddingLeft: '44px' }}
                  />
                  <User 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      left: '16px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: 'var(--text-secondary)'
                    }}
                  />
                </div>
                {errors.studentId && (
                  <p style={{ color: 'var(--error-color)', fontSize: '12px', marginTop: '4px' }}>
                    {errors.studentId}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: 'var(--text-primary)'
                }}>
                  Password
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="input"
                    placeholder="Enter your password"
                    style={{ paddingLeft: '44px', paddingRight: '44px' }}
                  />
                  <Lock 
                    size={16} 
                    style={{ 
                      position: 'absolute', 
                      left: '16px', 
                      top: '50%', 
                      transform: 'translateY(-50%)',
                      color: 'var(--text-secondary)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '16px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p style={{ color: 'var(--error-color)', fontSize: '12px', marginTop: '4px' }}>
                    {errors.password}
                  </p>
                )}
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', marginBottom: '20px' }}
              >
                Sign In
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="text-center">
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                Don't have an account? 
                <span style={{ color: 'var(--accent-color)', marginLeft: '4px', cursor: 'pointer' }}>
                  Contact your administrator
                </span>
              </p>
            </div>
          </div>

          <div className="text-center mt-3">
            <Link to="/" className="btn" style={{ fontSize: '14px' }}>
              ← Back to Home
            </Link>
          </div>

          {/* Demo credentials info */}
          <div className="glass-subtle mt-3" style={{ padding: '20px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: 'var(--accent-color)' }}>
              Demo Credentials
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
              Student ID: <strong>demo123</strong><br />
              Password: <strong>password</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;