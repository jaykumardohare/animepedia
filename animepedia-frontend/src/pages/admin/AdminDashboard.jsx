// src/pages/admin/AdminDashboard.jsx
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Layout from '../../components/Layout';
import AdminAnimeList from './AdminAnimeList';
import AdminCharacterList from './AdminCharacterList';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('anime');

  return (
    <Layout>
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-600 mb-4">Welcome, {user?.username}!</p>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('anime')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'anime'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Anime Management
            </button>
            <button
              onClick={() => setActiveTab('characters')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'characters'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Character Management
            </button>
          </nav>
        </div>
        
        {activeTab === 'anime' ? (
          <AdminAnimeList />
        ) : (
          <AdminCharacterList />
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;