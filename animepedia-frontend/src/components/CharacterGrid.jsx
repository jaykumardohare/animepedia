import CharacterCard from './CharacterCard';

const CharacterGrid = ({ characters, title, showAnime = true }) => {
  return (
    <div className="mb-8">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      
      {characters?.length === 0 ? (
        <p className="text-center py-8 text-gray-600">No characters found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {characters?.map((character) => (
            <CharacterCard 
              key={character._id} 
              character={character} 
              showAnime={showAnime}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterGrid;