import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CharacterGrid from '../components/CharacterGrid';
import Loader from '../components/Loader';
import { getAllCharacters } from '../services/api';

const CharacterListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [totalPages, setTotalPages] = useState(1);

  const query = searchParams.get('query') || '';
  const gender = searchParams.get('gender') || '';
  const role = searchParams.get('role') || '';

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const data = await getAllCharacters({ page, limit: 12, query, gender, role });
        setCharacterList(data.characters);
        setTotalPages(data.totalPages);
      } catch (err) {
        setError('Failed to load characters. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [page, query, gender, role]);

  useEffect(() => {
    setSearchParams(prev => {
      if (page !== 1) prev.set('page', page.toString());
      else prev.delete('page');
      return prev;
    });
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Characters</h1>

        <div className="bg-white rounded-lg shadow-md p-4 mb-8">
          <form className="flex flex-col md:flex-row gap-4">
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

            <select
              value={gender}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value) newParams.set('gender', e.target.value);
                else newParams.delete('gender');
                newParams.delete('page');
                setSearchParams(newParams);
              }}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>

            <select
              value={role}
              onChange={(e) => {
                const newParams = new URLSearchParams(searchParams);
                if (e.target.value) newParams.set('role', e.target.value);
                else newParams.delete('role');
                newParams.delete('page');
                setSearchParams(newParams);
              }}
              className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">All Roles</option>
              <option value="main">Main</option>
              <option value="supporting">Supporting</option>
            </select>
          </form>
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : characterList.length === 0 ? (
        <div className="text-center text-gray-500">No characters found.</div>
      ) : (
        <>
          <CharacterGrid characters={characterList} />
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md ${
                page === 1
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Previous
            </button>
            <span className="flex items-center">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md ${
                page === totalPages
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </Layout>
  );
};

export default CharacterListPage;
