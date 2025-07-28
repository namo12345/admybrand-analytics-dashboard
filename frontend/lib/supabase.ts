// Component Type: Manual
// Supabase client configuration and database operations

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface DatabaseCampaign {
  id: string;
  name: string;
  media_type: string;
  channel: string;
  start_date: string;
  end_date: string;
  status: string;
  budget: number;
  impressions: number;
  clicks: number;
  reach: number;
  roi: number;
  created_at: string;
  updated_at: string;
}

export interface DatabaseInventory {
  id: string;
  type: string;
  location: string;
  media_owner: string;
  size: string;
  availability_start: string;
  availability_end: string;
  price: number;
  status: string;
  created_at: string;
  updated_at: string;
}

// Campaign operations
export const campaignService = {
  async getAll() {
    const { data, error } = await supabase
      .from('campaigns')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(campaign: Omit<DatabaseCampaign, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('campaigns')
      .insert([campaign])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<DatabaseCampaign>) {
    const { data, error } = await supabase
      .from('campaigns')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('campaigns')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Real-time subscription
  subscribe(callback: (payload: any) => void) {
    return supabase
      .channel('campaigns')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'campaigns' }, 
        callback
      )
      .subscribe();
  }
};

// Inventory operations
export const inventoryService = {
  async getAll() {
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async create(inventory: Omit<DatabaseInventory, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('inventory')
      .insert([inventory])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async update(id: string, updates: Partial<DatabaseInventory>) {
    const { data, error } = await supabase
      .from('inventory')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('inventory')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  // Real-time subscription
  subscribe(callback: (payload: any) => void) {
    return supabase
      .channel('inventory')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'inventory' }, 
        callback
      )
      .subscribe();
  }
};

// Analytics operations
export const analyticsService = {
  async getKPIs() {
    const { data: campaigns, error } = await supabase
      .from('campaigns')
      .select('budget, impressions, clicks, roi, status');
    
    if (error) throw error;
    
    const activeCampaigns = campaigns?.filter(c => c.status === 'Active') || [];
    
    return {
      totalSpend: campaigns?.reduce((sum, c) => sum + (c.budget || 0), 0) || 0,
      totalImpressions: activeCampaigns.reduce((sum, c) => sum + (c.impressions || 0), 0),
      totalClicks: activeCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
      averageROI: activeCampaigns.length > 0 
        ? activeCampaigns.reduce((sum, c) => sum + (c.roi || 0), 0) / activeCampaigns.length 
        : 0
    };
  },

  async getPerformanceData() {
    const { data, error } = await supabase
      .from('campaigns')
      .select('name, budget, impressions, clicks, roi, media_type, status, created_at')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  },

  async getMediaTypeBreakdown() {
    const { data, error } = await supabase
      .from('campaigns')
      .select('media_type, budget, impressions, roi');
    
    if (error) throw error;
    
    const breakdown = (data || []).reduce((acc: any, campaign) => {
      const mediaType = campaign.media_type;
      if (!acc[mediaType]) {
        acc[mediaType] = { budget: 0, impressions: 0, campaigns: 0, totalROI: 0 };
      }
      acc[mediaType].budget += campaign.budget || 0;
      acc[mediaType].impressions += campaign.impressions || 0;
      acc[mediaType].campaigns += 1;
      acc[mediaType].totalROI += campaign.roi || 0;
      return acc;
    }, {});

    return Object.entries(breakdown).map(([mediaType, data]: [string, any]) => ({
      mediaType,
      budget: data.budget,
      impressions: data.impressions,
      campaigns: data.campaigns,
      averageROI: data.totalROI / data.campaigns
    }));
  }
};
