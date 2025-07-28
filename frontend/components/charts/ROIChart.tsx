// Component Type: Manual
// Interactive ROI comparison chart

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useTheme } from '../providers/ThemeProvider';

interface ROIChartProps {
  data: Array<{
    name: string;
    roi: number;
    budget: number;
    status: string;
  }>;
}

export default function ROIChart({ data }: ROIChartProps) {
  const { isDark } = useTheme();

  const chartData = data
    .filter(item => item.roi > 0)
    .sort((a, b) => b.roi - a.roi)
    .slice(0, 10) // Top 10 campaigns
    .map(item => ({
      name: item.name.length > 12 ? item.name.substring(0, 12) + '...' : item.name,
      roi: item.roi,
      budget: item.budget / 1000, // Convert to thousands
      status: item.status
    }));

  const getBarColor = (status: string) => {
    switch (status) {
      case 'Active': return isDark ? '#10b981' : '#059669';
      case 'Completed': return isDark ? '#3b82f6' : '#2563eb';
      case 'Paused': return isDark ? '#f59e0b' : '#d97706';
      default: return isDark ? '#6b7280' : '#4b5563';
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className={`p-3 rounded-lg border shadow-lg ${
          isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {label}
          </p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            ROI: {data.roi.toFixed(1)}x
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Budget: ${(data.budget * 1000).toLocaleString()}
          </p>
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Status: {data.status}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke={isDark ? '#374151' : '#e5e7eb'} 
          />
          <XAxis 
            dataKey="name" 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke={isDark ? '#9ca3af' : '#6b7280'}
            fontSize={12}
            label={{ 
              value: 'ROI (x)', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle' }
            }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="roi" 
            fill={isDark ? '#3b82f6' : '#2563eb'}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
