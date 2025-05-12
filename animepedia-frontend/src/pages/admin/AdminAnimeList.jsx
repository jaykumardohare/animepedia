import { useState, useEffect } from 'react';
import { getAllAnime, deleteAnime } from '../../services/api';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import AnimeForm from './AnimeForm';

const AdminAnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAnime, setEditingAnime] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchAnimeList();
  }, []);

  const fetchAnimeList = async () => {
    try {
      setLoading(true);
      const data = await getAllAnime({ limit: 100 });
      setAnimeList(data.anime);
    } catch (err) {
      setError('Failed to load anime. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (anime) => {
    setEditingAnime(anime);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this anime? This action cannot be undone.')) {
      try {
        setIsDeleting(true);
        await deleteAnime(id);
        setAnimeList(animeList.filter(anime => anime._id !== id));
      } catch (err) {
        setError('Failed to delete anime. Please try again.');
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingAnime(null);
    fetchAnimeList();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingAnime(null);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          onClick={fetchAnimeList}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (showForm) {
    return <AnimeForm anime={editingAnime} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Anime List</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Add New Anime
        </button>
      </div>

      {animeList.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No anime found. Add your first anime!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Image</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Title</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Type</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Status</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {animeList.map((anime) => (
                <tr key={anime._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {anime.image && (
                      <img 
                        src={anime.image} 
                        alt={anime.title} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium">{anime.title}</td>
                  <td className="py-3 px-4">{anime.type || 'N/A'}</td>
                  <td className="py-3 px-4">{anime.status || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(anime)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(anime._id)}
                        disabled={isDeleting}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAnimeList;