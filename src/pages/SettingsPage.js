import React, { useState } from 'react';
import { textToSpeech } from '../utils/textToSpeech';
import '../styles/settings.css';

const SettingsPage = ({ audioEnabled, settings, onSettingsChange }) => {
  const [localSettings, setLocalSettings] = useState(settings);
  const [activeTab, setActiveTab] = useState('accessibility');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setLocalSettings(prev => ({
      ...prev,
      [name]: newValue
    }));

    if (audioEnabled) {
      textToSpeech(`${name} set to ${newValue}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSettingsChange(localSettings);
    if (audioEnabled) {
      textToSpeech('Settings saved successfully');
    }
  };

  const handleReset = () => {
    setLocalSettings({
      fontSize: 16,
      highContrast: false,
      audioEnabled: false,
      theme: 'light',
      reducedMotion: false
    });
  };

  return (
    <div className="settings-page" role="main" aria-label="Settings page">
      <h1>Settings</h1>
      
      <div className="settings-tabs" role="tablist">
        <button
          role="tab"
          aria-selected={activeTab === 'accessibility'}
          onClick={() => setActiveTab('accessibility')}
        >
          Accessibility
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'account'}
          onClick={() => setActiveTab('account')}
        >
          Account
        </button>
        <button
          role="tab"
          aria-selected={activeTab === 'notifications'}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
      </div>

      <form onSubmit={handleSubmit} className="settings-form">
        {activeTab === 'accessibility' && (
          <div className="tab-content" role="tabpanel">
            <div className="form-group">
              <label htmlFor="fontSize">Font Size: {localSettings.fontSize}px</label>
              <input
                type="range"
                id="fontSize"
                name="fontSize"
                min="12"
                max="24"
                value={localSettings.fontSize}
                onChange={handleChange}
              />
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="highContrast"
                name="highContrast"
                checked={localSettings.highContrast}
                onChange={handleChange}
              />
              <label htmlFor="highContrast">High Contrast Mode</label>
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="audioEnabled"
                name="audioEnabled"
                checked={localSettings.audioEnabled}
                onChange={handleChange}
              />
              <label htmlFor="audioEnabled">Enable Audio Descriptions</label>
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="reducedMotion"
                name="reducedMotion"
                checked={localSettings.reducedMotion}
                onChange={handleChange}
              />
              <label htmlFor="reducedMotion">Reduced Motion</label>
            </div>

            <div className="form-group">
              <label htmlFor="theme">Color Theme</label>
              <select
                id="theme"
                name="theme"
                value={localSettings.theme}
                onChange={handleChange}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="colorblind">Colorblind Friendly</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'account' && (
          <div className="tab-content" role="tabpanel">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={localSettings.name || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={localSettings.email || ''}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={localSettings.phone || ''}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="tab-content" role="tabpanel">
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="orderUpdates"
                name="orderUpdates"
                checked={localSettings.orderUpdates || false}
                onChange={handleChange}
              />
              <label htmlFor="orderUpdates">Order Status Updates</label>
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="promotions"
                name="promotions"
                checked={localSettings.promotions || false}
                onChange={handleChange}
              />
              <label htmlFor="promotions">Promotions and Special Offers</label>
            </div>

            <div className="form-group">
              <label htmlFor="notificationMethod">Notification Method</label>
              <select
                id="notificationMethod"
                name="notificationMethod"
                value={localSettings.notificationMethod || 'email'}
                onChange={handleChange}
              >
                <option value="email">Email</option>
                <option value="sms">Text Message</option>
                <option value="both">Both</option>
              </select>
            </div>
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="reset-btn" onClick={handleReset}>
            Reset to Defaults
          </button>
          <button type="submit" className="save-btn">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsPage;