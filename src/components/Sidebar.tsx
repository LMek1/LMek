import React from 'react';
import { ShoppingCart, User, Package } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { Home, Menu, Search } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { cart } = useCart();
  const [animateCart, setAnimateCart] = useState(false);

  const categories = [
    { label: 'All Products', slug: 'all' },
    { label: 'New Arrivals', slug: 'new' },
    { label: 'Best Sellers', slug: 'bestsellers' },
    { label: 'Accessories', slug: 'accessories' }
  ];

  useEffect(() => {
    if (cart.length === 0) return;
    setAnimateCart(true);
    const timeout = setTimeout(() => setAnimateCart(false), 500);
    return () => clearTimeout(timeout);
  }, [cart]);
  return (
    <aside className={`fixed left-0 top-0 h-full bg-black border-r border-gray-800 transition-transform duration-300 z-40 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 w-64`}>
      <div className="p-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-white text-2xl font-bold mb-6 hover:text-green-400 transition-all duration-200 hover:scale-105"
          style={{ paddingLeft: '12px', paddingTop: '12px' }}
        >
          <Home className="w-6 h-6" />
          LMek
        </Link>
        <nav className="space-y-4">
          <Link to="/cart" className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors p-3 rounded-lg hover:bg-gray-900">
            <ShoppingCart className={`w-5 h-5 transition-transform ${animateCart ? 'animate-bounce' : ''}`} />
            <span>Cart</span>
          </Link>

          
          <Link to="/track" className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors p-3 rounded-lg hover:bg-gray-900">
            <Package className="w-5 h-5" />
            <span>Track Order</span>
          </Link>
        </nav>

        <div className="mt-8">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Categories</h3>
          <nav className="space-y-2">
            {categories.map((cat, index) => (
              <Link
                key={index}
                to={`/category/${cat.slug}`}
                className="block text-gray-300 hover:text-white hover:bg-gray-900 transition-colors p-2 rounded-lg text-sm"
              >
                {cat.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;