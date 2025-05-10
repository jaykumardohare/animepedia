import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-primary-600">Anime<span className="text-secondary-600">pedia</span></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
            <Link to="/anime" className="text-gray-700 hover:text-primary-600 font-medium">Anime</Link>
            <Link to="/characters" className="text-gray-700 hover:text-primary-600 font-medium">Characters</Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="Search characters..."
                className="px-4 py-1 w-64 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-1 rounded-r-md"
              >
                Search
              </button>
            </form>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-3 pb-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-primary-600 font-medium">Home</Link>
            <Link to="/anime" className="block py-2 text-gray-700 hover:text-primary-600 font-medium">Anime</Link>
            <Link to="/characters" className="block py-2 text-gray-700 hover:text-primary-600 font-medium">Characters</Link>
            
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-3 flex">
              <input
                type="text"
                placeholder="Search characters..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-r-md"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;