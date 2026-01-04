import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Layout } from '../components';
import { Users, FileText, Activity } from 'lucide-react';
import axios from 'axios';

interface DashboardStats {
  totalUsers: number;
  analysesPerformed: number;
  activeToday: number;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
      return;
    }

    const fetchStats = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/admin/stats', {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, navigate]);

  if (!stats && loading) {
    return (
        <Layout>
            <div className="flex justify-center p-20">Loading dashboard...</div>
        </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-slate-400">Platform overview and statistics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {/* Stat Card 1 */}
           <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
                <Users className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Total Users</p>
                <p className="text-3xl font-bold">{stats?.totalUsers || 0}</p>
              </div>
           </div>

           {/* Stat Card 2 */}
           <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Resumes Analyzed</p>
                <p className="text-3xl font-bold">{stats?.analysesPerformed || 0}</p>
              </div>
           </div>

           {/* Stat Card 3 */}
           <div className="glass-card p-6 rounded-2xl flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl text-green-400">
                 <Activity className="w-8 h-8" />
              </div>
              <div>
                <p className="text-slate-400 text-sm">Active Today</p>
                 <p className="text-3xl font-bold">{stats?.activeToday || 0}</p>
              </div>
           </div>
        </div>
        
        {/* Placeholder for future detailed charts */}
        <div className="glass-card p-8 rounded-2xl text-center text-slate-400">
            More detailed analytics coming soon.
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
