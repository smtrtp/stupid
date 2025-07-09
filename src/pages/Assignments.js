import React, { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, CheckCircle, AlertCircle, Edit3, Trash2, Filter } from 'lucide-react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    dueDate: '',
    priority: 'medium',
    description: '',
    status: 'pending'
  });

  useEffect(() => {
    const savedAssignments = localStorage.getItem('stupid-assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    } else {
      // Sample data
      const sampleAssignments = [
        {
          id: 1,
          title: 'Financial Management Case Study',
          subject: 'Finance',
          dueDate: '2024-02-15',
          priority: 'high',
          description: 'Analyze the financial performance of a multinational corporation',
          status: 'completed',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Marketing Strategy Presentation',
          subject: 'Marketing',
          dueDate: '2024-02-20',
          priority: 'high',
          description: 'Develop a comprehensive marketing strategy for a startup company',
          status: 'in-progress',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Operations Management Essay',
          subject: 'Operations',
          dueDate: '2024-02-25',
          priority: 'medium',
          description: 'Write an essay on lean manufacturing principles',
          status: 'pending',
          createdAt: new Date().toISOString()
        }
      ];
      setAssignments(sampleAssignments);
      localStorage.setItem('stupid-assignments', JSON.stringify(sampleAssignments));
    }
  }, []);

  const saveAssignments = (newAssignments) => {
    setAssignments(newAssignments);
    localStorage.setItem('stupid-assignments', JSON.stringify(newAssignments));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      const updatedAssignments = assignments.map(assignment =>
        assignment.id === editingId
          ? { ...assignment, ...formData, updatedAt: new Date().toISOString() }
          : assignment
      );
      saveAssignments(updatedAssignments);
      setEditingId(null);
    } else {
      const newAssignment = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      saveAssignments([...assignments, newAssignment]);
    }
    
    setFormData({
      title: '',
      subject: '',
      dueDate: '',
      priority: 'medium',
      description: '',
      status: 'pending'
    });
    setShowForm(false);
  };

  const handleEdit = (assignment) => {
    setFormData(assignment);
    setEditingId(assignment.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      const updatedAssignments = assignments.filter(assignment => assignment.id !== id);
      saveAssignments(updatedAssignments);
    }
  };

  const toggleStatus = (id) => {
    const updatedAssignments = assignments.map(assignment => {
      if (assignment.id === id) {
        const newStatus = assignment.status === 'completed' ? 'pending' : 'completed';
        return { ...assignment, status: newStatus, updatedAt: new Date().toISOString() };
      }
      return assignment;
    });
    saveAssignments(updatedAssignments);
  };

  const filteredAssignments = assignments.filter(assignment => {
    if (filter === 'all') return true;
    return assignment.status === filter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'var(--error-color)';
      case 'medium': return 'var(--warning-color)';
      case 'low': return 'var(--success-color)';
      default: return 'var(--text-secondary)';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle size={20} color="var(--success-color)" />;
      case 'in-progress': return <Clock size={20} color="var(--warning-color)" />;
      default: return <AlertCircle size={20} color="var(--text-secondary)" />;
    }
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="container">
        {/* Header */}
        <div className="mb-4">
          <div className="glass fade-in" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '8px' }}>
                  Assignments
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                  Manage your academic assignments and track progress
                </p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <Plus size={16} />
                New Assignment
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-3">
          <div className="glass-subtle fade-in" style={{ padding: '20px', animationDelay: '0.1s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={16} color="var(--text-secondary)" />
                <span style={{ fontSize: '14px', fontWeight: '500' }}>Filter:</span>
              </div>
              {['all', 'pending', 'in-progress', 'completed'].map((filterType) => (
                <button
                  key={filterType}
                  className={`btn ${filter === filterType ? 'btn-primary' : ''}`}
                  onClick={() => setFilter(filterType)}
                  style={{ fontSize: '12px', padding: '6px 12px' }}
                >
                  {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Assignment Form */}
        {showForm && (
          <div className="mb-4">
            <div className="glass fade-in" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                {editingId ? 'Edit Assignment' : 'New Assignment'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-2" style={{ marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Title
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Subject
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-2" style={{ marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="input"
                      value={formData.dueDate}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Priority
                    </label>
                    <select
                      className="input"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                    Description
                  </label>
                  <textarea
                    className="input"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Assignment description..."
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Assignment' : 'Create Assignment'}
                  </button>
                  <button 
                    type="button" 
                    className="btn" 
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({
                        title: '',
                        subject: '',
                        dueDate: '',
                        priority: 'medium',
                        description: '',
                        status: 'pending'
                      });
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Assignments List */}
        <div className="grid fade-in" style={{ animationDelay: '0.2s' }}>
          {filteredAssignments.length === 0 ? (
            <div className="card text-center" style={{ padding: '48px' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                No assignments found. Create your first assignment to get started!
              </p>
            </div>
          ) : (
            filteredAssignments.map((assignment) => (
              <div key={assignment.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <button
                        onClick={() => toggleStatus(assignment.id)}
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      >
                        {getStatusIcon(assignment.status)}
                      </button>
                      <h3 style={{ 
                        fontSize: '18px', 
                        fontWeight: '600', 
                        textDecoration: assignment.status === 'completed' ? 'line-through' : 'none',
                        opacity: assignment.status === 'completed' ? 0.7 : 1
                      }}>
                        {assignment.title}
                      </h3>
                      <span 
                        style={{ 
                          background: getPriorityColor(assignment.priority),
                          color: 'white',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '10px',
                          fontWeight: '600',
                          textTransform: 'uppercase'
                        }}
                      >
                        {assignment.priority}
                      </span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      {assignment.subject}
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '12px' }}>
                      {assignment.description}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} color="var(--text-secondary)" />
                      <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                        Due: {new Date(assignment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn"
                      onClick={() => handleEdit(assignment)}
                      style={{ padding: '8px' }}
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      className="btn"
                      onClick={() => handleDelete(assignment.id)}
                      style={{ padding: '8px', color: 'var(--error-color)' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Assignments;