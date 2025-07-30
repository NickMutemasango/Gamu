import React, { useState, useEffect } from 'react';
import { textToSpeech } from '../utils/textToSpeech';
import '../styles/userProfile.css';

const UserProfile = ({ audioEnabled }) => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    accessibilityPreferences: {
      highContrast: false,
      fontSize: 16,
      audioDescriptions: false
    }
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user profile
    const fetchProfile = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 600));
        
        const mockProfile = {
          name: 'John Doe',
          email: 'john.doe@example.com',
          phone: '(123) 456-7890',
          address: '123 Main St, Anytown, USA',
          accessibilityPreferences: {
            highContrast: false,
            fontSize: 16,
            audioDescriptions: false
          }
        };
        
        setProfile(mockProfile);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePrefChange = (e) => {
    const { name, checked, value, type } = {
      ...e.target,
      value: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    };
    
    setProfile(prev => ({
      ...prev,
      accessibilityPreferences: {
        ...prev.accessibilityPreferences,
        [name]: type === 'number' ? Number(value) : value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEditMode(false);
    // In a real app, this would save to your backend
    if (audioEnabled) {
      textToSpeech('Profile updated successfully');
    }
  };

  if (loading) {
    return <div className="loading">Loading your profile...</div>;
  }

  return (
    <div className="user-profile" role="main" aria-label="User profile">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button 
          onClick={() => {
            setEditMode(!editMode);
            if (audioEnabled) {
              textToSpeech(editMode ? 'View mode activated' : 'Edit mode activated');
            }
          }}
          className="edit-btn"
        >
          {editMode ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={profile.address}
              onChange={handleInputChange}
              rows="3"
              required
              aria-required="true"
            />
          </div>
          
          <fieldset className="preferences-group">
            <legend>Accessibility Preferences</legend>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="highContrast"
                name="highContrast"
                checked={profile.accessibilityPreferences.highContrast}
                onChange={handlePrefChange}
              />
              <label htmlFor="highContrast">High Contrast Mode</label>
            </div>
            
            <div className="form-group">
              <label htmlFor="fontSize">Font Size: {profile.accessibilityPreferences.fontSize}px</label>
              <input
                type="range"
                id="fontSize"
                name="fontSize"
                min="12"
                max="24"
                value={profile.accessibilityPreferences.fontSize}
                onChange={handlePrefChange}
              />
            </div>
            
            <div className="checkbox-group">
              <input
                type="checkbox"
                id="audioDescriptions"
                name="audioDescriptions"
                checked={profile.accessibilityPreferences.audioDescriptions}
                onChange={handlePrefChange}
              />
              <label htmlFor="audioDescriptions">Enable Audio Descriptions</label>
            </div>
          </fieldset>
          
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="profile-view">
          <div className="profile-info">
            <h2>Personal Information</h2>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Address:</strong> {profile.address}</p>
          </div>
          
          <div className="preferences-info">
            <h2>Accessibility Preferences</h2>
            <p><strong>High Contrast Mode:</strong> {profile.accessibilityPreferences.highContrast ? 'Enabled' : 'Disabled'}</p>
            <p><strong>Font Size:</strong> {profile.accessibilityPreferences.fontSize}px</p>
            <p><strong>Audio Descriptions:</strong> {profile.accessibilityPreferences.audioDescriptions ? 'Enabled' : 'Disabled'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;