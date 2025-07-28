// Component Type: Hybrid (AI structure + manual refinements)
// Main application component with theme provider and routing

import React, { useState, useEffect } from 'react';
import HeroPage from './components/hero/HeroPage';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';

export type ViewType = 'hero' | 'login' | 'dashboard';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('hero');
  const [user, setUser] = useState<User | null>(null);

  const navigateToDashboard = () => {
    if (user) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('login');
    }
  };

  const navigateToLogin = () => {
    setCurrentView('login');
  };

  const navigateToHero = () => {
    setCurrentView('hero');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('admybrand_user', JSON.stringify(userData));
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('admybrand_user');
    setCurrentView('hero');
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {currentView === 'hero' && (
          <HeroPage 
            onNavigateToDashboard={navigateToDashboard}
            onNavigateToLogin={navigateToLogin}
          />
        )}
        {currentView === 'login' && (
          <LoginPage 
            onLogin={handleLogin}
            onNavigateToHero={navigateToHero}
          />
        )}
        {currentView === 'dashboard' && user && (
          <Dashboard 
            user={user}
            onNavigateToHero={navigateToHero}
            onLogout={handleLogout}
          />
        )}
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
