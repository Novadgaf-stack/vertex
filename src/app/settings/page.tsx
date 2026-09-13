"use client";

import React, { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useToast } from '../../contexts/ToastContext';
import { Avatar } from '../../components/ui/Avatar';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('Profile');
  const { addToast } = useToast();
  
  const [profileData, setProfileData] = useState({
    name: 'Alex Lindemann',
    email: 'alex@vertex-admin.com',
    company: 'Acme Corp'
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailAlerts: true,
    pushNotifications: false,
    marketingEmails: false
  });

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile information saved successfully.', 'success');
  };

  const handleNotificationSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Notification preferences updated.', 'success');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-sm text-text-muted mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0">
            {['Profile', 'Notifications', 'Appearance', 'Security', 'Billing'].map((item) => (
              <button 
                key={item}
                onClick={() => setActiveTab(item)}
                className={`px-4 py-2 text-left text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${
                  activeTab === item 
                    ? 'bg-surface shadow-sm border border-border text-primary' 
                    : 'text-text-secondary hover:bg-surface-alt hover:text-text-primary'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>
        
        <div className="flex-1 space-y-6">
          {activeTab === 'Profile' && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Profile Information</h3>
                <form onSubmit={handleProfileSave} className="space-y-4 max-w-xl">
                  <div className="flex items-center gap-4 pb-4 border-b border-border">
                    <Avatar fallback="AL" size="lg" className="text-2xl font-bold" />
                    <div>
                      <Button type="button" variant="ghost" className="text-primary hover:text-primary-hover px-0 h-auto font-medium">
                        Change Avatar
                      </Button>
                      <p className="text-xs text-text-muted mt-1">JPG, GIF or PNG. Max size of 800K</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-text-primary">Full Name</label>
                    <Input 
                      value={profileData.name} 
                      onChange={e => setProfileData({...profileData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-text-primary">Email Address</label>
                    <Input 
                      type="email" 
                      value={profileData.email} 
                      onChange={e => setProfileData({...profileData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-text-primary">Company</label>
                    <Input 
                      value={profileData.company} 
                      onChange={e => setProfileData({...profileData, company: e.target.value})}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === 'Notifications' && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-text-primary mb-4">Notification Preferences</h3>
                <form onSubmit={handleNotificationSave} className="space-y-6 max-w-xl">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">Email Alerts</h4>
                      <p className="text-sm text-text-muted">Receive alerts about suspicious activity.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.emailAlerts}
                        onChange={e => setNotificationSettings({...notificationSettings, emailAlerts: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-surface-alt peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">Push Notifications</h4>
                      <p className="text-sm text-text-muted">Get notifications on your device.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.pushNotifications}
                        onChange={e => setNotificationSettings({...notificationSettings, pushNotifications: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-surface-alt peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-text-primary">Marketing Emails</h4>
                      <p className="text-sm text-text-muted">Receive promotional content and offers.</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.marketingEmails}
                        onChange={e => setNotificationSettings({...notificationSettings, marketingEmails: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-surface-alt peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-surface after:border-border after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary border border-border"></div>
                    </label>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <Button type="submit">Save Preferences</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {['Appearance', 'Security', 'Billing'].includes(activeTab) && (
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <h3 className="text-lg font-medium text-text-primary mb-2">{activeTab} Settings</h3>
                  <p className="text-text-muted max-w-sm">This section is currently under development. Please check back later for {activeTab.toLowerCase()} configuration options.</p>
                </div>
              </CardContent>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}
