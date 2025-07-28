// Component Type: Hybrid (AI structure + manual enhancements)
// Inventory management table with sorting, filtering, and pagination

import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronUp, ChevronDown, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Inventory, InventoryStatus } from '../../lib/types';
import { formatCurrency, formatDate, filterInventory, sortData, exportToCSV } from '../../lib/utils';
import { useTableData } from '../../hooks/useTableData';
import TableFilters from '../filters/TableFilters';
import { useToast } from '@/components/ui/use-toast';
import { useTheme } from '../providers/ThemeProvider';

interface InventoryTableProps {
  data: Inventory[];
  onDataChange: () => void;
}

export default function InventoryTable({ data: inventoryData, onDataChange }: InventoryTableProps) {
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
    data: inventoryData || [],
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
      <div className={`flex justify-between items-center px-6 py-4 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Showing {data.length} of {totalItems} inventory items
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
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center space-x-1">
                  <span>Inventory Type</span>
                  {getSortIcon('type')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('location')}
              >
                <div className="flex items-center space-x-1">
                  <span>Location/Region</span>
                  {getSortIcon('location')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('mediaOwner')}
              >
                <div className="flex items-center space-x-1">
                  <span>Media Owner</span>
                  {getSortIcon('mediaOwner')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('size')}
              >
                <div className="flex items-center space-x-1">
                  <span>Size</span>
                  {getSortIcon('size')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('availabilityStart')}
              >
                <div className="flex items-center space-x-1">
                  <span>Availability Dates</span>
                  {getSortIcon('availabilityStart')}
                </div>
              </TableHead>
              <TableHead 
                className={`cursor-pointer select-none text-right ${isDark ? 'text-gray-300 hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                onClick={() => handleSort('price')}
              >
                <div className="flex items-center justify-end space-x-1">
                  <span>Price</span>
                  {getSortIcon('price')}
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className={`${isDark ? 'border-gray-700 hover:bg-gray-700/50' : 'hover:bg-gray-50'}`}>
                <TableCell className={`font-medium ${isDark ? 'text-white' : ''}`}>{item.type}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>{item.location}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>{item.mediaOwner}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>{item.size}</TableCell>
                <TableCell className={isDark ? 'text-gray-300' : ''}>
                  <div className="text-sm">
                    <div>{formatDate(item.availabilityStart)}</div>
                    <div className={isDark ? 'text-gray-400' : 'text-gray-500'}>to {formatDate(item.availabilityEnd)}</div>
                  </div>
                </TableCell>
                <TableCell className={`text-right ${isDark ? 'text-gray-300' : ''}`}>{formatCurrency(item.price)}</TableCell>
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
