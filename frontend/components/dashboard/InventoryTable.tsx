// Component Type: Hybrid (AI structure + manual enhancements)
// Inventory management table with sorting, filtering, and pagination

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronUp, ChevronDown, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { mockInventory } from '../../lib/data';
import { Inventory, InventoryStatus } from '../../lib/types';
import { formatCurrency, formatDate, filterInventory, sortData, exportToCSV } from '../../lib/utils';
import { useTableData } from '../../hooks/useTableData';
import TableFilters from '../filters/TableFilters';
import { useToast } from '@/components/ui/use-toast';

export default function InventoryTable() {
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
    data: mockInventory,
    initialPageSize: 10,
    filterFunction: filterInventory,
    sortFunction: (data, sortState) => sortData(data, sortState, (inventory, field) => {
      switch (field) {
        case 'type': return inventory.type;
        case 'location': return inventory.location;
        case 'mediaOwner': return inventory.mediaOwner;
        case 'size': return inventory.size;
        case 'availabilityStart': return inventory.availabilityStart;
        case 'availabilityEnd': return inventory.availabilityEnd;
        case 'price': return inventory.price;
        case 'status': return inventory.status;
        default: return '';
      }
    })
  });

  const getStatusBadgeVariant = (status: InventoryStatus) => {
    switch (status) {
      case 'Available': return 'default';
      case 'Booked': return 'destructive';
      case 'Pending': return 'secondary';
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
        'inventory.csv',
        {
          type: 'Inventory Type',
          location: 'Location/Region',
          mediaOwner: 'Media Owner',
          size: 'Size',
          availabilityStart: 'Availability Start',
          availabilityEnd: 'Availability End',
          price: 'Price',
          status: 'Status'
        }
      );
      toast({
        title: "Export successful",
        description: `Exported ${filteredData.length} inventory items to CSV`,
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
        type="inventory"
      />

      {/* Table Controls */}
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">
            Showing {data.length} of {totalItems} inventory items
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
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center space-x-1">
                  <span>Inventory Type</span>
                  {getSortIcon('type')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center space-x-1">
                  <span>Location/Region</span>
                  {getSortIcon('location')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('mediaOwner')}
              >
                <div className="flex items-center space-x-1">
                  <span>Media Owner</span>
                  {getSortIcon('mediaOwner')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('size')}
              >
                <div className="flex items-center space-x-1">
                  <span>Size</span>
                  {getSortIcon('size')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none"
                onClick={() => handleSort('availabilityStart')}
              >
                <div className="flex items-center space-x-1">
                  <span>Availability Dates</span>
                  {getSortIcon('availabilityStart')}
                </div>
              </TableHead>
              <TableHead 
                className="cursor-pointer hover:bg-gray-50 select-none text-right"
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Price</span>
                  {getSortIcon('price')}
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.type}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.mediaOwner}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{formatDate(item.availabilityStart)}</div>
                    <div className="text-gray-500">to {formatDate(item.availabilityEnd)}</div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                <TableCell>
                  <Badge variant={getStatusBadgeVariant(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
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
