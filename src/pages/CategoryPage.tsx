import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductSection from '../components/ProductSection';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const filtered =
    category === 'all'
      ? products
      : products.filter(p => p.category.includes(category));

  return (
    <div className="flex flex-col min-h-[70vh]">
      <main className="p-6 text-white">
        <h2 className="text-3xl font-bold mb-6 capitalize">{category} Products</h2>
        {filtered.length === 0 ? (
          <p className="text-gray-400">No products found in this category.</p>
        ) : (
          <ProductSection title={category!} products={filtered} />
        )}
      </main>
    </div>
  );
}
