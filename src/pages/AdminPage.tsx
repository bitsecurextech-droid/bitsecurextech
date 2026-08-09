// This is just the entry point that imports the modular Admin Dashboard
import AdminDashboard from './admin';

export function AdminPage() {
  return <AdminDashboard />;
}

// Export it as default for consistent lazy loading
export default AdminPage;