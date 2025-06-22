import React from 'react';
import ProductCard from './ProductCard';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  isRunningOut?: boolean;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-8 flex items-center">
        {title}
        {title === 'Running Out' && (
          <span className="ml-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
            Limited Stock
          </span>
        )}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductSection;