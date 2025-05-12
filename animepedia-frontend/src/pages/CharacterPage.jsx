import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import CharacterGrid from '../components/CharacterGrid';
import Loader from '../components/Loader';
import { characterService } from '../services/api';

const CharactersPage = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);

  // Predefined filter options
  const roleOptions = ['Main', 'Supporting', 'Antagonist', 'Other'];
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Unknown'];

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await characterService.getAllCharacters();
        setCharacters(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch characters');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  // Filter characters based on search, role, and gender
  const filteredCharacters = characters.filter(character => {
    const matchesSearch = 
      character.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (character.japaneseName && 
       character.japaneseName.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesRole = 
      selectedRoles.length === 0 || 
      selectedRoles.includes(character.role);
    
    const matchesGender = 
      selectedGenders.length === 0 || 
      selectedGenders.includes(character.gender);

    return matchesSearch && matchesRole && matchesGender;
  });

  if (loading) return <Layout><Loader /></Layout>;

  if (error) return (
    <Layout>
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Character Catalog</h1>

        {/* Search and Filter Section */}
        <div className="mb-8 grid md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="col-span-1">
            <input 
              type="text" 
              placeholder="Search characters..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <div>
            <select 
              multiple 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedRoles}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedRoles(values);
              }}
              size="4"
            >
              {roleOptions.map(role => (
                <option key={role} value={role}>
                  {role} Characters
                </option>
              ))}
            </select>
          </div>

          {/* Gender Filter */}
          <div>
            <select 
              multiple 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedGenders}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedGenders(values);
              }}
              size="4"
            >
              {genderOptions.map(gender => (
                <option key={gender} value={gender}>
                  {gender}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Characters Grid */}
        {filteredCharacters.length > 0 ? (
          <CharacterGrid characters={filteredCharacters} showAnime={true} />
        ) : (
          <div className="text-center py-12 bg-gray-100 rounded-md">
            <p className="text-gray-600 text-xl">
              No characters found matching your search criteria.
            </p>
          </div>
        )}

        {/* Pagination or Load More (can be implemented later) */}
      </div>
    </Layout>
  );
};

export default CharactersPage;