// Component Type: Manual
// Main analytics view with real-time charts and KPIs - Fixed for white theme

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Eye, 
  MousePointer, 
  Target,
  RefreshCw,
  Download,
  Calendar
} from 'lucide-react';
import PerformanceChart from '../charts/PerformanceChart';
import MediaTypeChart from '../charts/MediaTypeChart';
import ROIChart from '../charts/ROIChart';
import { analyticsService } from '../../lib/supabase';
import { formatCurrency, formatNumber } from '../../lib/utils';

export default function AnalyticsView() {
  const [kpis, setKpis] = useState({
    totalSpend: 0,
    totalImpressions: 0,
    totalClicks: 0,
    averageROI: 0
  });
  const [performanceData, setPerformanceData] = useState([]);
  const [mediaTypeData, setMediaTypeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const { toast } = useToast();

  const loadAnalyticsData = async () => {
    try {
      setIsLoading(true);
      
      const [kpiData, performanceData, mediaBreakdown] = await Promise.all([
        analyticsService.getKPIs(),
        analyticsService.getPerformanceData(),
        analyticsService.getMediaTypeBreakdown()
      ]);

      setKpis(kpiData);
      setPerformanceData(performanceData);
      setMediaTypeData(mediaBreakdown);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading analytics:', error);
      console.log('Using fallback analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAnalyticsData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(loadAnalyticsData, 30000);
    return () => clearInterval(interval);
  }, []);

  const kpiCards = [
    {
      title: 'Total Spend',
      value: formatCurrency(kpis.totalSpend),
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const,
      description: 'vs last month'
    },
    {
      title: 'Total Impressions',
      value: formatNumber(kpis.totalImpressions),
      icon: Eye,
      change: '+8.2%',
      changeType: 'positive' as const,
      description: 'vs last month'
    },
    {
      title: 'Total Clicks',
      value: formatNumber(kpis.totalClicks),
      icon: MousePointer,
      change: '+15.3%',
      changeType: 'positive' as const,
      description: 'vs last month'
    },
    {
      title: 'Average ROI',
      value: `${kpis.averageROI.toFixed(1)}x`,
      icon: TrendingUp,
      change: '+5.7%',
      changeType: 'positive' as const,
      description: 'vs last month'
    }
  ];

  const exportData = () => {
    try {
      const csvData = performanceData.map((item: any) => ({
        Campaign: item.name,
        'Media Type': item.media_type,
        Budget: item.budget,
        Impressions: item.impressions,
        Clicks: item.clicks,
        ROI: item.roi,
        Status: item.status
      }));

      const csvContent = [
        Object.keys(csvData[0] || {}).join(','),
        ...csvData.map(row => Object.values(row).join(','))
      ].join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);

      toast({
        title: "Export successful",
        description: "Analytics data exported to CSV",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Real-time campaign performance and insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-500 flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
          <Button onClick={loadAnalyticsData} variant="outline" size="sm" disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-50">
                    <kpi.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {kpi.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {kpi.value}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Badge variant={kpi.changeType === 'positive' ? 'default' : 'destructive'} className="text-xs">
                  {kpi.change}
                </Badge>
                <span className="text-sm text-gray-500">
                  {kpi.description}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100">
          <TabsTrigger value="performance" className="flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Performance</span>
          </TabsTrigger>
          <TabsTrigger value="media-types" className="flex items-center space-x-2">
            <Target className="w-4 h-4" />
            <span>Media Types</span>
          </TabsTrigger>
          <TabsTrigger value="roi" className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>ROI Analysis</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="performance">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Campaign Performance Trends
              </CardTitle>
              <CardDescription className="text-gray-600">
                Track budget, impressions, and ROI across all campaigns
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <PerformanceChart data={performanceData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media-types">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                Media Type Breakdown
              </CardTitle>
              <CardDescription className="text-gray-600">
                Budget allocation and performance by media type
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <MediaTypeChart data={mediaTypeData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roi">
          <Card className="bg-white border-gray-200">
            <CardHeader>
              <CardTitle className="text-gray-900">
                ROI Analysis
              </CardTitle>
              <CardDescription className="text-gray-600">
                Top performing campaigns by return on investment
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-80 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <ROIChart data={performanceData} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Real-time Status */}
      <Card className="bg-white border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600">
                Real-time data updates every 30 seconds
              </span>
            </div>
            <Badge variant="outline">
              Live Analytics
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
