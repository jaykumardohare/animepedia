import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import AnimeGrid from '../components/AnimeGrid';
import CharacterGrid from '../components/CharacterGrid';
import Loader from '../components/Loader';
import { animeService, characterService } from '../services/api'; // ✅ FIXED

const HomePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [animeData, charactersData] = await Promise.all([
          animeService.getAllAnime(),         // ✅ FIXED
          characterService.getAllCharacters() // ✅ FIXED
        ]);

        setAnimeList(animeData);
        setCharacters(charactersData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <Layout>
      <Loader />
    </Layout>
  );

  if (error) return (
    <Layout>
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{error}</p>
        <button 
          className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <section className="mb-12">
        <div className="bg-gradient-to-r from-primary-600 to-indigo-600 text-white rounded-xl p-8 mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to AnimePedia</h1>
          <p className="text-xl mb-6">Your ultimate anime character encyclopedia</p>
          <div className="flex flex-wrap gap-4">
            <Link to="/anime" className="bg-white text-primary-600 px-6 py-2 rounded-md font-semibold hover:bg-gray-100">
              Browse Anime
            </Link>
            <Link to="/characters" className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-md font-semibold hover:bg-white/10">
              Browse Characters
            </Link>
          </div>
        </div>

        <AnimeGrid animeList={animeList} title="Popular Anime" />
        
        <div className="text-center mt-4 mb-12">
          <Link to="/anime" className="text-primary-600 hover:text-primary-700 font-medium">
            View All Anime →
          </Link>
        </div>

        <CharacterGrid characters={characters} title="Featured Characters" />
        
        <div className="text-center mt-4">
          <Link to="/characters" className="text-primary-600 hover:text-primary-700 font-medium">
            View All Characters →
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
