// Component Type: Manual
// Enhanced quick action buttons with proper styling and functionality - Fixed for white theme

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Plus, 
  Upload, 
  Target,
  Zap
} from 'lucide-react';

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export default function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      icon: Plus,
      title: 'New Campaign',
      description: 'Create a new campaign',
      color: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200',
      action: 'New Campaign'
    },
    {
      icon: Upload,
      title: 'Import Data',
      description: 'Upload CSV files',
      color: 'bg-green-50 hover:bg-green-100 text-green-600 border-green-200',
      action: 'Import Data'
    },
    {
      icon: Target,
      title: 'Optimize Campaigns',
      description: 'AI-powered suggestions',
      color: 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200',
      action: 'Optimize Campaigns'
    }
  ];

  return (
    <Card className="bg-white border-gray-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-gray-900">
          <Zap className="w-5 h-5" />
          <span>Quick Actions</span>
        </CardTitle>
        <CardDescription className="text-gray-600">
          Common tasks and shortcuts to boost your productivity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => onAction(action.action)}
              className={`h-auto p-4 flex flex-col items-center justify-center space-y-3 ${action.color} hover:shadow-md transition-all duration-200 hover:scale-105 min-h-[120px]`}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-white shadow-sm">
                <action.icon className="w-6 h-6" />
              </div>
              <div className="text-center space-y-1">
                <div className="font-medium text-sm leading-tight">
                  {action.title}
                </div>
                <div className="text-xs opacity-70 leading-tight">
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
