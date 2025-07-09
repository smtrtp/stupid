import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  Target, 
  Library, 
  Timer, 
  StickyNote, 
  GraduationCap,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const userData = localStorage.getItem('stupid-user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const quickStats = [
    {
      icon: ClipboardList,
      title: 'Active Assignments',
      value: '12',
      change: '+3 from last week',
      color: 'var(--accent-color)',
      link: '/assignments'
    },
    {
      icon: Calendar,
      title: 'Classes This Week',
      value: '18',
      change: '3 today',
      color: 'var(--success-color)',
      link: '/classes'
    },
    {
      icon: GraduationCap,
      title: 'Upcoming Exams',
      value: '4',
      change: '2 this month',
      color: 'var(--warning-color)',
      link: '/exams'
    },
    {
      icon: Target,
      title: 'Goals Progress',
      value: '75%',
      change: '+15% this month',
      color: 'var(--success-color)',
      link: '/goals'
    }
  ];

  const quickAccess = [
    { path: '/assignments', icon: ClipboardList, label: 'Assignments', color: '#667eea' },
    { path: '/classes', icon: Calendar, label: 'Classes', color: '#10b981' },
    { path: '/courses', icon: BookOpen, label: 'Courses', color: '#f59e0b' },
    { path: '/exams', icon: GraduationCap, label: 'Exams', color: '#ef4444' },
    { path: '/goals', icon: Target, label: 'Goals', color: '#8b5cf6' },
    { path: '/library', icon: Library, label: 'Library', color: '#06b6d4' },
    { path: '/notes', icon: StickyNote, label: 'Notes', color: '#f97316' },
    { path: '/pomodoro', icon: Timer, label: 'Pomodoro', color: '#ec4899' }
  ];

  const recentActivity = [
    {
      icon: ClipboardList,
      title: 'Assignment submitted',
      description: 'Financial Management Case Study',
      time: '2 hours ago',
      type: 'success'
    },
    {
      icon: Calendar,
      title: 'Class reminder',
      description: 'Marketing Strategy at 2:00 PM',
      time: '30 minutes',
      type: 'warning'
    },
    {
      icon: Target,
      title: 'Goal completed',
      description: 'Complete Week 3 Readings',
      time: '1 day ago',
      type: 'success'
    },
    {
      icon: Timer,
      title: 'Pomodoro session',
      description: '45 minutes study session completed',
      time: '3 hours ago',
      type: 'info'
    }
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* Welcome Section */}
        <div className="mb-4">
          <div className="glass fade-in" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px' }}>
                  {getGreeting()}, {user?.studentId || 'Student'}!
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '16px' }}>
                  Here's what's happening with your studies today.
                </p>
                <div style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                  <Clock size={16} style={{ display: 'inline', marginRight: '8px' }} />
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })} • {currentTime.toLocaleTimeString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </div>
              </div>
              <Link to="/assignments" className="btn btn-primary">
                <Plus size={16} />
                New Assignment
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-4">
          <div className="grid grid-4 fade-in" style={{ animationDelay: '0.1s' }}>
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Link key={index} to={stat.link} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ 
                      background: stat.color, 
                      borderRadius: '8px', 
                      padding: '8px', 
                      marginRight: '12px' 
                    }}>
                      <Icon size={20} color="white" />
                    </div>
                    <ArrowRight size={16} color="var(--text-secondary)" style={{ marginLeft: 'auto' }} />
                  </div>
                  <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '4px' }}>
                    {stat.value}
                  </h3>
                  <p style={{ fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>
                    {stat.title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                    {stat.change}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="grid grid-2" style={{ alignItems: 'flex-start' }}>
          {/* Quick Access */}
          <div className="fade-in" style={{ animationDelay: '0.2s' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Quick Access
            </h2>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px' }}>
              {quickAccess.map((item) => {
                const Icon = item.icon;
                return (
                  <Link key={item.path} to={item.path} className="card text-center" style={{ textDecoration: 'none', color: 'inherit', padding: '20px' }}>
                    <div style={{ 
                      background: item.color, 
                      borderRadius: '12px', 
                      padding: '16px', 
                      display: 'inline-flex',
                      marginBottom: '12px'
                    }}>
                      <Icon size={24} color="white" />
                    </div>
                    <p style={{ fontSize: '14px', fontWeight: '500' }}>
                      {item.label}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="fade-in" style={{ animationDelay: '0.3s' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '20px' }}>
              Recent Activity
            </h2>
            <div className="glass-subtle" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {recentActivity.map((activity, index) => {
                  const Icon = activity.icon;
                  const getStatusIcon = () => {
                    switch (activity.type) {
                      case 'success': return <CheckCircle size={16} color="var(--success-color)" />;
                      case 'warning': return <AlertCircle size={16} color="var(--warning-color)" />;
                      default: return <TrendingUp size={16} color="var(--accent-color)" />;
                    }
                  };

                  return (
                    <div key={index} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ 
                        background: 'var(--bg-tertiary)', 
                        borderRadius: '8px', 
                        padding: '8px',
                        flexShrink: 0
                      }}>
                        <Icon size={16} color="var(--text-secondary)" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <p style={{ fontSize: '14px', fontWeight: '500', margin: 0 }}>
                            {activity.title}
                          </p>
                          {getStatusIcon()}
                        </div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '0 0 4px 0' }}>
                          {activity.description}
                        </p>
                        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0 }}>
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;