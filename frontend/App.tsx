// Component Type: Hybrid (AI structure + manual refinements)
// Main application component with routing between hero and dashboard

import React, { useState } from 'react';
import HeroPage from './components/hero/HeroPage';
import Dashboard from './components/dashboard/Dashboard';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  const [currentView, setCurrentView] = useState<'hero' | 'dashboard'>('hero');

  const navigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  const navigateToHero = () => {
    setCurrentView('hero');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'hero' ? (
        <HeroPage onNavigateToDashboard={navigateToDashboard} />
      ) : (
        <Dashboard onNavigateToHero={navigateToHero} />
      )}
      <Toaster />
    </div>
  );
}
