import { Link } from 'react-router-dom';

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition-transform hover:scale-105 hover:shadow-xl">
        <div className="relative pb-[150%]">
          <img 
            src={anime.image} 
            alt={anime.title} 
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{anime.title}</h3>
          <p className="text-sm text-gray-500">{anime.releaseYear}</p>
          
          {anime.genres && anime.genres.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {anime.genres.slice(0, 2).map((genre, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
                  {genre}
                </span>
              ))}
              {anime.genres.length > 2 && (
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
                  +{anime.genres.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;