// Component Type: Manual
// Enhanced quick action buttons with proper styling and functionality

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Upload, 
  BarChart3, 
  Target,
  Zap,
  Calendar,
  Settings,
  TrendingUp
} from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export default function QuickActions({ onAction }: QuickActionsProps) {
  const { isDark } = useTheme();

  const actions = [
    {
      icon: Plus,
      title: 'New Campaign',
      description: 'Create advertising campaign',
      color: isDark ? 'bg-blue-900/20 hover:bg-blue-900/30 text-blue-400 border-blue-800' : 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200',
      action: 'New Campaign'
    },
    {
      icon: Upload,
      title: 'Import Data',
      description: 'Upload CSV files',
      color: isDark ? 'bg-green-900/20 hover:bg-green-900/30 text-green-400 border-green-800' : 'bg-green-50 hover:bg-green-100 text-green-600 border-green-200',
      action: 'Import Data'
    },
    {
      icon: BarChart3,
      title: 'Generate Report',
      description: 'Create performance reports',
      color: isDark ? 'bg-purple-900/20 hover:bg-purple-900/30 text-purple-400 border-purple-800' : 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200',
      action: 'Generate Report'
    },
    {
      icon: Target,
      title: 'Optimize Campaigns',
      description: 'AI-powered suggestions',
      color: isDark ? 'bg-orange-900/20 hover:bg-orange-900/30 text-orange-400 border-orange-800' : 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200',
      action: 'Optimize Campaigns'
    },
    {
      icon: Calendar,
      title: 'Schedule Campaign',
      description: 'Plan future launches',
      color: isDark ? 'bg-pink-900/20 hover:bg-pink-900/30 text-pink-400 border-pink-800' : 'bg-pink-50 hover:bg-pink-100 text-pink-600 border-pink-200',
      action: 'Schedule Campaign'
    },
    {
      icon: TrendingUp,
      title: 'View Analytics',
      description: 'Real-time insights',
      color: isDark ? 'bg-indigo-900/20 hover:bg-indigo-900/30 text-indigo-400 border-indigo-800' : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border-indigo-200',
      action: 'View Analytics'
    }
  ];

  return (
    <Card className={isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}>
      <CardHeader>
        <CardTitle className={`flex items-center space-x-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          <Zap className="w-5 h-5" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription className={isDark ? 'text-gray-400' : 'text-gray-600'}>
          Common tasks and shortcuts to boost your productivity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onAction(action.action)}
              className={`h-auto p-4 flex flex-col items-center justify-center space-y-3 ${action.color} hover:shadow-md transition-all duration-200 hover:scale-105 min-h-[120px]`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                isDark ? 'bg-gray-700 shadow-sm' : 'bg-white shadow-sm'
              }`}>
                <action.icon className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <div className="font-medium text-sm leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {action.title}
                </div>
                <div className="text-xs opacity-70 leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
