// Component Type: Manual
// Quick action buttons for common dashboard tasks

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

export default function QuickActions() {
  const actions = [
    {
      icon: Plus,
      title: 'New Campaign',
      description: 'Create a new advertising campaign',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600',
      action: () => console.log('Create campaign')
    },
    {
      icon: Upload,
      title: 'Import Data',
      description: 'Upload campaign or inventory data',
      color: 'bg-green-50 hover:bg-green-100 text-green-600',
      action: () => console.log('Import data')
    },
    {
      icon: BarChart3,
      title: 'Generate Report',
      description: 'Create performance reports',
      color: 'bg-purple-50 hover:bg-purple-100 text-purple-600',
      action: () => console.log('Generate report')
    },
    {
      icon: Target,
      title: 'Optimize Campaigns',
      description: 'AI-powered optimization suggestions',
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-600',
      action: () => console.log('Optimize campaigns')
    },
    {
      icon: Calendar,
      title: 'Schedule Campaign',
      description: 'Plan future campaign launches',
      color: 'bg-pink-50 hover:bg-pink-100 text-pink-600',
      action: () => console.log('Schedule campaign')
    },
    {
      icon: Settings,
      title: 'Settings',
      description: 'Configure dashboard preferences',
      color: 'bg-gray-50 hover:bg-gray-100 text-gray-600',
      action: () => console.log('Open settings')
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
              variant="ghost"
              onClick={action.action}
              className={`h-auto p-4 flex flex-col items-center space-y-2 ${action.color} border border-transparent hover:border-current/20`}
            >
              <action.icon className="w-6 h-6" />
              <div className="text-center">
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-70 mt-1">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
