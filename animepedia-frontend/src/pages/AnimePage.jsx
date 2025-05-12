import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import AnimeGrid from '../components/AnimeGrid';
import Loader from '../components/Loader';
import { animeService } from '../services/api';

const AnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);

  // List of possible genres
  const allGenres = [
    'Action', 'Adventure', 'Comedy', 'Drama', 
    'Fantasy', 'Horror', 'Magical Girl', 
    'Mecha', 'Music', 'Mystery', 
    'Psychological', 'Romance', 'Sci-Fi', 
    'Slice of Life', 'Sports', 'Supernatural'
  ];

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const data = await animeService.getAllAnime();
        setAnimeList(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch anime');
        setLoading(false);
      }
    };

    fetchAnime();
  }, []);

  // Filter anime based on search and genre
  const filteredAnime = animeList.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenres = selectedGenres.length === 0 || 
      selectedGenres.some(genre => anime.genres?.includes(genre));
    return matchesSearch && matchesGenres;
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
        <h1 className="text-3xl font-bold mb-6">Anime Catalog</h1>

        {/* Search and Filter Section */}
        <div className="mb-8 grid md:grid-cols-3 gap-4">
          {/* Search Input */}
          <div className="col-span-2">
            <input 
              type="text" 
              placeholder="Search anime..." 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Genre Filter Dropdown */}
          <div>
            <select 
              multiple 
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={selectedGenres}
              onChange={(e) => {
                const values = Array.from(e.target.selectedOptions, option => option.value);
                setSelectedGenres(values);
              }}
              size="5"
            >
              {allGenres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Anime Grid */}
        {filteredAnime.length > 0 ? (
          <AnimeGrid animeList={filteredAnime} />
        ) : (
          <div className="text-center py-12 bg-gray-100 rounded-md">
            <p className="text-gray-600 text-xl">
              No anime found matching your search criteria.
            </p>
          </div>
        )}

        {/* Pagination or Load More (can be implemented later) */}
      </div>
    </Layout>
  );
};

export default AnimePage;