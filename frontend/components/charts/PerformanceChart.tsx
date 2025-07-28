// Component Type: Manual
// Interactive performance chart component

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTheme } from '../providers/ThemeProvider';

interface PerformanceChartProps {
  data: Array<{
    name: string;
    budget: number;
    impressions: number;
    clicks: number;
    roi: number;
    date: string;
  }>;
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const { isDark } = useTheme();

  const chartData = data.map(item => ({
    name: item.name.length > 15 ? item.name.substring(0, 15) + '...' : item.name,
    budget: item.budget / 1000, // Convert to thousands
    impressions: item.impressions / 1000, // Convert to thousands
    clicks: item.clicks,
    roi: item.roi
  }));

  const colors = {
    budget: isDark ? '#60a5fa' : '#3b82f6',
    impressions: isDark ? '#34d399' : '#10b981',
    clicks: isDark ? '#fbbf24' : '#f59e0b',
    roi: isDark ? '#f87171' : '#ef4444'
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className={`p-3 rounded-lg border shadow-lg ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {label}
          </p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey === 'budget' && `Budget: $${(entry.value * 1000).toLocaleString()}`}
              {entry.dataKey === 'impressions' && `Impressions: ${(entry.value * 1000).toLocaleString()}`}
              {entry.dataKey === 'clicks' && `Clicks: ${entry.value.toLocaleString()}`}
              {entry.dataKey === 'roi' && `ROI: ${entry.value.toFixed(1)}x`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDark ? '#374151' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="name" 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            fontSize={12}
          />
          <YAxis 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            type="monotone"
            dataKey="budget"
            stroke={colors.budget}
            strokeWidth={2}
            dot={{ fill: colors.budget, strokeWidth: 2, r: 4 }}
            name="Budget (K)"
          />
          <Line
            type="monotone"
            dataKey="impressions"
            stroke={colors.impressions}
            strokeWidth={2}
            dot={{ fill: colors.impressions, strokeWidth: 2, r: 4 }}
            name="Impressions (K)"
          />
          <Line
            type="monotone"
            dataKey="roi"
            stroke={colors.roi}
            strokeWidth={2}
            dot={{ fill: colors.roi, strokeWidth: 2, r: 4 }}
            name="ROI"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
