// Component Type: Manual
// Custom hook for managing table data, filtering, sorting, and pagination

import { useState, useMemo } from 'react';
import { FilterState, SortState, SortDirection } from '../lib/types';

interface UseTableDataProps<T> {
  data: T[];
  initialPageSize?: number;
  filterFunction: (data: T[], filters: FilterState) => T[];
  sortFunction: (data: T[], sortState: SortState) => T[];
}

export function useTableData<T>({
  data,
  initialPageSize = 10,
  filterFunction,
  sortFunction
}: UseTableDataProps<T>) {
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    mediaType: 'All',
    status: 'All',
    dateRange: { start: null, end: null },
    budgetRange: { min: null, max: null },
    priceRange: { min: null, max: null }
  });

  const [sortState, setSortState] = useState<SortState>({
    field: null,
    direction: 'asc'
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Filter and sort data
  const processedData = useMemo(() => {
    const filtered = filterFunction(data, filters);
    return sortFunction(filtered, sortState);
  }, [data, filters, sortState, filterFunction, sortFunction]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return processedData.slice(startIndex, startIndex + pageSize);
  }, [processedData, currentPage, pageSize]);

  const totalPages = Math.ceil(processedData.length / pageSize);

  // Reset page when filters change
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  // Handle sorting
  const handleSort = (field: string) => {
    setSortState(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return {
    // Data
    data: paginatedData,
    totalItems: processedData.length,
    filteredData: processedData,
    
    // State
    filters,
    sortState,
    currentPage,
    pageSize,
    totalPages,
    
    // Actions
    updateFilters,
    setFilters,
    handleSort,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    setPageSize: (size: number) => {
      setPageSize(size);
      setCurrentPage(1);
    }
  };
}
