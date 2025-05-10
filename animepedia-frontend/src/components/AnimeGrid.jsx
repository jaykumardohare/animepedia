import AnimeCard from './AnimeCard';

const AnimeGrid = ({ animeList, title }) => {
  return (
    <div className="mb-8">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      
      {animeList?.length === 0 ? (
        <p className="text-center py-8 text-gray-600">No anime found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {animeList?.map((anime) => (
            <AnimeCard key={anime._id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AnimeGrid;