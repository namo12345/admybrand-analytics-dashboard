// Component Type: Manual
// Interactive ROI comparison chart - Fixed for white theme

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

interface ROIChartProps {
  data: Array<{
    name: string;
    roi: number;
    budget: number;
    status: string;
  }>;
}

export default function ROIChart({ data }: ROIChartProps) {
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

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="p-3 rounded-lg border shadow-lg bg-white border-gray-200">
          <p className="font-medium text-gray-900">
            {label}
          </p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            ROI: {data.roi.toFixed(1)}x
          </p>
          <p className="text-sm text-gray-600">
            Budget: ${(data.budget * 1000).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
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
            stroke="#e5e7eb" 
          />
          <XAxis 
            dataKey="name" 
            stroke="#6b7280"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#6b7280"
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
            fill="#2563eb"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
