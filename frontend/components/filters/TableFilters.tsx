// Component Type: Hybrid (AI structure + manual enhancements)
// Comprehensive filter controls for tables - Fixed dark theme visibility

import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter, X } from 'lucide-react';
import { FilterState, MediaType, CampaignStatus, InventoryStatus } from '../../lib/types';
import RangeFilter from './RangeFilter';
import { formatCurrency } from '../../lib/utils';
import { useTheme } from '../providers/ThemeProvider';

interface TableFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  type: 'campaign' | 'inventory';
}

export default function TableFilters({ filters, onFiltersChange, type }: TableFiltersProps) {
  const { isDark } = useTheme();
  const mediaTypes: (MediaType | 'All')[] = ['All', 'Digital', 'Outdoor', 'TV', 'Radio', 'Print', 'Social'];
  
  const campaignStatuses: (CampaignStatus | 'All')[] = ['All', 'Active', 'Paused', 'Completed', 'Draft'];
  const inventoryStatuses: (InventoryStatus | 'All')[] = ['All', 'Available', 'Booked', 'Pending'];

  const hasActiveFilters = 
    filters.search ||
    filters.mediaType !== 'All' ||
    filters.status !== 'All' ||
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.budgetRange.min !== null ||
    filters.budgetRange.max !== null ||
    filters.priceRange.min !== null ||
    filters.priceRange.max !== null;

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      mediaType: 'All',
      status: 'All',
      dateRange: { start: null, end: null },
      budgetRange: { min: null, max: null },
      priceRange: { min: null, max: null }
    });
  };

  return (
    <div className={`border-b p-4 space-y-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
      {/* Search and Quick Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-400'}`} />
          <Input
            placeholder={`Search ${type === 'campaign' ? 'campaigns' : 'inventory'}...`}
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className={`pl-10 ${isDark ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : ''}`}
          />
        </div>

        {type === 'campaign' && (
          <Select
            value={filters.mediaType}
            onValueChange={(value) => onFiltersChange({ mediaType: value as MediaType | 'All' })}
          >
            <SelectTrigger className={`w-full sm:w-48 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}>
              <SelectValue placeholder="Media Type" />
            </SelectTrigger>
            <SelectContent className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
              {mediaTypes.map((type) => (
                <SelectItem key={type} value={type} className={isDark ? 'text-white hover:bg-gray-600' : ''}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        <Select
          value={filters.status}
          onValueChange={(value) => onFiltersChange({ status: value as CampaignStatus | InventoryStatus | 'All' })}
        >
          <SelectTrigger className={`w-full sm:w-48 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
            {(type === 'campaign' ? campaignStatuses : inventoryStatuses).map((status) => (
              <SelectItem key={status} value={status} className={isDark ? 'text-white hover:bg-gray-600' : ''}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={clearAllFilters}
            className="flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Clear</span>
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Date Range Filter */}
        <div className="space-y-2">
          <label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Date Range</label>
          <div className="flex space-x-2">
            <Input
              type="date"
              value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
              onChange={(e) => onFiltersChange({
                dateRange: {
                  ...filters.dateRange,
                  start: e.target.value ? new Date(e.target.value) : null
                }
              })}
              className={`text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
            />
            <Input
              type="date"
              value={filters.dateRange.end?.toISOString().split('T')[0] || ''}
              onChange={(e) => onFiltersChange({
                dateRange: {
                  ...filters.dateRange,
                  end: e.target.value ? new Date(e.target.value) : null
                }
              })}
              className={`text-sm ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}
            />
          </div>
        </div>

        {/* Budget Range Filter (Campaigns only) */}
        {type === 'campaign' && (
          <RangeFilter
            label="Budget Range"
            min={filters.budgetRange.min}
            max={filters.budgetRange.max}
            onRangeChange={(min, max) => onFiltersChange({ budgetRange: { min, max } })}
            placeholder={{ min: 'Min budget', max: 'Max budget' }}
            formatValue={formatCurrency}
          />
        )}

        {/* Price Range Filter (Inventory only) */}
        {type === 'inventory' && (
          <RangeFilter
            label="Price Range"
            min={filters.priceRange.min}
            max={filters.priceRange.max}
            onRangeChange={(min, max) => onFiltersChange({ priceRange: { min, max } })}
            placeholder={{ min: 'Min price', max: 'Max price' }}
            formatValue={formatCurrency}
          />
        )}
      </div>

      {/* Filter Summary */}
      {hasActiveFilters && (
        <div className={`flex items-center space-x-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          <Filter className="w-4 h-4" />
          <span>Active filters applied</span>
        </div>
      )}
    </div>
  );
}
