import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  ClipboardList, 
  Target, 
  Library, 
  Timer, 
  StickyNote, 
  GraduationCap,
  Sparkles,
  Users,
  Zap
} from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: ClipboardList,
      title: 'Assignments',
      description: 'Track and manage all your assignments with deadlines and priorities.'
    },
    {
      icon: Calendar,
      title: 'Classes',
      description: 'Keep track of your class schedule and never miss a lecture.'
    },
    {
      icon: BookOpen,
      title: 'Courses',
      description: 'Organize your course materials and track your progress.'
    },
    {
      icon: GraduationCap,
      title: 'Exams',
      description: 'Prepare for exams with study schedules and reminders.'
    },
    {
      icon: Target,
      title: 'Goals',
      description: 'Set and achieve your academic and personal goals.'
    },
    {
      icon: Library,
      title: 'Library',
      description: 'Access digital resources and manage your reading list.'
    },
    {
      icon: StickyNote,
      title: 'Personal Notes',
      description: 'Create and organize notes for quick reference.'
    },
    {
      icon: Timer,
      title: 'Pomodoro',
      description: 'Boost productivity with focused study sessions.'
    }
  ];

  const highlights = [
    {
      icon: Sparkles,
      title: 'Liquid Glass UI',
      description: 'Beautiful, modern interface with glassmorphism effects'
    },
    {
      icon: Users,
      title: 'Student-Focused',
      description: 'Designed specifically for BBA management students'
    },
    {
      icon: Zap,
      title: 'Fully Responsive',
      description: 'Works perfectly on mobile, tablet, laptop, and TV screens'
    }
  ];

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* Hero Section */}
        <div className="text-center mb-4">
          <div className="fade-in">
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 6vw, 4rem)', 
              fontWeight: '700', 
              marginBottom: '24px',
              background: 'linear-gradient(135deg, var(--accent-color), var(--text-accent))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Welcome to stupid
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', 
              color: 'var(--text-secondary)', 
              marginBottom: '32px',
              maxWidth: '600px',
              margin: '0 auto 32px'
            }}>
              The ultimate student management app designed for BBA students. 
              Manage assignments, track goals, and boost productivity with our 
              beautiful liquid glass interface.
            </p>
            <Link to="/signin" className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Highlights Section */}
        <div className="mt-4 mb-4">
          <div className="grid grid-3 fade-in" style={{ animationDelay: '0.2s' }}>
            {highlights.map((highlight, index) => {
              const Icon = highlight.icon;
              return (
                <div key={index} className="card text-center">
                  <div style={{ 
                    background: 'var(--accent-color)', 
                    borderRadius: '12px', 
                    padding: '16px', 
                    display: 'inline-flex',
                    marginBottom: '16px'
                  }}>
                    <Icon size={24} color="white" />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                    {highlight.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
                    {highlight.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-4">
          <div className="text-center mb-3 fade-in" style={{ animationDelay: '0.4s' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '16px' }}>
              Everything You Need
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              Comprehensive tools to help you succeed in your BBA journey
            </p>
          </div>

          <div className="grid grid-4 fade-in" style={{ animationDelay: '0.6s' }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card">
                  <div style={{ marginBottom: '16px' }}>
                    <Icon size={32} color="var(--accent-color)" />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.5' }}>
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-4 mb-4 fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="glass" style={{ padding: '48px 32px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '16px' }}>
              Ready to Get Started?
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Join thousands of BBA students who are already using stupid to manage their academic life.
            </p>
            <Link to="/signin" className="btn btn-primary" style={{ fontSize: '16px', padding: '16px 32px' }}>
              Sign In Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;