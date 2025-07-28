// Component Type: AI-generated
// KPI summary cards component displaying key metrics

import React from 'react';
import { DollarSign, Eye, Target, TrendingUp } from 'lucide-react';
import { mockCampaigns } from '../../lib/data';
import { formatCurrency, formatNumber } from '../../lib/utils';

export default function KPICards() {
  // Calculate KPIs from mock data
  const totalSpend = mockCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalImpressions = mockCampaigns.reduce((sum, campaign) => sum + campaign.impressions, 0);
  const totalClicks = mockCampaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);
  const averageROI = mockCampaigns.reduce((sum, campaign) => sum + campaign.roi, 0) / mockCampaigns.length;

  const kpis = [
    {
      title: 'Total Spend',
      value: formatCurrency(totalSpend),
      icon: DollarSign,
      change: '+12.5%',
      changeType: 'positive' as const,
      description: 'vs last month'
    },
    {
      title: 'Total Impressions',
      value: formatNumber(totalImpressions),
      icon: Eye,
      change: '+8.2%',
      changeType: 'positive' as const,
      description: 'vs last month'
    },
    {
      title: 'Total Conversions',
      value: formatNumber(totalClicks),
      icon: Target,
      change: '+15.3%',
      changeType: 'positive' as const,
      description: 'vs last month'
    },
    {
      title: 'Average ROI',
      value: `${averageROI.toFixed(1)}x`,
      icon: TrendingUp,
      change: '+5.7%',
      changeType: 'positive' as const,
      description: 'vs last month'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <kpi.icon className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <span className={`text-sm font-medium ${
              kpi.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.change}
            </span>
            <span className="text-sm text-gray-500">{kpi.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
