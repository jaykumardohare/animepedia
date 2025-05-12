// src/pages/admin/CharacterForm.jsx
import { useState, useEffect } from 'react';
import { createCharacter, updateCharacter, getAllAnime } from '../../services/api';

const CharacterForm = ({ character = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: character?.name || '',
    japaneseName: character?.japaneseName || '',
    image: character?.image || '',
    description: character?.description || '',
    animeId: character?.animeId || '',
    role: character?.role || 'Main',
    voiceActor: character?.voiceActor || ''
  });
  
  const [animeOptions, setAnimeOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loadingAnime, setLoadingAnime] = useState(true);
  
  const isEditing = !!character;

  useEffect(() => {
    const fetchAnimeOptions = async () => {
      try {
        setLoadingAnime(true);
        const data = await getAllAnime({ limit: 100 });
        setAnimeOptions(data.anime || []);
      } catch (err) {
        console.error('Error fetching anime options:', err);
      } finally {
        setLoadingAnime(false);
      }
    };
    
    fetchAnimeOptions();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    if (apiError) {
      setApiError('');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.image.trim()) {
      errors.image = 'Image URL is required';
    }
    
    if (!formData.animeId) {
      errors.animeId = 'Please select an anime';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsSubmitting(true);
        setApiError('');
        
        if (isEditing) {
          await updateCharacter(character._id, formData);
        } else {
          await createCharacter(formData);
        }
        
        onSubmit();
      } catch (err) {
        console.error('Error submitting character:', err);
        setApiError(err.message || 'Failed to save character. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const characterRoles = ['Main', 'Supporting', 'Antagonist', 'Side'];

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        {isEditing ? 'Edit Character' : 'Add New Character'}
      </h2>
      
      {apiError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {apiError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                formErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
            )}
          </div>
          
          {/* Japanese Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Japanese Name
            </label>
            <input
              type="text"
              name="japaneseName"
              value={formData.japaneseName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          
          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                formErrors.image ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="https://example.com/image.jpg"
            />
            {formErrors.image && (
              <p className="mt-1 text-sm text-red-500">{formErrors.image}</p>
            )}
          </div>
          
          {/* Anime */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Anime <span className="text-red-500">*</span>
            </label>
            <select
              name="animeId"
              value={formData.animeId}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                formErrors.animeId ? 'border-red-500' : 'border-gray-300'
              }`}
              disabled={loadingAnime}
            >
              <option value="">Select an anime</option>
              {animeOptions.map(anime => (
                <option key={anime._id} value={anime._id}>
                  {anime.title}
                </option>
              ))}
            </select>
            {formErrors.animeId && (
              <p className="mt-1 text-sm text-red-500">{formErrors.animeId}</p>
            )}
            {loadingAnime && (
              <p className="mt-1 text-sm text-gray-500">Loading anime options...</p>
            )}
          </div>
          
          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {characterRoles.map(role => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          
          {/* Voice Actor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Voice Actor
            </label>
            <input
              type="text"
              name="voiceActor"
              value={formData.voiceActor}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Japanese Voice Actor"
            />
          </div>
          
          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="5"
              className="w-full p-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>
        </div>
        
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-400"
          >
            {isSubmitting
              ? 'Saving...'
              : isEditing
                ? 'Update Character'
                : 'Create Character'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CharacterForm;