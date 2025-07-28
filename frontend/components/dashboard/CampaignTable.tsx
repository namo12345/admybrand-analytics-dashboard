// Component Type: Hybrid (AI structure + manual enhancements)
// Campaign management table with sorting, filtering, and pagination

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

export default function CampaignTable() {
  const { toast } = useToast();

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
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {data.length} of {totalItems} campaigns
          </span>
          <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
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
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center space-x-1">
                  <span>Campaign Name</span>
                  {getSortIcon('name')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('mediaType')}
              >
                <div className="flex items-center space-x-1">
                  <span>Media Type</span>
                  {getSortIcon('mediaType')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('channel')}
              >
                <div className="flex items-center space-x-1">
                  <span>Channel</span>
                  {getSortIcon('channel')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('startDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>Start Date</span>
                  {getSortIcon('startDate')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('endDate')}
              >
                <div className="flex items-center space-x-1">
                  <span>End Date</span>
                  {getSortIcon('endDate')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1">
                  <span>Status</span>
                  {getSortIcon('status')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none text-right"
                onClick={() => handleSort('budget')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Budget</span>
                  {getSortIcon('budget')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none text-right"
                onClick={() => handleSort('impressions')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Impressions</span>
                  {getSortIcon('impressions')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none text-right"
                onClick={() => handleSort('clicks')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Clicks</span>
                  {getSortIcon('clicks')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none text-right"
                onClick={() => handleSort('reach')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Reach</span>
                  {getSortIcon('reach')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none text-right"
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
              <TableRow key={campaign.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{campaign.name}</TableCell>
                <TableCell>{campaign.mediaType}</TableCell>
                <TableCell>{campaign.channel}</TableCell>
                <TableCell>{formatDate(campaign.startDate)}</TableCell>
                <TableCell>{formatDate(campaign.endDate)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(campaign.status)}>
                    {campaign.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(campaign.budget)}</TableCell>
                <TableCell className="text-right">{formatNumber(campaign.impressions)}</TableCell>
                <TableCell className="text-right">{formatNumber(campaign.clicks)}</TableCell>
                <TableCell className="text-right">{formatNumber(campaign.reach)}</TableCell>
                <TableCell className="text-right">{formatROI(campaign.roi)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
        <div className="text-sm text-gray-600">
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
