// Component Type: Manual
// Recent activity feed component

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  DollarSign,
  Eye,
  MousePointer
} from 'lucide-react';

export default function RecentActivity() {
  const activities = [
    {
      id: '1',
      type: 'success',
      icon: TrendingUp,
      title: 'Campaign Performance Boost',
      description: 'Social Media Blitz exceeded ROI target by 30%',
      time: '2 hours ago',
      metric: '+30% ROI'
    },
    {
      id: '2',
      type: 'warning',
      icon: AlertTriangle,
      title: 'Budget Alert',
      description: 'Radio Morning Drive campaign at 85% budget utilization',
      time: '4 hours ago',
      metric: '85% spent'
    },
    {
      id: '3',
      type: 'info',
      icon: Eye,
      title: 'High Impression Volume',
      description: 'TV Prime Time Spots reached 1M impressions milestone',
      time: '6 hours ago',
      metric: '1M impressions'
    },
    {
      id: '4',
      type: 'success',
      icon: CheckCircle,
      title: 'Campaign Completed',
      description: 'Transit Advertising campaign finished successfully',
      time: '8 hours ago',
      metric: '2.9x ROI'
    },
    {
      id: '5',
      type: 'info',
      icon: MousePointer,
      title: 'Click Rate Improvement',
      description: 'Digital Display Network shows 15% CTR increase',
      time: '12 hours ago',
      metric: '+15% CTR'
    },
    {
      id: '6',
      type: 'neutral',
      icon: Clock,
      title: 'Scheduled Campaign',
      description: 'Print Magazine Ads scheduled for next month',
      time: '1 day ago',
      metric: 'Scheduled'
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-50';
      case 'warning': return 'text-yellow-600 bg-yellow-50';
      case 'info': return 'text-blue-600 bg-blue-50';
      case 'error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getMetricColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'info': return 'bg-blue-100 text-blue-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Activity className="w-5 h-5" />
          <span>Recent Activity</span>
        </CardTitle>
        <CardDescription>
          Latest updates and notifications from your campaigns
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                <activity.icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <Badge variant="secondary" className={`text-xs ${getMetricColor(activity.type)}`}>
                    {activity.metric}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {activity.description}
                </p>
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t">
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all activity →
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
