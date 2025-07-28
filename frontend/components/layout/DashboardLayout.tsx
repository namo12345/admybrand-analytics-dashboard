// Component Type: Hybrid (AI-generated + manual enhancements)
// Enhanced dashboard layout with navigation and user controls - Fixed for white theme and functional profile

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Target, 
  Bell, 
  Search, 
  Settings,
  User,
  Home,
  Sparkles,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { User as UserType } from '../../App';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserType;
  onNavigateToHero: () => void;
  onLogout: () => void;
  onOpenSettings?: () => void;
}

export default function DashboardLayout({ children, user, onNavigateToHero, onLogout, onOpenSettings }: DashboardLayoutProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    if (onOpenSettings) {
      onOpenSettings();
    }
  };

  const handleHomeClick = () => {
    setShowUserMenu(false);
    onNavigateToHero();
  };

  const handleLogoutClick = () => {
    setShowUserMenu(false);
    onLogout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-gray-200 border-b shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onNavigateToHero}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ADmyBRAND
                </h1>
              </button>
              
              <div className="hidden md:flex items-center space-x-1 text-sm text-gray-500">
                <span>/</span>
                <span>Analytics Dashboard</span>
              </div>
              
              <Badge className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                <Sparkles className="w-3 h-3 mr-1" />
                AI-Powered
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden sm:flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search campaigns..."
                    className="pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 bg-white border-gray-200 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative text-gray-600 hover:text-gray-900 hover:bg-gray-100">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg transition-colors hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                
                {/* Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg border bg-white border-gray-200 z-50">
                    <div className="p-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <div className="py-1">
                      <button 
                        onClick={handleSettingsClick}
                        className="w-full text-left px-3 py-2 text-sm flex items-center space-x-2 text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4" />
                        <span>Settings</span>
                      </button>
                      <button 
                        onClick={handleHomeClick}
                        className="w-full text-left px-3 py-2 text-sm flex items-center space-x-2 text-gray-700 hover:bg-gray-100"
                      >
                        <Home className="w-4 h-4" />
                        <span>Home</span>
                      </button>
                      <hr className="my-1 border-gray-200" />
                      <button 
                        onClick={handleLogoutClick}
                        className="w-full text-left px-3 py-2 text-sm flex items-center space-x-2 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay to close dropdown */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-gray-200 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>© 2024 ADmyBRAND</span>
              <span>•</span>
              <button className="hover:text-gray-700">Privacy</button>
              <span>•</span>
              <button className="hover:text-gray-700">Terms</button>
              <span>•</span>
              <button className="hover:text-gray-700">Support</button>
            </div>
            <div className="flex items-center space-x-2 text-sm mt-4 md:mt-0 text-gray-500">
              <Target className="w-4 h-4" />
              <span>Campaign Analytics Platform</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
