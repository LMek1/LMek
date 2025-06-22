import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductSection from '../components/ProductSection';

export default function SearchResultsPage() {
  const [params] = useSearchParams();
  const query = params.get('q')?.toLowerCase() || '';

  const exactMatches = products.filter(p =>
    p.name.toLowerCase() === query || p.id.toString() === query
  );

  const partialMatches = products.filter(p =>
    (p.name.toLowerCase().includes(query) || p.id.toString().includes(query)) &&
    !exactMatches.includes(p)
  );

  return (
    <main className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">
        Search Results for: <span className="text-green-400">{query}</span>
      </h2>

      {exactMatches.length > 0 && (
        <ProductSection title="Exact Matches" products={exactMatches} />
      )}

      {partialMatches.length > 0 && (
        <ProductSection title="Related Results" products={partialMatches} />
      )}

      {exactMatches.length === 0 && partialMatches.length === 0 && (
        <p className="text-gray-400">No products found for this search.</p>
      )}
    </main>
  );
}
