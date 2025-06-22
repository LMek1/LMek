import React from 'react';
import { Search, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const [input, setInput] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      navigate(`/search?q=${encodeURIComponent(input.trim())}`);
    }
  };

  const phrases = [
  'Find what moves you.',
  'Style meets simplicity.',
  'Shop smarter, live better.',
  'Quality you can trust.',
  'Just the right price.'
  ];

  const randomPhrase = React.useMemo(() => {
    const index = Math.floor(Math.random() * phrases.length);
    return phrases[index];
  }, []);

  return (
  <header className="bg-gray-950 border-b border-gray-800 p-4">
    <div className="flex items-center justify-between">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-white hover:text-green-400 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>
      <form onSubmit={handleSubmit} className="flex-1 max-w-2xl mx-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-gray-950 border border-gray-800 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
          />
        </div>
      </form>
        <div className="hidden md:block text-gray-300 text-xl font-semibold ml-4 whitespace-nowrap">
          {randomPhrase}
        </div>  
    </div>
  </header>
)};

export default TopBar;
