// Component Type: Hybrid (AI structure + manual enhancements)
// Campaign management table with sorting, filtering, and pagination - Fixed dark theme

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronUp, ChevronDown, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockCampaigns } from '../../lib/data';
import { Campaign, CampaignStatus } from '../../lib/types';
import { formatCurrency, formatNumber, formatDate, formatROI, filterCampaigns, sortData, exportToCSV } from '../../lib/utils';
import { useTableData } from '../../hooks/useTableData';
import TableFilters from '../filters/TableFilters';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '../providers/ThemeProvider';

export default function CampaignTable() {
  const { toast } = useToast();
  const { isDark } = useTheme();

  const {
    data,
    totalItems,
    filteredData,
    filters,
    sortState,
    currentPage,
    pageSize,
    totalPages,
    updateFilters,
    handleSort,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setPageSize
  } = useTableData({
    data: mockCampaigns,
    initialPageSize: 10,
    filterFunction: filterCampaigns,
    sortFunction: (data, sortState) => sortData(data, sortState, (campaign, field) => {
      switch (field) {
        case 'name': return campaign.name;
        case 'mediaType': return campaign.mediaType;
        case 'channel': return campaign.channel;
        case 'startDate': return campaign.startDate;
        case 'endDate': return campaign.endDate;
        case 'status': return campaign.status;
        case 'budget': return campaign.budget;
        case 'impressions': return campaign.impressions;
        case 'clicks': return campaign.clicks;
        case 'reach': return campaign.reach;
        case 'roi': return campaign.roi;
        default: return '';
      }
    })
  });

  const getStatusBadgeVariant = (status: CampaignStatus) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Paused': return 'secondary';
      case 'Completed': return 'outline';
      case 'Draft': return 'destructive';
      default: return 'secondary';
    }
  };

  const getSortIcon = (field: string) => {
    if (sortState.field !== field) return null;
    return sortState.direction === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const handleExport = () => {
    try {
      exportToCSV(
        filteredData,
        'campaigns.csv',
        {
          name: 'Campaign Name',
          mediaType: 'Media Type',
          channel: 'Channel',
          startDate: 'Start Date',
          endDate: 'End Date',
          status: 'Status',
          budget: 'Budget',
          impressions: 'Impressions',
          clicks: 'Clicks',
          reach: 'Reach',
          roi: 'ROI'
        }
      );
      toast({
        title: "Export successful",
        description: `Exported ${filteredData.length} campaigns to CSV`,
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <TableFilters
        filters={filters}
        onFiltersChange={updateFilters}
        type="campaign"
      />

      {/* Table Controls */}
      <div className={`flex justify-between items-center px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {data.length} of {totalItems} campaigns
          </span>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className={`w-20 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : ''}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent className={isDark ? 'bg-gray-700 border-gray-600' : ''}>
              <SelectItem value="5" className={isDark ? 'text-white hover:bg-gray-600' : ''}>5</SelectItem>
              <SelectItem value="10" className={isDark ? 'text-white hover:bg-gray-600' : ''}>10</SelectItem>
              <SelectItem value="25" className={isDark ? 'text-white hover:bg-gray-600' : ''}>25</SelectItem>
              <SelectItem value="50" className={isDark ? 'text-white hover:bg-gray-600' : ''}>50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className={isDark ? 'border-gray-700' : ''}>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Campaign Name</span>
                  {getSortIcon('name')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('mediaType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Media Type</span>
                  {getSortIcon('mediaType')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('channel')}
              >
                <div className="flex items-center space-x-1">
                  <span>Channel</span>
                  {getSortIcon('channel')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('startDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Start Date</span>
                  {getSortIcon('startDate')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('endDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>End Date</span>
                  {getSortIcon('endDate')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none text-right ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('budget')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Budget</span>
                  {getSortIcon('budget')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none text-right ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Impressions</span>
                  {getSortIcon('impressions')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none text-right ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Clicks</span>
                  {getSortIcon('clicks')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none text-right ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('reach')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Reach</span>
                  {getSortIcon('reach')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none text-right ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('roi')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>ROI</span>
                  {getSortIcon('roi')}
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((campaign) => (
              <TableRow key={campaign.id} className={`${isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                <TableCell className={`font-medium ${isDark ? 'text-white' : ''}`}>{campaign.name}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>{campaign.mediaType}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>{campaign.channel}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>{formatDate(campaign.startDate)}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>{formatDate(campaign.endDate)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell className={`text-right ${isDark ? 'text-gray-300' : ''}`}>{formatCurrency(campaign.budget)}</TableCell>
                <TableCell className={`text-right ${isDark ? 'text-gray-300' : ''}`}>{formatNumber(campaign.impressions)}</TableCell>
                <TableCell className={`text-right ${isDark ? 'text-gray-300' : ''}`}>{formatNumber(campaign.clicks)}</TableCell>
                <TableCell className={`text-right ${isDark ? 'text-gray-300' : ''}`}>{formatNumber(campaign.reach)}</TableCell>
                <TableCell className={`text-right ${isDark ? 'text-gray-300' : ''}`}>{formatROI(campaign.roi)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className={`flex items-center justify-between px-6 py-4 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
