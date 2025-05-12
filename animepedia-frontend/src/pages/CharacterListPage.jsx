import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import CharacterGrid from '../components/CharacterGrid';
import Loader from '../components/Loader';
import { getAllCharacters } from '../services/api';

const CharacterListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get('query') || '';
  const animeId = searchParams.get('anime') || '';

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await getAllCharacters({ page, limit: 12, query, animeId });
        setCharacters(data.characters);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to load characters. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, query, animeId]);

  useEffect(() => {
    setSearchParams(prev => {
      if (page !== 1) prev.set('page', page.toString());
      else prev.delete('page');
      return prev;
    });
  }, [page, setSearchParams]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Anime Characters</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search characters..."
                value={query}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) newParams.set('query', e.target.value);
                  else newParams.delete('query');
                  newParams.delete('page');
                  setSearchParams(newParams);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            className="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {characters.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No characters found matching your criteria.</p>
            </div>
          ) : (
            <>
              <CharacterGrid characters={characters} />
              
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className={`px-4 py-2 rounded-md ${
                      page === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    Previous
                  </button>
                  <div className="flex items-center px-4">
                    <span>
                      Page {page} of {totalPages}
                    </span>
                  </div>
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className={`px-4 py-2 rounded-md ${
                      page === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary-600 text-white hover:bg-primary-700'
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default CharacterListPage;