import React, { useState, useEffect } from 'react';
import { Plus, Clock, MapPin, User, Calendar, Edit3, Trash2 } from 'lucide-react';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    instructor: '',
    room: '',
    dayOfWeek: '',
    startTime: '',
    endTime: '',
    description: ''
  });

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const savedClasses = localStorage.getItem('stupid-classes');
    if (savedClasses) {
      setClasses(JSON.parse(savedClasses));
    } else {
      // Sample data
      const sampleClasses = [
        {
          id: 1,
          title: 'Financial Management',
          instructor: 'Dr. Smith',
          room: 'Room 201',
          dayOfWeek: 'Monday',
          startTime: '09:00',
          endTime: '10:30',
          description: 'Advanced financial management concepts and case studies',
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: 'Marketing Strategy',
          instructor: 'Prof. Johnson',
          room: 'Room 105',
          dayOfWeek: 'Tuesday',
          startTime: '14:00',
          endTime: '15:30',
          description: 'Strategic marketing planning and implementation',
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: 'Operations Management',
          instructor: 'Dr. Williams',
          room: 'Room 303',
          dayOfWeek: 'Wednesday',
          startTime: '11:00',
          endTime: '12:30',
          description: 'Operations management principles and lean methodologies',
          createdAt: new Date().toISOString()
        }
      ];
      setClasses(sampleClasses);
      localStorage.setItem('stupid-classes', JSON.stringify(sampleClasses));
    }
  }, []);

  const saveClasses = (newClasses) => {
    setClasses(newClasses);
    localStorage.setItem('stupid-classes', JSON.stringify(newClasses));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      const updatedClasses = classes.map(classItem =>
        classItem.id === editingId
          ? { ...classItem, ...formData, updatedAt: new Date().toISOString() }
          : classItem
      );
      saveClasses(updatedClasses);
      setEditingId(null);
    } else {
      const newClass = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      saveClasses([...classes, newClass]);
    }
    
    setFormData({
      title: '',
      instructor: '',
      room: '',
      dayOfWeek: '',
      startTime: '',
      endTime: '',
      description: ''
    });
    setShowForm(false);
  };

  const handleEdit = (classItem) => {
    setFormData(classItem);
    setEditingId(classItem.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this class?')) {
      const updatedClasses = classes.filter(classItem => classItem.id !== id);
      saveClasses(updatedClasses);
    }
  };

  const groupedClasses = daysOfWeek.reduce((acc, day) => {
    acc[day] = classes.filter(classItem => classItem.dayOfWeek === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
    return acc;
  }, {});

  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
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
                  Classes
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '16px' }}>
                  Manage your class schedule and never miss a lecture
                </p>
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                <Plus size={16} />
                New Class
              </button>
            </div>
          </div>
        </div>

        {/* Class Form */}
        {showForm && (
          <div className="mb-4">
            <div className="glass fade-in" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>
                {editingId ? 'Edit Class' : 'New Class'}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-2" style={{ marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Class Title
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
                      Instructor
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.instructor}
                      onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-3" style={{ marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Room
                    </label>
                    <input
                      type="text"
                      className="input"
                      value={formData.room}
                      onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                      Day
                    </label>
                    <select
                      className="input"
                      value={formData.dayOfWeek}
                      onChange={(e) => setFormData({ ...formData, dayOfWeek: e.target.value })}
                      required
                    >
                      <option value="">Select Day</option>
                      {daysOfWeek.map(day => (
                        <option key={day} value={day}>{day}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                        Start Time
                      </label>
                      <input
                        type="time"
                        className="input"
                        value={formData.startTime}
                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                        End Time
                      </label>
                      <input
                        type="time"
                        className="input"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                        required
                      />
                    </div>
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
                    placeholder="Class description..."
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary">
                    {editingId ? 'Update Class' : 'Create Class'}
                  </button>
                  <button 
                    type="button" 
                    className="btn" 
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setFormData({
                        title: '',
                        instructor: '',
                        room: '',
                        dayOfWeek: '',
                        startTime: '',
                        endTime: '',
                        description: ''
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

        {/* Schedule Grid */}
        <div className="fade-in" style={{ animationDelay: '0.1s' }}>
          {daysOfWeek.map(day => (
            <div key={day} className="mb-3">
              <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px', color: 'var(--accent-color)' }}>
                {day}
              </h2>
              {groupedClasses[day].length === 0 ? (
                <div className="glass-subtle" style={{ padding: '24px', textAlign: 'center' }}>
                  <p style={{ color: 'var(--text-secondary)' }}>No classes scheduled for {day}</p>
                </div>
              ) : (
                <div className="grid" style={{ gap: '12px' }}>
                  {groupedClasses[day].map(classItem => (
                    <div key={classItem.id} className="card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
                              {classItem.title}
                            </h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={14} color="var(--text-secondary)" />
                              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                {formatTime(classItem.startTime)} - {formatTime(classItem.endTime)}
                              </span>
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <User size={14} color="var(--text-secondary)" />
                              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                {classItem.instructor}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <MapPin size={14} color="var(--text-secondary)" />
                              <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                                {classItem.room}
                              </span>
                            </div>
                          </div>
                          
                          {classItem.description && (
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                              {classItem.description}
                            </p>
                          )}
                        </div>
                        
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button
                            className="btn"
                            onClick={() => handleEdit(classItem)}
                            style={{ padding: '8px' }}
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            className="btn"
                            onClick={() => handleDelete(classItem.id)}
                            style={{ padding: '8px', color: 'var(--error-color)' }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Classes;