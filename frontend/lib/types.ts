// Component Type: Manual
// TypeScript type definitions for the dashboard

export type MediaType = 'Outdoor' | 'Digital' | 'TV' | 'Radio' | 'Print' | 'Social';
export type CampaignStatus = 'Active' | 'Paused' | 'Completed' | 'Draft';
export type InventoryStatus = 'Available' | 'Booked' | 'Pending';

export interface Campaign {
  id: string;
  name: string;
  mediaType: MediaType;
  channel: string;
  startDate: Date;
  endDate: Date;
  status: CampaignStatus;
  budget: number;
  impressions: number;
  clicks: number;
  reach: number;
  roi: number;
}

export interface Inventory {
  id: string;
  type: string;
  location: string;
  mediaOwner: string;
  size: string;
  availabilityStart: Date;
  availabilityEnd: Date;
  price: number;
  status: InventoryStatus;
}

export interface KPIData {
  totalSpend: number;
  totalImpressions: number;
  totalConversions: number;
  averageROI: number;
}

export interface FilterState {
  search: string;
  mediaType: MediaType | 'All';
  status: CampaignStatus | InventoryStatus | 'All';
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  budgetRange: {
    min: number | null;
    max: number | null;
  };
  priceRange: {
    min: number | null;
    max: number | null;
  };
}

export type SortDirection = 'asc' | 'desc';

export interface SortState {
  field: string | null;
  direction: SortDirection;
}
