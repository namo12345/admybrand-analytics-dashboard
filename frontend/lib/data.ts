// Component Type: AI-generated
// Mock data for campaigns and inventory

import { Campaign, Inventory, MediaType, CampaignStatus, InventoryStatus } from './types';

// Generate mock campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Fashion Campaign',
    mediaType: 'Digital',
    channel: 'Google Ads',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-08-31'),
    status: 'Active',
    budget: 50000,
    impressions: 1250000,
    clicks: 25000,
    reach: 850000,
    roi: 3.2
  },
  {
    id: '2',
    name: 'Billboard Downtown',
    mediaType: 'Outdoor',
    channel: 'Clear Channel',
    startDate: new Date('2024-07-15'),
    endDate: new Date('2024-09-15'),
    status: 'Active',
    budget: 75000,
    impressions: 2100000,
    clicks: 0,
    reach: 1200000,
    roi: 2.8
  },
  {
    id: '3',
    name: 'TV Prime Time Spots',
    mediaType: 'TV',
    channel: 'NBC',
    startDate: new Date('2024-05-01'),
    endDate: new Date('2024-07-31'),
    status: 'Completed',
    budget: 120000,
    impressions: 3500000,
    clicks: 0,
    reach: 2800000,
    roi: 4.1
  },
  {
    id: '4',
    name: 'Social Media Blitz',
    mediaType: 'Social',
    channel: 'Meta Ads',
    startDate: new Date('2024-08-01'),
    endDate: new Date('2024-10-31'),
    status: 'Active',
    budget: 35000,
    impressions: 980000,
    clicks: 45000,
    reach: 650000,
    roi: 5.2
  },
  {
    id: '5',
    name: 'Radio Morning Drive',
    mediaType: 'Radio',
    channel: 'iHeartRadio',
    startDate: new Date('2024-09-01'),
    endDate: new Date('2024-11-30'),
    status: 'Paused',
    budget: 25000,
    impressions: 750000,
    clicks: 0,
    reach: 450000,
    roi: 2.1
  },
  {
    id: '6',
    name: 'Print Magazine Ads',
    mediaType: 'Print',
    channel: 'Vogue',
    startDate: new Date('2024-10-01'),
    endDate: new Date('2024-12-31'),
    status: 'Draft',
    budget: 40000,
    impressions: 0,
    clicks: 0,
    reach: 0,
    roi: 0
  },
  {
    id: '7',
    name: 'Digital Display Network',
    mediaType: 'Digital',
    channel: 'Google Display',
    startDate: new Date('2024-07-01'),
    endDate: new Date('2024-09-30'),
    status: 'Active',
    budget: 60000,
    impressions: 1800000,
    clicks: 32000,
    reach: 950000,
    roi: 3.7
  },
  {
    id: '8',
    name: 'Transit Advertising',
    mediaType: 'Outdoor',
    channel: 'JCDecaux',
    startDate: new Date('2024-06-15'),
    endDate: new Date('2024-08-15'),
    status: 'Completed',
    budget: 45000,
    impressions: 1600000,
    clicks: 0,
    reach: 780000,
    roi: 2.9
  }
];

// Generate mock inventory
export const mockInventory: Inventory[] = [
  {
    id: '1',
    type: 'Billboard',
    location: 'Times Square, NYC',
    mediaOwner: 'Clear Channel',
    size: '14x48 ft',
    availabilityStart: new Date('2024-11-01'),
    availabilityEnd: new Date('2024-12-31'),
    price: 85000,
    status: 'Available'
  },
  {
    id: '2',
    type: 'Digital Display',
    location: 'Los Angeles, CA',
    mediaOwner: 'Lamar Advertising',
    size: '10x20 ft',
    availabilityStart: new Date('2024-10-15'),
    availabilityEnd: new Date('2024-11-30'),
    price: 45000,
    status: 'Booked'
  },
  {
    id: '3',
    type: 'Transit Shelter',
    location: 'Chicago, IL',
    mediaOwner: 'JCDecaux',
    size: '6x4 ft',
    availabilityStart: new Date('2024-11-15'),
    availabilityEnd: new Date('2025-01-15'),
    price: 12000,
    status: 'Available'
  },
  {
    id: '4',
    type: 'TV Commercial Slot',
    location: 'National',
    mediaOwner: 'NBC Universal',
    size: '30 seconds',
    availabilityStart: new Date('2024-12-01'),
    availabilityEnd: new Date('2024-12-31'),
    price: 150000,
    status: 'Pending'
  },
  {
    id: '5',
    type: 'Radio Spot',
    location: 'New York Metro',
    mediaOwner: 'iHeartRadio',
    size: '60 seconds',
    availabilityStart: new Date('2024-10-01'),
    availabilityEnd: new Date('2024-12-31'),
    price: 8000,
    status: 'Available'
  },
  {
    id: '6',
    type: 'Digital Banner',
    location: 'San Francisco, CA',
    mediaOwner: 'Outfront Media',
    size: '12x24 ft',
    availabilityStart: new Date('2024-11-01'),
    availabilityEnd: new Date('2025-02-28'),
    price: 32000,
    status: 'Available'
  },
  {
    id: '7',
    type: 'Mall Kiosk',
    location: 'Miami, FL',
    mediaOwner: 'Simon Property Group',
    size: '8x10 ft',
    availabilityStart: new Date('2024-12-15'),
    availabilityEnd: new Date('2025-03-15'),
    price: 18000,
    status: 'Booked'
  },
  {
    id: '8',
    type: 'Airport Display',
    location: 'LAX Terminal',
    mediaOwner: 'Clear Channel Airports',
    size: '20x10 ft',
    availabilityStart: new Date('2024-11-01'),
    availabilityEnd: new Date('2024-12-31'),
    price: 95000,
    status: 'Available'
  }
];
