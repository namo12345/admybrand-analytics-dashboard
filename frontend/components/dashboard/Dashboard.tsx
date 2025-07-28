// Component Type: Hybrid (AI structure + manual enhancements)
// Main dashboard component with AI assistant integration

import React, { useState } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import KPICards from './KPICards';
import CampaignTable from './CampaignTable';
import InventoryTable from './InventoryTable';
import AIAssistant from './AIAssistant';
import QuickActions from './QuickActions';
import RecentActivity from './RecentActivity';
import CreateCampaignModal from './modals/CreateCampaignModal';
import ImportDataModal from './modals/ImportDataModal';
import SettingsModal from './modals/SettingsModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, BarChart3, Package, Activity, Zap } from 'lucide-react';
import { User } from '../App';

interface DashboardProps {
  user: User;
  onNavigateToHero: () => void;
  onLogout: () => void;
}

export default function Dashboard({ user, onNavigateToHero, onLogout }: DashboardProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showImportData, setShowImportData] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'New Campaign':
        setShowCreateCampaign(true);
        break;
      case 'Import Data':
        setShowImportData(true);
        break;
      case 'Settings':
        setShowSettings(true);
        break;
      case 'Generate Report':
        // This would trigger report generation
        console.log('Generating report...');
        break;
      case 'Optimize Campaigns':
        setShowAIAssistant(true);
        break;
      case 'Schedule Campaign':
        // This would open campaign scheduler
        console.log('Opening campaign scheduler...');
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout user={user} onNavigateToHero={onNavigateToHero} onLogout={onLogout}>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h1>
                <p className="text-blue-100">
                  Your campaigns are performing 24% better than last month. Here's your overview.
                </p>
              </div>
              <Button
                onClick={() => setShowAIAssistant(true)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Bot className="w-4 h-4 mr-2" />
                Ask AI Assistant
              </Button>
            </div>
          </div>

          {/* KPI Summary Cards */}
          <KPICards />

          {/* Quick Actions */}
          <QuickActions onAction={handleQuickAction} />

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Overview</span>
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Campaigns</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Inventory</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="flex items-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>Activity</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Campaign Performance Chart Placeholder */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Campaign Performance Trends</CardTitle>
                      <CardDescription>
                        Track your campaign metrics over time
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500">Interactive charts coming soon</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Top Campaigns Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Campaigns</CardTitle>
                      <CardDescription>
                        Your best campaigns this month
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          { name: 'Summer Fashion Campaign', roi: '5.2x', spend: '$35,000' },
                          { name: 'TV Prime Time Spots', roi: '4.1x', spend: '$120,000' },
                          { name: 'Digital Display Network', roi: '3.7x', spend: '$60,000' }
                        ].map((campaign, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{campaign.name}</p>
                              <p className="text-sm text-gray-500">Spend: {campaign.spend}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-green-600">{campaign.roi}</p>
                              <p className="text-xs text-gray-500">ROI</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <RecentActivity />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="campaigns">
              <Card>
                <CardHeader>
                  <CardTitle>Campaign Management</CardTitle>
                  <CardDescription>
                    Monitor and manage your advertising campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <CampaignTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle>Ad Inventory</CardTitle>
                  <CardDescription>
                    Browse and manage available advertising inventory
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <InventoryTable />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <div className="grid lg:grid-cols-2 gap-6">
                <RecentActivity />
                <Card>
                  <CardHeader>
                    <CardTitle>System Notifications</CardTitle>
                    <CardDescription>
                      Important updates and alerts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { type: 'success', message: 'Campaign "Summer Fashion" exceeded ROI target', time: '2 hours ago' },
                        { type: 'warning', message: 'Budget alert: "Radio Morning Drive" at 85% spend', time: '4 hours ago' },
                        { type: 'info', message: 'New inventory available in Times Square', time: '6 hours ago' }
                      ].map((notification, index) => (
                        <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                          }`}></div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-900">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>

      {/* Modals */}
      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}
      
      {showCreateCampaign && (
        <CreateCampaignModal onClose={() => setShowCreateCampaign(false)} />
      )}
      
      {showImportData && (
        <ImportDataModal onClose={() => setShowImportData(false)} />
      )}
      
      {showSettings && (
        <SettingsModal user={user} onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
