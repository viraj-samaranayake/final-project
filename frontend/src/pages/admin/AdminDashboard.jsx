import TopNavBar from './components/TopNavBar';
import StatsCards from './components/StatsCards';
import PlatformMetrics from './components/PlatformMetrics';
import AlertsAndIssues from './components/AlertsAndIssues';
import SystemHealth from './components/SystemHealth';
import RecentUsersTable from './components/RecentUsersTable';
import RecentActivities from './components/RecentActivities';
import QuickActions from './components/QuickActions';
import PageHeader from './components/PageHeader';
import PerformanceMetrics from './components/PerformanceMetrics';
import ChartsSection from './components/ChartsSection';
import RevenueAnalytics from './components/RevenueAnalytics';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative">
      <TopNavBar />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Page Header */}
        <PageHeader />

        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Section */}
        <ChartsSection />

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activities */}
          <div className="lg:col-span-2">
            <RecentActivities />
          </div>
          {/* Quick Actions */}
          <div>
            <QuickActions />
          </div>
        </div>

        {/* Recent Users Table */}
        <div className="mt-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-500">
          <RecentUsersTable />
        </div>

        {/* Performance Metrics */}
        <PerformanceMetrics />

        {/* Revenue Analytics */}
        <RevenueAnalytics />

        {/* System Health & Alerts */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in-50 slide-in-from-bottom-4 duration-1000 delay-900">
          {/* System Health */}
          <SystemHealth />
          {/* Alerts & Issues */}
          <AlertsAndIssues />
        </div>

        {/* Platform Metrics Grid */}
        <PlatformMetrics />
      </div>
    </div>
  );
}
