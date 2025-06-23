import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import ProductSection from './components/ProductSection';
import Footer from './components/Footer';
import { products } from './data/products';

function App({ searchQuery }: { searchQuery: string }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const featuredProducts = products.filter(p =>
    p.category.includes('new') || p.category.includes('bestsellers')
  );
  const runningOutProducts = products.filter(p => p.category === 'limited');
  
  return (
    <div className="min-h-screen bg-gray-950">
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          <ProductSection title="Featured Products" products={featuredProducts} />
          <ProductSection title="Running Out" products={runningOutProducts} />
        </div>
      </main>
    </div>
  );
}

export default App;