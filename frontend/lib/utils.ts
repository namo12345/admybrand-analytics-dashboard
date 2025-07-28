// Component Type: Hybrid (AI base + manual optimizations)
// Utility functions for data processing and formatting

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Campaign, Inventory, FilterState, SortState, SortDirection } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Manual: Currency formatting utility
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Manual: Number formatting utility
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

// Manual: Date formatting utility
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// Manual: ROI formatting utility
export function formatROI(roi: number): string {
  return `${roi.toFixed(1)}x`;
}

// Hybrid: Generic sorting function with manual optimizations
export function sortData<T>(
  data: T[],
  sortState: SortState,
  getFieldValue: (item: T, field: string) => any
): T[] {
  if (!sortState.field) return data;

  return [...data].sort((a, b) => {
    const aValue = getFieldValue(a, sortState.field!);
    const bValue = getFieldValue(b, sortState.field!);

    // Handle different data types
    let comparison = 0;
    
    if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }

    return sortState.direction === 'desc' ? -comparison : comparison;
  });
}

// Manual: Campaign filtering logic
export function filterCampaigns(campaigns: Campaign[], filters: FilterState): Campaign[] {
  return campaigns.filter(campaign => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchLower) ||
        campaign.channel.toLowerCase().includes(searchLower) ||
        campaign.mediaType.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Media type filter
    if (filters.mediaType !== 'All' && campaign.mediaType !== filters.mediaType) {
      return false;
    }

    // Status filter
    if (filters.status !== 'All' && campaign.status !== filters.status) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start && campaign.startDate < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end && campaign.endDate > filters.dateRange.end) {
      return false;
    }

    // Budget range filter (manual implementation)
    if (filters.budgetRange.min !== null && campaign.budget < filters.budgetRange.min) {
      return false;
    }
    if (filters.budgetRange.max !== null && campaign.budget > filters.budgetRange.max) {
      return false;
    }

    return true;
  });
}

// Manual: Inventory filtering logic
export function filterInventory(inventory: Inventory[], filters: FilterState): Inventory[] {
  return inventory.filter(item => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        item.type.toLowerCase().includes(searchLower) ||
        item.location.toLowerCase().includes(searchLower) ||
        item.mediaOwner.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filters.status !== 'All' && item.status !== filters.status) {
      return false;
    }

    // Date range filter
    if (filters.dateRange.start && item.availabilityStart < filters.dateRange.start) {
      return false;
    }
    if (filters.dateRange.end && item.availabilityEnd > filters.dateRange.end) {
      return false;
    }

    // Price range filter (manual implementation)
    if (filters.priceRange.min !== null && item.price < filters.priceRange.min) {
      return false;
    }
    if (filters.priceRange.max !== null && item.price > filters.priceRange.max) {
      return false;
    }

    return true;
  });
}

// Manual: CSV export utility
export function exportToCSV<T>(data: T[], filename: string, headers: Record<keyof T, string>): void {
  const csvContent = [
    // Header row
    Object.values(headers).join(','),
    // Data rows
    ...data.map(item => 
      Object.keys(headers).map(key => {
        const value = item[key as keyof T];
        if (value instanceof Date) {
          return `"${formatDate(value)}"`;
        }
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return String(value);
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Manual: Pagination utility
export function paginateData<T>(data: T[], page: number, pageSize: number): T[] {
  const startIndex = (page - 1) * pageSize;
  return data.slice(startIndex, startIndex + pageSize);
}

// Manual: Get total pages for pagination
export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}
