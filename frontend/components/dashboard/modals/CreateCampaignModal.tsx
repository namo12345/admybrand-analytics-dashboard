// Component Type: Manual
// Enhanced campaign creation modal with Supabase integration

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { X, Plus, Calendar, DollarSign } from 'lucide-react';
import { MediaType } from '../../../lib/types';
import { campaignService } from '../../../lib/supabase';
import { useTheme } from '../../providers/ThemeProvider';

interface CreateCampaignModalProps {
  onClose: () => void;
  onSuccess: (newCampaign: any) => void;
}

export default function CreateCampaignModal({ onClose, onSuccess }: CreateCampaignModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    media_type: '' as MediaType | '',
    channel: '',
    budget: '',
    start_date: '',
    end_date: '',
    target_audience: '',
    objectives: '',
    status: 'Draft'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { isDark } = useTheme();

  const mediaTypes: MediaType[] = ['Digital', 'Outdoor', 'TV', 'Radio', 'Print', 'Social'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const campaignData = {
        name: formData.name,
        media_type: formData.media_type,
        channel: formData.channel,
        start_date: formData.start_date,
        end_date: formData.end_date,
        status: formData.status,
        budget: parseInt(formData.budget) || 0,
        impressions: 0,
        clicks: 0,
        reach: 0,
        roi: 0
      };

      const newCampaign = await campaignService.create(campaignData);
      onSuccess(newCampaign);
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast({
        title: "Error creating campaign",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      }`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <Plus className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className={isDark ? 'text-white' : 'text-gray-900'}>
                Create New Campaign
              </CardTitle>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Set up a new advertising campaign
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Basic Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Campaign Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter campaign name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mediaType" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Media Type *
                  </Label>
                  <Select value={formData.media_type} onValueChange={(value) => handleInputChange('media_type', value)}>
                    <SelectTrigger className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}>
                      <SelectValue placeholder="Select media type" />
                    </SelectTrigger>
                    <SelectContent className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
                      {mediaTypes.map((type) => (
                        <SelectItem key={type} value={type} className={isDark ? 'text-white hover:bg-gray-600' : ''}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign objectives and strategy"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                  className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
                />
              </div>
            </div>

            {/* Campaign Details */}
            <div className="space-y-4">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Campaign Details
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="channel" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Channel/Platform
                  </Label>
                  <Input
                    id="channel"
                    placeholder="e.g., Google Ads, Facebook, NBC"
                    value={formData.channel}
                    onChange={(e) => handleInputChange('channel', e.target.value)}
                    className={isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Budget ($)
                  </Label>
                  <div className="relative">
                    <DollarSign className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-400'
                    }`} />
                    <Input
                      id="budget"
                      type="number"
                      placeholder="0"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className={`pl-10 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    Start Date
                  </Label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-400'
                    }`} />
                    <Input
                      id="startDate"
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => handleInputChange('start_date', e.target.value)}
                      className={`pl-10 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endDate" className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                    End Date
                  </Label>
                  <div className="relative">
                    <Calendar className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-400'
                    }`} />
                    <Input
                      id="endDate"
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => handleInputChange('end_date', e.target.value)}
                      className={`pl-10 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className={`flex justify-end space-x-3 pt-4 border-t ${
              isDark ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || !formData.name || !formData.media_type}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                ) : null}
                Create Campaign
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
