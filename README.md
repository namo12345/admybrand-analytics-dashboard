# ADmyBRAND Analytics Dashboard

A modern, production-ready analytics dashboard for AI-powered omnichannel ad campaign management and analytics.

## Features

### Core Functionality
- **Campaign Management Table**: Complete campaign overview with sorting, filtering, and pagination
- **Ad Inventory Table**: Inventory management with search and filter capabilities
- **KPI Summary Cards**: Real-time metrics display (Total Spend, Impressions, Conversions, Average ROI)
- **Data Export**: CSV export functionality for campaigns and inventory
- **Custom Filters**: Manual numeric range filters for budget and price filtering

### UI/UX
- Modern SaaS-inspired design (Notion/Linear/Vercel aesthetic)
- Responsive design for all screen sizes
- Accessible components with proper ARIA labels
- Clean typography and consistent spacing
- Soft neutral color palette

### Technical Features
- TypeScript for type safety
- Modular component architecture
- Efficient state management
- Optimized performance with pagination
- Modern React patterns and hooks

## Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite

## Usage Instructions

1. The dashboard loads with mock campaign and inventory data
2. Use the filter controls above each table to filter by various criteria
3. Click column headers to sort data
4. Use pagination controls to navigate through large datasets
5. Export data using the "Export CSV" buttons
6. Use the custom range filters for budget and price filtering

## Development Credits

### AI-Generated Components
- Initial table structure and basic layouts
- Mock data generation
- Basic filtering logic foundation
- Initial styling framework

### Manual/Hybrid Components
- Custom numeric range filter (manual)
- Advanced filtering logic (hybrid)
- CSV export functionality (manual)
- Accessibility improvements (manual)
- Performance optimizations (hybrid)
- Responsive design refinements (manual)

## Component Architecture

```
frontend/
├── App.tsx                 # Main application (hybrid)
├── components/
│   ├── dashboard/
│   │   ├── KPICards.tsx   # Summary metrics (AI-generated)
│   │   ├── CampaignTable.tsx # Campaign management (hybrid)
│   │   └── InventoryTable.tsx # Inventory management (hybrid)
│   ├── ui/               # shadcn/ui components (auto-generated)
│   ├── filters/
│   │   ├── TableFilters.tsx # Filter controls (hybrid)
│   │   └── RangeFilter.tsx  # Custom range filter (manual)
│   └── layout/
│       └── DashboardLayout.tsx # Main layout (AI-generated)
├── lib/
│   ├── data.ts           # Mock data (AI-generated)
│   ├── types.ts          # TypeScript types (manual)
│   └── utils.ts          # Utility functions (hybrid)
└── hooks/
    └── useTableData.ts   # Data management hook (manual)
```

## Key Features Implemented

1. **Sorting**: Click any column header to sort ascending/descending
2. **Multi-level Filtering**: Filter by media type, status, date ranges, etc.
3. **Pagination**: Navigate through large datasets efficiently
4. **Search**: Real-time search across relevant fields
5. **Export**: Download filtered data as CSV
6. **Custom Range Filters**: Manual implementation for budget/price filtering
7. **Responsive Design**: Works on desktop, tablet, and mobile
8. **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Performance Considerations

- Efficient filtering and sorting algorithms
- Pagination to handle large datasets
- Memoized components to prevent unnecessary re-renders
- Optimized state updates
