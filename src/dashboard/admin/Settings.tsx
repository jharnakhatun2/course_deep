import { useState } from 'react';
import { FaUser, FaBell, FaShieldAlt, FaCog } from 'react-icons/fa';

interface SettingsState {
  profile: {
    name: string;
    email: string;
    role: string;
  };
  notifications: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    weeklyReports: boolean;
  };
  security: {
    twoFactor: boolean;
    sessionTimeout: string;
  };
  preferences: {
    darkMode: boolean;
    language: string;
    timezone: string;
  };
}

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState<SettingsState>({
    profile: {
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'Super Admin'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      weeklyReports: true
    },
    security: {
      twoFactor: true,
      sessionTimeout: '30'
    },
    preferences: {
      darkMode: false,
      language: 'en',
      timezone: 'UTC'
    }
  });

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateProfile = (field: string, value: string) => {
    setSettings(prev => ({
      ...prev,
      profile: { ...prev.profile, [field]: value }
    }));
  };

  const updateNotifications = (field: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: { ...prev.notifications, [field]: value }
    }));
  };

  const updateSecurity = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      security: { ...prev.security, [field]: value }
    }));
  };

  const updatePreferences = (field: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [field]: value }
    }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FaUser },
    { id: 'notifications', label: 'Notifications', icon: FaBell },
    { id: 'security', label: 'Security', icon: FaShieldAlt },
    { id: 'preferences', label: 'Preferences', icon: FaCog }
  ];

  const inputFieldStyle = "w-full px-4 py-2.5 border border-gray-200 focus:ring-1 focus:ring-yellow-500 focus:border-transparent outline-none text-sm text-zinc-400"

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl lg:text-2xl font-bold text-zinc-700 flex items-center gap-3">
            <FaCog className="w-6 h-6" />
            Admin Settings
          </h1>
          <p className="text-zinc-500 mt-1 font-light">Manage your account settings and preferences</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200  p-4 flex items-center gap-2 text-green-800">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            Settings saved successfully!
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap cursor-pointer text-sm ${activeTab === tab.id
                        ? 'text-yellow-500 border-b-2 border-yellow-500 bg-yellow-50'
                        : 'text-zinc-500 hover:text-zinc-700 hover:bg-gray-50'
                      }`}
                  >
                    <Icon className="w-4 h-5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-700">Profile Information</h2>

                <div className="grid gap-6">
                  <div>
                    <label className="block text-sm text-zinc-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={settings.profile.name}
                      onChange={(e) => updateProfile('name', e.target.value)}
                      className={inputFieldStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(e) => updateProfile('email', e.target.value)}
                      className={inputFieldStyle}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={settings.profile.role}
                      disabled
                      className={inputFieldStyle}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-700">Notification Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 ">
                    <div>
                      <h3 className="text-zinc-700">Email Notifications</h3>
                      <p className="text-sm text-zinc-400">Receive email updates about system activity</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.emailNotifications}
                        onChange={(e) => updateNotifications('emailNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 ">
                    <div>
                      <h3 className="text-zinc-700">Push Notifications</h3>
                      <p className="text-sm text-zinc-400">Receive push notifications in your browser</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.pushNotifications}
                        onChange={(e) => updateNotifications('pushNotifications', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 ">
                    <div>
                      <h3 className="text-zinc-700">Weekly Reports</h3>
                      <p className="text-sm text-zinc-400">Get weekly summary reports via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.notifications.weeklyReports}
                        onChange={(e) => updateNotifications('weeklyReports', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-700">Security Settings</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 ">
                    <div>
                      <h3 className="text-zinc-700">Two-Factor Authentication</h3>
                      <p className="text-sm text-zinc-400">Add an extra layer of security to your account</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactor}
                        onChange={(e) => updateSecurity('twoFactor', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm text-zinc-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <select
                      value={settings.security.sessionTimeout}
                      onChange={(e) => updateSecurity('sessionTimeout', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="60">1 hour</option>
                      <option value="120">2 hours</option>
                    </select>
                  </div>

                  <div className="p-4 bg-yellow-50 border border-yellow-200 ">
                    <h3 className="font-medium text-yellow-900 mb-2">Change Password</h3>
                    <p className="text-sm text-yellow-700 mb-3">Update your password regularly to keep your account secure</p>
                    <button className="px-4 py-2 bg-yellow-500 text-white  hover:bg-yellow-400 transition-smooth cursor-pointer text-sm">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold text-zinc-700">General Preferences</h2>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 ">
                    <div>
                      <h3 className="text-zinc-700">Dark Mode</h3>
                      <p className="text-sm text-zinc-400">Enable dark mode for better viewing in low light</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.preferences.darkMode}
                        onChange={(e) => updatePreferences('darkMode', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Language
                    </label>
                    <select
                      value={settings.preferences.language}
                      onChange={(e) => updatePreferences('language', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm cursor-pointer outline-none"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                      <option value="de">German</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Timezone
                    </label>
                    <select
                      value={settings.preferences.timezone}
                      onChange={(e) => updatePreferences('timezone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300  focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm cursor-pointer outline-none"
                    >
                      <option value="UTC">UTC</option>
                      <option value="EST">Eastern Time</option>
                      <option value="PST">Pacific Time</option>
                      <option value="GMT">GMT</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 px-8 py-4 bg-gray-50 flex justify-between items-center">
            <button className="px-4 py-2 text-zinc-700 hover:text-zinc-500 transition-colors">
              Reset to Defaults
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-yellow-500 text-white  hover:bg-yellow-400 transition-smooth font-medium cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;