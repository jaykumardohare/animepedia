import { Link } from 'react-router-dom';

const CharacterCard = ({ character, showAnime = true }) => {
  return (
    <Link to={`/characters/${character._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transform transition-transform hover:scale-105 hover:shadow-xl">
        <div className="relative pb-[150%]">
          <img 
            src={character.image} 
            alt={character.name} 
            className="absolute top-0 left-0 w-full h-full object-cover"
            loading="lazy"
          />
          {character.role && (
            <div className={`
              absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold
              ${character.role === 'Main' ? 'bg-secondary-500 text-white' : 
                character.role === 'Antagonist' ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'}
            `}>
              {character.role}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-800 truncate">{character.name}</h3>
          
          {showAnime && character.anime && (
            <div className="mt-1 flex items-center">
              {character.anime.image && (
                <img 
                  src={character.anime.image} 
                  alt={character.anime.title} 
                  className="w-6 h-6 rounded-full object-cover mr-2" 
                />
              )}
              <p className="text-sm text-gray-600 truncate">
                {character.anime.title}
              </p>
            </div>
          )}
          
          {character.abilities && character.abilities.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {character.abilities.slice(0, 1).map((ability, idx) => (
                <span key={idx} className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full truncate max-w-full">
                  {ability}
                </span>
              ))}
              {character.abilities.length > 1 && (
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded-full">
                  +{character.abilities.length - 1}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;