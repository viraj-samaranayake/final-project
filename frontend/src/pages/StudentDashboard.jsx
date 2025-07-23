import LogoutButton from '../components/LogoutButton';

export default function StudentDashboard() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Student Dashboard</h2>
      {/* your dashboard content */}
      <LogoutButton />
    </div>
  );
}
