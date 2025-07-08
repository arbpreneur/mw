import React, { useEffect } from 'react';
import { useAppStore } from './lib/store';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { LoginForm } from './components/auth/LoginForm';
import { Dashboard } from './components/dashboard/Dashboard';

function App() {
  const { user, activeView, setUser } = useAppStore();

  // Check for existing session on app load
  useEffect(() => {
    // In a real app, you'd check for an existing session here
    // For demo purposes, we'll just set a default user if none exists
    // setUser(mockUser);
  }, [setUser]);

  if (!user) {
    return <LoginForm />;
  }

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'conversations':
        return <div>AI Conversations View (Coming Soon)</div>;
      case 'travelers':
        return <div>Traveler Management View (Coming Soon)</div>;
      case 'training':
        return <div>AI Training View (Coming Soon)</div>;
      case 'analytics':
        return <div>Analytics View (Coming Soon)</div>;
      case 'settings':
        return <div>Settings View (Coming Soon)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <DashboardLayout>
      {renderView()}
    </DashboardLayout>
  );
}

export default App;