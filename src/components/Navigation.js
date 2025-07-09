import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  Target, 
  Library, 
  Timer, 
  StickyNote, 
  GraduationCap,
  Menu, 
  X, 
  Sun, 
  Moon,
  User,
  LogOut
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = ({ isAuthenticated, onSignOut }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/assignments', icon: ClipboardList, label: 'Assignments' },
    { path: '/classes', icon: Calendar, label: 'Classes' },
    { path: '/courses', icon: BookOpen, label: 'Courses' },
    { path: '/exams', icon: GraduationCap, label: 'Exams' },
    { path: '/goals', icon: Target, label: 'Goals' },
    { path: '/library', icon: Library, label: 'Library' },
    { path: '/notes', icon: StickyNote, label: 'Personal Notes' },
    { path: '/pomodoro', icon: Timer, label: 'Pomodoro' },
  ];

  const isActive = (path) => location.pathname === path;

  const closeSidebar = () => setSidebarOpen(false);

  if (!isAuthenticated && location.pathname !== '/' && location.pathname !== '/signin') {
    return null;
  }

  return (
    <>
      <div className="nav-container">
        <nav className="nav">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="nav-brand">
            stupid
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <ul className="nav-menu">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.path} className="nav-item">
                    <Link
                      to={item.path}
                      className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                    >
                      <Icon size={16} />
                      <span className="nav-label">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Right side controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button className="theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>

            {isAuthenticated && (
              <>
                <button className="theme-toggle" onClick={onSignOut}>
                  <User size={16} />
                </button>
                <button
                  className="theme-toggle mobile-menu-btn"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu size={16} />
                </button>
              </>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      {isAuthenticated && (
        <>
          <div 
            className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
            onClick={closeSidebar}
          />
          <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <Link to="/dashboard" className="nav-brand" onClick={closeSidebar}>
                stupid
              </Link>
              <button className="theme-toggle" onClick={closeSidebar}>
                <X size={16} />
              </button>
            </div>

            <nav>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.path}>
                      <Link
                        to={item.path}
                        className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                        onClick={closeSidebar}
                        style={{ width: '100%', justifyContent: 'flex-start' }}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
                <li style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border-color)' }}>
                  <button
                    className="nav-link"
                    onClick={() => {
                      onSignOut();
                      closeSidebar();
                    }}
                    style={{ 
                      width: '100%', 
                      justifyContent: 'flex-start',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}

      <style jsx>{`
        .nav-label {
          display: inline;
        }
        
        .mobile-menu-btn {
          display: none;
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: none !important;
          }
          
          .mobile-menu-btn {
            display: flex !important;
          }
          
          .nav-label {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .nav-brand {
            font-size: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default Navigation;