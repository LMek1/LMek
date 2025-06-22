import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerLinks = [
    { name: '🚯🔇', href: '#'},
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
  ];

  return (
    <footer className="bg-black border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold text-white">LMek</h3>
            <p className="text-gray-400 text-sm mt-1">Premium e-commerce experience 🚀</p>
          </div>
          
          <nav className="flex flex-wrap gap-6">
            {footerLinks.map((link, index) => (
              <Link
                key={index}
                to={link.href}
                className="text-gray-400 hover:text-green-400 transition-colors text-sm font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; 2025 LMek. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;