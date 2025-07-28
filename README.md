# ADmyBRAND Real-time Analytics Dashboard

A modern, production-ready real-time analytics dashboard for AI-powered omnichannel ad campaign management with interactive charts, dark theme support, and Supabase integration.

## 🚀 New Features

### Real-time Analytics
- **Interactive Charts**: Performance trends, media type breakdown, and ROI analysis
- **Live Data Updates**: Real-time synchronization with Supabase every 30 seconds
- **Dynamic KPIs**: Auto-updating metrics with trend indicators
- **Export Functionality**: Download analytics data as CSV

### Enhanced UI/UX
- **Dark Theme Support**: Complete dark mode with system preference detection
- **Responsive Charts**: Interactive charts that adapt to theme changes
- **Improved Quick Actions**: Better styling with proper text wrapping and hover effects
- **Real-time Status**: Live indicators showing data freshness

### Backend Integration
- **Supabase Integration**: Complete CRUD operations with real-time subscriptions
- **Data Persistence**: All campaign and inventory data stored in Supabase
- **Real-time Sync**: Automatic updates across all connected clients
- **Error Handling**: Graceful fallbacks and user feedback

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4 with dark mode support
- **Charts**: Recharts for interactive data visualization
- **Database**: Supabase (PostgreSQL) with real-time subscriptions
- **UI Components**: shadcn/ui with theme support
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📊 Analytics Features

### Interactive Charts
1. **Performance Chart**: Line chart showing budget, impressions, and ROI trends
2. **Media Type Chart**: Pie chart breaking down budget allocation by media type
3. **ROI Analysis**: Bar chart ranking campaigns by return on investment

### Real-time KPIs
- Total Spend with month-over-month comparison
- Total Impressions with trend indicators
- Total Clicks with performance metrics
- Average ROI with benchmark comparisons

### Data Export
- CSV export for all analytics data
- Formatted reports with proper headers
- Real-time data snapshots

## 🎨 Theme System

### Dark Mode Support
- System preference detection
- Manual theme switching (light/dark/system)
- Persistent theme storage
- Chart color adaptation
- Complete UI consistency

### Theme Features
- Automatic system theme detection
- Smooth transitions between themes
- Accessible color contrasts
- Chart legend and tooltip theming

## 🔄 Real-time Features

### Live Data Updates
- Automatic refresh every 30 seconds
- Real-time Supabase subscriptions
- Live status indicators
- Instant data synchronization

### Real-time Subscriptions
- Campaign changes broadcast instantly
- Inventory updates in real-time
- Multi-user collaboration support
- Conflict resolution

## 🗄️ Database Schema

### Campaigns Table
```sql
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  media_type TEXT NOT NULL,
  channel TEXT,
  start_date DATE,
  end_date DATE,
  status TEXT DEFAULT 'Draft',
  budget INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  reach INTEGER DEFAULT 0,
  roi DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Inventory Table
```sql
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL,
  location TEXT NOT NULL,
  media_owner TEXT,
  size TEXT,
  availability_start DATE,
  availability_end DATE,
  price INTEGER DEFAULT 0,
  status TEXT DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🚀 Setup Instructions

### 1. Supabase Configuration
1. Create a new Supabase project
2. Run the database schema (see Database Schema section)
3. Enable real-time for both tables
4. Copy your project URL and anon key

### 2. Environment Setup
Update `frontend/lib/supabase.ts` with your Supabase credentials:
```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 3. Install Dependencies
```bash
npm install @supabase/supabase-js recharts
```

## 📱 Usage Guide

### Analytics Dashboard
1. **View Real-time Analytics**: Navigate to Analytics tab for live charts
2. **Interactive Charts**: Hover over data points for detailed tooltips
3. **Theme Switching**: Use system preferences or manual toggle
4. **Export Data**: Click Export button for CSV download
5. **Auto-refresh**: Data updates automatically every 30 seconds

### Campaign Management
1. **Create Campaigns**: Use "New Campaign" quick action
2. **Real-time Updates**: Changes sync instantly across all users
3. **Data Persistence**: All data stored securely in Supabase
4. **Import Data**: Bulk upload via CSV import

### Quick Actions
- **New Campaign**: Opens enhanced campaign creation modal
- **Import Data**: Bulk data upload with validation
- **Generate Report**: Export current analytics data
- **Optimize Campaigns**: AI assistant for optimization tips
- **View Analytics**: Navigate directly to analytics dashboard
- **Settings**: Theme and preference management

## 🎯 Key Improvements

### Performance
- Efficient chart rendering with Recharts
- Optimized real-time subscriptions
- Memoized components for better performance
- Lazy loading for heavy components

### User Experience
- Smooth theme transitions
- Responsive design for all screen sizes
- Intuitive navigation between views
- Clear loading states and error handling

### Data Management
- Real-time synchronization
- Conflict resolution
- Data validation
- Graceful error handling

## 🔧 Development Credits

### Manual Implementation
- **Real-time Analytics System** (manual): Complete analytics dashboard with interactive charts
- **Supabase Integration** (manual): Full CRUD operations with real-time subscriptions
- **Dark Theme System** (manual): Complete theme management with system detection
- **Interactive Charts** (manual): Recharts integration with theme support
- **Enhanced Quick Actions** (manual): Improved styling and functionality
- **Data Export System** (manual): CSV export with proper formatting

### Enhanced Features
- **Theme Provider** (manual): Context-based theme management
- **Chart Components** (manual): Reusable chart components with theme support
- **Real-time Subscriptions** (manual): Live data synchronization
- **Analytics Service** (manual): Comprehensive analytics data processing
- **Error Handling** (manual): Graceful error states and user feedback

## 🚀 Production Ready

The dashboard is now production-ready with:
- Real-time data synchronization
- Interactive analytics with charts
- Complete dark theme support
- Supabase backend integration
- Responsive design for all devices
- Error handling and loading states
- Data export capabilities
- Multi-user real-time collaboration

## 📈 Analytics Capabilities

- **Performance Tracking**: Monitor campaign metrics in real-time
- **Media Type Analysis**: Understand budget allocation effectiveness
- **ROI Optimization**: Identify top-performing campaigns
- **Trend Analysis**: Track performance over time
- **Export & Reporting**: Generate comprehensive reports
- **Real-time Insights**: Live data updates for immediate decision making
