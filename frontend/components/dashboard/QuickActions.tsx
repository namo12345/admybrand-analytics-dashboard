// Component Type: Manual
// Quick action buttons for common dashboard tasks with functional implementations

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Upload, 
  Download, 
  Settings, 
  BarChart3, 
  Target,
  Zap,
  Calendar
} from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export default function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      icon: Plus,
      title: 'New Campaign',
      description: 'Create a new advertising campaign',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200',
      action: 'New Campaign'
    },
    {
      icon: Upload,
      title: 'Import Data',
      description: 'Upload campaign or inventory data',
      color: 'bg-green-50 hover:bg-green-100 text-green-600 border-green-200',
      action: 'Import Data'
    },
    {
      icon: BarChart3,
      title: 'Generate Report',
      description: 'Create performance reports',
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-600 border-purple-200',
      action: 'Generate Report'
    },
    {
      icon: Target,
      title: 'Optimize Campaigns',
      description: 'AI-powered optimization suggestions',
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200',
      action: 'Optimize Campaigns'
    },
    {
      icon: Calendar,
      title: 'Schedule Campaign',
      description: 'Plan future campaign launches',
      color: 'bg-pink-50 hover:bg-pink-100 text-pink-600 border-pink-200',
      action: 'Schedule Campaign'
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure dashboard preferences',
      color: 'bg-gray-50 hover:bg-gray-100 text-gray-600 border-gray-200',
      action: 'Settings'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription>
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
              className={`h-auto p-4 flex flex-col items-center space-y-3 ${action.color} hover:shadow-md transition-all duration-200 hover:scale-105`}
            >
              <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center">
                <action.icon className="w-5 h-5" />
              </div>
              <div className="text-center">
                <div className="font-medium text-sm leading-tight">{action.title}</div>
                <div className="text-xs opacity-70 mt-1 leading-tight">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
