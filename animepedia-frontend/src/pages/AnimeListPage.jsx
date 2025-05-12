import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import AnimeGrid from '../components/AnimeGrid';
import Loader from '../components/Loader';
import { getAllAnime } from '../services/api';

const AnimeListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get('query') || '';
  const genre = searchParams.get('genre') || '';

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        setLoading(true);
        const data = await getAllAnime({ page, limit: 12, query, genre });
        setAnimeList(data.anime);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to load anime. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [page, query, genre]);

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
        <h1 className="text-3xl font-bold mb-6">Anime Database</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <input
                type="text"
                placeholder="Search anime..."
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
            <div className="w-full md:w-64">
              <select
                value={genre}
                onChange={(e) => {
                  const newParams = new URLSearchParams(searchParams);
                  if (e.target.value) newParams.set('genre', e.target.value);
                  else newParams.delete('genre');
                  newParams.delete('page');
                  setSearchParams(newParams);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">All Genres</option>
                <option value="action">Action</option>
                <option value="adventure">Adventure</option>
                <option value="comedy">Comedy</option>
                <option value="drama">Drama</option>
                <option value="fantasy">Fantasy</option>
                <option value="sci-fi">Sci-Fi</option>
                <option value="slice-of-life">Slice of Life</option>
              </select>
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
          {animeList.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No anime found matching your criteria.</p>
            </div>
          ) : (
            <>
              <AnimeGrid animeList={animeList} />
              
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

export default AnimeListPage;
