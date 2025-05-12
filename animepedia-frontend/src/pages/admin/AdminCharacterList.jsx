import { useState, useEffect } from 'react';
import { getAllCharacters, deleteCharacter } from '../../services/api';
import Loader from '../../components/Loader';
import CharacterForm from './CharacterForm';

const AdminCharacterList = () => {
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCharacterList();
  }, []);

  const fetchCharacterList = async () => {
    try {
      setLoading(true);
      const data = await getAllCharacters({ limit: 100 });
      setCharacterList(data.characters);
    } catch (err) {
      setError('Failed to load characters. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (character) => {
    setEditingCharacter(character);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
      try {
        setIsDeleting(true);
        await deleteCharacter(id);
        setCharacterList(characterList.filter(character => character._id !== id));
      } catch (err) {
        setError('Failed to delete character. Please try again.');
        console.error(err);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleFormSubmit = () => {
    setShowForm(false);
    setEditingCharacter(null);
    fetchCharacterList();
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCharacter(null);
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          onClick={fetchCharacterList}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (showForm) {
    return <CharacterForm character={editingCharacter} onSubmit={handleFormSubmit} onCancel={handleFormCancel} />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Character List</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
        >
          Add New Character
        </button>
      </div>

      {characterList.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No characters found. Add your first character!</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Image</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Name</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Anime</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Role</th>
                <th className="py-3 px-4 text-left font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {characterList.map((character) => (
                <tr key={character._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    {character.image && (
                      <img 
                        src={character.image} 
                        alt={character.name} 
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    )}
                  </td>
                  <td className="py-3 px-4 font-medium">{character.name}</td>
                  <td className="py-3 px-4">{character.animeTitle || 'N/A'}</td>
                  <td className="py-3 px-4">{character.role || 'N/A'}</td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(character)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(character._id)}
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

export default AdminCharacterList;