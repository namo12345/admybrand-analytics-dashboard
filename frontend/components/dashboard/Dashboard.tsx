// Component Type: Hybrid (AI structure + manual enhancements)
// Main dashboard component with routing between analytics and management views - Fixed for white theme

import React, { useState, useEffect } from 'react';
import DashboardLayout from '../layout/DashboardLayout';
import AnalyticsView from './AnalyticsView';
import CampaignTable from './CampaignTable';
import InventoryTable from './InventoryTable';
import AIAssistant from './AIAssistant';
import QuickActions from './QuickActions';
import CreateCampaignModal from './modals/CreateCampaignModal';
import ImportDataModal from './modals/ImportDataModal';
import SettingsModal from './modals/SettingsModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bot, BarChart3, Package, Zap } from 'lucide-react';
import { User } from '../../App';
import { campaignService, inventoryService, analyticsService } from '../../lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Campaign, Inventory } from '../../lib/types';

interface DashboardProps {
  user: User;
  onNavigateToHero: () => void;
  onLogout: () => void;
}

export default function Dashboard({ user, onNavigateToHero, onLogout }: DashboardProps) {
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showImportData, setShowImportData] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const { toast } = useToast();

  const loadData = async () => {
    try {
      const [campaignData, inventoryData] = await Promise.all([
        campaignService.getAll(),
        inventoryService.getAll()
      ]);
      
      setCampaigns(campaignData.map((c: any) => ({
        ...c,
        mediaType: c.media_type,
        startDate: new Date(c.start_date),
        endDate: new Date(c.end_date),
      })));
      
      setInventory(inventoryData.map((i: any) => ({
        ...i,
        mediaOwner: i.media_owner,
        availabilityStart: new Date(i.availability_start),
        availabilityEnd: new Date(i.availability_end),
      })));
    } catch (error) {
      console.error('Error loading data:', error);
      console.log('Using fallback data');
    }
  };

  useEffect(() => {
    loadData();
    
    const campaignSubscription = campaignService.subscribe((payload) => {
      console.log('Campaign update:', payload);
      loadData();
    });

    const inventorySubscription = inventoryService.subscribe((payload) => {
      console.log('Inventory update:', payload);
      loadData();
    });

    return () => {
      if (campaignSubscription?.unsubscribe) campaignSubscription.unsubscribe();
      if (inventorySubscription?.unsubscribe) inventorySubscription.unsubscribe();
    };
  }, []);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'New Campaign':
        setShowCreateCampaign(true);
        break;
      case 'Import Data':
        setShowImportData(true);
        break;
      case 'Optimize Campaigns':
        setShowAIAssistant(true);
        break;
      default:
        console.log(`Action: ${action}`);
    }
  };

  const handleCampaignCreated = (newCampaign: any) => {
    const appCampaign: Campaign = {
      id: newCampaign.id || Date.now().toString(),
      name: newCampaign.name,
      mediaType: newCampaign.media_type,
      channel: newCampaign.channel,
      startDate: new Date(newCampaign.start_date),
      endDate: new Date(newCampaign.end_date),
      status: newCampaign.status,
      budget: newCampaign.budget,
      impressions: newCampaign.impressions,
      clicks: newCampaign.clicks,
      reach: newCampaign.reach,
      roi: newCampaign.roi,
    };
    setCampaigns(prev => [appCampaign, ...prev]);
    setShowCreateCampaign(false);
    toast({
      title: "Campaign created successfully!",
      description: `"${newCampaign.name}" has been added to your campaigns.`,
    });
  };

  const handleDataImported = () => {
    loadData();
    setShowImportData(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout 
        user={user} 
        onNavigateToHero={onNavigateToHero} 
        onLogout={onLogout}
        onOpenSettings={() => setShowSettings(true)}
      >
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

          {/* Quick Actions */}
          <QuickActions onAction={handleQuickAction} />

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="analytics" className="flex items-center space-x-2">
                <BarChart3 className="w-4 h-4" />
                <span>Analytics</span>
              </TabsTrigger>
              <TabsTrigger value="campaigns" className="flex items-center space-x-2">
                <Zap className="w-4 h-4" />
                <span>Campaigns</span>
              </TabsTrigger>
              <TabsTrigger value="inventory" className="flex items-center space-x-2">
                <Package className="w-4 h-4" />
                <span>Inventory</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analytics">
              <AnalyticsView />
            </TabsContent>

            <TabsContent value="campaigns">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">
                    Campaign Management
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Monitor and manage your advertising campaigns
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <CampaignTable data={campaigns} onDataChange={loadData} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
              <Card className="bg-white border-gray-200">
                <CardHeader>
                  <CardTitle className="text-gray-900">
                    Ad Inventory
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Browse and manage available advertising inventory
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <InventoryTable data={inventory} onDataChange={loadData} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>

      {/* Modals */}
      {showAIAssistant && (
        <AIAssistant onClose={() => setShowAIAssistant(false)} />
      )}
      
      {showCreateCampaign && (
        <CreateCampaignModal 
          onClose={() => setShowCreateCampaign(false)}
          onSuccess={handleCampaignCreated}
        />
      )}
      
      {showImportData && (
        <ImportDataModal 
          onClose={() => setShowImportData(false)}
          onSuccess={handleDataImported}
        />
      )}
      
      {showSettings && (
        <SettingsModal user={user} onClose={() => setShowSettings(false)} />
      )}
    </div>
  );
}
