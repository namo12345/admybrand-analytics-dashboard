// Component Type: Manual
// Supabase client configuration and database operations with fallback data

import { mockCampaigns, mockInventory } from './data';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

// Mock Supabase client for development
export const supabase = {
  from: () => ({
    select: () => ({
      order: () => ({
        data: [],
        error: new Error('Supabase not configured - using mock data')
      })
    }),
    insert: () => ({
      select: () => ({
        single: () => ({
          data: null,
          error: new Error('Supabase not configured - using mock data')
        })
      })
    }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: () => ({
            data: null,
            error: new Error('Supabase not configured - using mock data')
          })
        })
      })
    }),
    delete: () => ({
      eq: () => ({
        error: new Error('Supabase not configured - using mock data')
      })
    })
  }),
  channel: () => ({
    on: () => ({
      subscribe: () => ({
        unsubscribe: () => {}
      })
    })
  })
};

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

// Convert mock data to database format
const convertCampaignToDb = (campaign: any): DatabaseCampaign => ({
  id: campaign.id,
  name: campaign.name,
  media_type: campaign.mediaType,
  channel: campaign.channel,
  start_date: campaign.startDate.toISOString().split('T')[0],
  end_date: campaign.endDate.toISOString().split('T')[0],
  status: campaign.status,
  budget: campaign.budget,
  impressions: campaign.impressions,
  clicks: campaign.clicks,
  reach: campaign.reach,
  roi: campaign.roi,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
});

// Campaign operations with fallback to mock data
export const campaignService = {
  async getAll() {
    try {
      // Always use mock data for now
      return mockCampaigns.map(convertCampaignToDb);
    } catch (error) {
      console.log('Using mock campaign data');
      return mockCampaigns.map(convertCampaignToDb);
    }
  },

  async create(campaign: Omit<DatabaseCampaign, 'id' | 'created_at' | 'updated_at'>) {
    try {
      // Simulate successful creation
      const newCampaign = {
        ...campaign,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return newCampaign;
    } catch (error) {
      throw new Error('Failed to create campaign');
    }
  },

  async update(id: string, updates: Partial<DatabaseCampaign>) {
    try {
      // Simulate successful update
      return { ...updates, id, updated_at: new Date().toISOString() };
    } catch (error) {
      throw new Error('Failed to update campaign');
    }
  },

  async delete(id: string) {
    try {
      // Simulate successful deletion
      return;
    } catch (error) {
      throw new Error('Failed to delete campaign');
    }
  },

  // Mock real-time subscription
  subscribe(callback: (payload: any) => void) {
    return {
      unsubscribe: () => {}
    };
  }
};

// Inventory operations with fallback to mock data
export const inventoryService = {
  async getAll() {
    try {
      // Always use mock data for now
      return mockInventory.map(item => ({
        id: item.id,
        type: item.type,
        location: item.location,
        media_owner: item.mediaOwner,
        size: item.size,
        availability_start: item.availabilityStart.toISOString().split('T')[0],
        availability_end: item.availabilityEnd.toISOString().split('T')[0],
        price: item.price,
        status: item.status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    } catch (error) {
      console.log('Using mock inventory data');
      return mockInventory.map(item => ({
        id: item.id,
        type: item.type,
        location: item.location,
        media_owner: item.mediaOwner,
        size: item.size,
        availability_start: item.availabilityStart.toISOString().split('T')[0],
        availability_end: item.availabilityEnd.toISOString().split('T')[0],
        price: item.price,
        status: item.status,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }));
    }
  },

  async create(inventory: Omit<DatabaseInventory, 'id' | 'created_at' | 'updated_at'>) {
    try {
      // Simulate successful creation
      const newInventory = {
        ...inventory,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      return newInventory;
    } catch (error) {
      throw new Error('Failed to create inventory');
    }
  },

  async update(id: string, updates: Partial<DatabaseInventory>) {
    try {
      // Simulate successful update
      return { ...updates, id, updated_at: new Date().toISOString() };
    } catch (error) {
      throw new Error('Failed to update inventory');
    }
  },

  async delete(id: string) {
    try {
      // Simulate successful deletion
      return;
    } catch (error) {
      throw new Error('Failed to delete inventory');
    }
  },

  // Mock real-time subscription
  subscribe(callback: (payload: any) => void) {
    return {
      unsubscribe: () => {}
    };
  }
};

// Analytics operations with enhanced mock data
export const analyticsService = {
  async getKPIs() {
    try {
      const campaigns = mockCampaigns;
      const activeCampaigns = campaigns.filter(c => c.status === 'Active');
      
      return {
        totalSpend: campaigns.reduce((sum, c) => sum + (c.budget || 0), 0),
        totalImpressions: activeCampaigns.reduce((sum, c) => sum + (c.impressions || 0), 0),
        totalClicks: activeCampaigns.reduce((sum, c) => sum + (c.clicks || 0), 0),
        averageROI: activeCampaigns.length > 0 
          ? activeCampaigns.reduce((sum, c) => sum + (c.roi || 0), 0) / activeCampaigns.length 
          : 0
      };
    } catch (error) {
      console.log('Using mock KPI data');
      return {
        totalSpend: 405000,
        totalImpressions: 12380000,
        totalClicks: 102000,
        averageROI: 3.4
      };
    }
  },

  async getPerformanceData() {
    try {
      // Enhanced mock data for better chart visualization
      return mockCampaigns.map(campaign => ({
        name: campaign.name,
        budget: campaign.budget,
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        roi: campaign.roi,
        media_type: campaign.mediaType,
        status: campaign.status,
        created_at: campaign.startDate.toISOString(),
        date: campaign.startDate.toISOString().split('T')[0]
      }));
    } catch (error) {
      console.log('Using mock performance data');
      return mockCampaigns.map(campaign => ({
        name: campaign.name,
        budget: campaign.budget,
        impressions: campaign.impressions,
        clicks: campaign.clicks,
        roi: campaign.roi,
        media_type: campaign.mediaType,
        status: campaign.status,
        created_at: campaign.startDate.toISOString(),
        date: campaign.startDate.toISOString().split('T')[0]
      }));
    }
  },

  async getMediaTypeBreakdown() {
    try {
      const campaigns = mockCampaigns;
      const breakdown = campaigns.reduce((acc: any, campaign) => {
        const mediaType = campaign.mediaType;
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
    } catch (error) {
      console.log('Using mock media type data');
      return [
        { mediaType: 'Digital', budget: 110000, impressions: 3050000, campaigns: 2, averageROI: 3.45 },
        { mediaType: 'TV', budget: 120000, impressions: 3500000, campaigns: 1, averageROI: 4.1 },
        { mediaType: 'Outdoor', budget: 120000, impressions: 3700000, campaigns: 2, averageROI: 2.85 },
        { mediaType: 'Social', budget: 35000, impressions: 980000, campaigns: 1, averageROI: 5.2 },
        { mediaType: 'Radio', budget: 25000, impressions: 750000, campaigns: 1, averageROI: 2.1 },
        { mediaType: 'Print', budget: 40000, impressions: 0, campaigns: 1, averageROI: 0 }
      ];
    }
  }
};
