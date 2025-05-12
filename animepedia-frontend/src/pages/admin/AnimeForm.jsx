import { useState } from 'react';
import { createAnime, updateAnime } from '../../services/api';

const AnimeForm = ({ anime = null, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: anime?.title || '',
    originalTitle: anime?.originalTitle || '',
    image: anime?.image || '',
    synopsis: anime?.synopsis || '',
    type: anime?.type || 'TV',
    episodes: anime?.episodes || '',
    status: anime?.status || 'Ongoing',
    aired: anime?.aired || '',
    genres: anime?.genres?.join(', ') || ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  
  const isEditing = !!anime;

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
    
    if (!formData.title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (!formData.image.trim()) {
      errors.image = 'Image URL is required';
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
        
        // Process genres from comma-separated string to array
        const processedData = {
          ...formData,
          genres: formData.genres.split(',').map(genre => genre.trim()).filter(Boolean)
        };
        
        if (isEditing) {
          await updateAnime(anime._id, processedData);
        } else {
          await createAnime(processedData);
        }
        
        onSubmit();
      } catch (err) {
        console.error('Error submitting anime:', err);
        setApiError(err.message || 'Failed to save anime. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const animeTypes = ['TV', 'Movie', 'OVA', 'ONA', 'Special'];
  const animeStatuses = ['Ongoing', 'Completed', 'Not Yet Aired', 'Cancelled'];

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">
        {isEditing ? 'Edit Anime' : 'Add New Anime'}
      </h2>
      
      {apiError && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
          {apiError}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${
                formErrors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors.title && (
              <p className="mt-1 text-sm text-red-500">{formErrors.title}</p>
            )}
          </div>
          
          {/* Original Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Original Title
            </label>
            <input
              type="text"
              name="originalTitle"
              value={formData.originalTitle}
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
          
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {animeTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          {/* Episodes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Episodes
            </label>
            <input
              type="number"
              name="episodes"
              value={formData.episodes}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              min="0"
            />
          </div>
          
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {animeStatuses.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          
          {/* Aired */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aired Date
            </label>
            <input
              type="text"
              name="aired"
              value={formData.aired}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Apr 2023 to Present"
            />
          </div>
          
          {/* Genres */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genres (comma separated)
            </label>
            <input
              type="text"
              name="genres"
              value={formData.genres}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Action, Adventure, Fantasy"
            />
          </div>
          
          {/* Synopsis */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Synopsis
            </label>
            <textarea
              name="synopsis"
              value={formData.synopsis}
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
                ? 'Update Anime'
                : 'Create Anime'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AnimeForm;