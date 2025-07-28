// Component Type: Manual
// Settings modal for dashboard configuration - Fixed for white theme and functionality

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { X, Settings, User, Bell, Shield, Palette } from 'lucide-react';
import { User as UserType } from '../../../App';

interface SettingsModalProps {
  user: UserType;
  onClose: () => void;
}

export default function SettingsModal({ user, onClose }: SettingsModalProps) {
  const [settings, setSettings] = useState({
    // Profile settings
    name: user.name,
    email: user.email,
    role: user.role,
    timezone: 'UTC-5',
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    budgetAlerts: true,
    
    // Dashboard settings
    theme: 'light',
    defaultView: 'analytics',
    itemsPerPage: '10',
    autoRefresh: true,
    
    // Privacy settings
    dataSharing: false,
    analytics: true,
    cookies: true
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Settings saved",
        description: "Your preferences have been updated successfully.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Error saving settings",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden bg-white border-gray-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
              <Settings className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-lg text-gray-900">Settings</CardTitle>
              <p className="text-sm text-gray-500">Manage your account and preferences</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="profile" className="h-[600px]">
            <TabsList className="grid w-full grid-cols-4 rounded-none border-b bg-gray-50">
              <TabsTrigger value="profile" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center space-x-2">
                <Bell className="w-4 h-4" />
                <span>Notifications</span>
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <Palette className="w-4 h-4" />
                <span>Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="privacy" className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Privacy</span>
              </TabsTrigger>
            </TabsList>

            <div className="overflow-y-auto h-[500px]">
              <TabsContent value="profile" className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                      <Input
                        id="name"
                        value={settings.name}
                        onChange={(e) => updateSetting('name', e.target.value)}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSetting('email', e.target.value)}
                        className="bg-white border-gray-300"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-gray-700">Role</Label>
                      <Input
                        id="role"
                        value={settings.role}
                        onChange={(e) => updateSetting('role', e.target.value)}
                        className="bg-white border-gray-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="timezone" className="text-gray-700">Timezone</Label>
                      <Select value={settings.timezone} onValueChange={(value) => updateSetting('timezone', value)}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300">
                          <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                          <SelectItem value="UTC-7">Mountain Time (UTC-7)</SelectItem>
                          <SelectItem value="UTC-6">Central Time (UTC-6)</SelectItem>
                          <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                          <SelectItem value="UTC+0">UTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notification Preferences</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="email-notifications" className="text-gray-700">Email Notifications</Label>
                        <p className="text-sm text-gray-500">Receive updates via email</p>
                      </div>
                      <Switch
                        id="email-notifications"
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="push-notifications" className="text-gray-700">Push Notifications</Label>
                        <p className="text-sm text-gray-500">Browser push notifications</p>
                      </div>
                      <Switch
                        id="push-notifications"
                        checked={settings.pushNotifications}
                        onCheckedChange={(checked) => updateSetting('pushNotifications', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="weekly-reports" className="text-gray-700">Weekly Reports</Label>
                        <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
                      </div>
                      <Switch
                        id="weekly-reports"
                        checked={settings.weeklyReports}
                        onCheckedChange={(checked) => updateSetting('weeklyReports', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="budget-alerts" className="text-gray-700">Budget Alerts</Label>
                        <p className="text-sm text-gray-500">Alerts when campaigns reach budget limits</p>
                      </div>
                      <Switch
                        id="budget-alerts"
                        checked={settings.budgetAlerts}
                        onCheckedChange={(checked) => updateSetting('budgetAlerts', checked)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="dashboard" className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Dashboard Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme" className="text-gray-700">Theme</Label>
                      <Select value={settings.theme} onValueChange={(value) => updateSetting('theme', value)}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300">
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark" disabled>Dark (Coming Soon)</SelectItem>
                          <SelectItem value="auto" disabled>Auto (Coming Soon)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="default-view" className="text-gray-700">Default View</Label>
                      <Select value={settings.defaultView} onValueChange={(value) => updateSetting('defaultView', value)}>
                        <SelectTrigger className="bg-white border-gray-300">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-300">
                          <SelectItem value="analytics">Analytics</SelectItem>
                          <SelectItem value="campaigns">Campaigns</SelectItem>
                          <SelectItem value="inventory">Inventory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="items-per-page" className="text-gray-700">Items Per Page</Label>
                    <Select value={settings.itemsPerPage} onValueChange={(value) => updateSetting('itemsPerPage', value)}>
                      <SelectTrigger className="w-32 bg-white border-gray-300">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300">
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="25">25</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-refresh" className="text-gray-700">Auto Refresh</Label>
                      <p className="text-sm text-gray-500">Automatically refresh data every 5 minutes</p>
                    </div>
                    <Switch
                      id="auto-refresh"
                      checked={settings.autoRefresh}
                      onCheckedChange={(checked) => updateSetting('autoRefresh', checked)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy" className="p-6 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-sharing" className="text-gray-700">Data Sharing</Label>
                        <p className="text-sm text-gray-500">Share anonymized data for product improvement</p>
                      </div>
                      <Switch
                        id="data-sharing"
                        checked={settings.dataSharing}
                        onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="analytics" className="text-gray-700">Analytics</Label>
                        <p className="text-sm text-gray-500">Allow usage analytics collection</p>
                      </div>
                      <Switch
                        id="analytics"
                        checked={settings.analytics}
                        onCheckedChange={(checked) => updateSetting('analytics', checked)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="cookies" className="text-gray-700">Cookies</Label>
                        <p className="text-sm text-gray-500">Accept non-essential cookies</p>
                      </div>
                      <Switch
                        id="cookies"
                        checked={settings.cookies}
                        onCheckedChange={(checked) => updateSetting('cookies', checked)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>

            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : null}
                Save Changes
              </Button>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
