// Component Type: Hybrid (AI structure + manual refinements)
// Main application component with routing between hero, login, and dashboard

import React, { useState, useEffect } from 'react';
import HeroPage from './components/hero/HeroPage';
import LoginPage from './components/auth/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
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
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on app load
  useEffect(() => {
    const checkSession = () => {
      const savedUser = localStorage.getItem('admybrand_user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setCurrentView('dashboard');
        } catch (error) {
          console.error('Error parsing saved user data:', error);
          localStorage.removeItem('admybrand_user');
        }
      }
      setIsLoading(false);
    };

    checkSession();
  }, []);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600">Loading ADmyBRAND...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
  );
}
