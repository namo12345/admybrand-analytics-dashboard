// Component Type: Hybrid (AI structure + manual refinements)
// Main application component with dashboard layout and state management

import React from 'react';
import DashboardLayout from './components/layout/DashboardLayout';
import KPICards from './components/dashboard/KPICards';
import CampaignTable from './components/dashboard/CampaignTable';
import InventoryTable from './components/dashboard/InventoryTable';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardLayout>
        <div className="space-y-8">
          {/* KPI Summary Cards */}
          <KPICards />
          
          {/* Campaign Management Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Campaign Management</h2>
              <p className="text-sm text-gray-600 mt-1">Monitor and manage your advertising campaigns</p>
            </div>
            <CampaignTable />
          </div>

          {/* Ad Inventory Section */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Ad Inventory</h2>
              <p className="text-sm text-gray-600 mt-1">Browse and manage available advertising inventory</p>
            </div>
            <InventoryTable />
          </div>
        </div>
      </DashboardLayout>
      <Toaster />
    </div>
  );
}
