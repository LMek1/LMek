import { useCart } from '../CartContext';
import { Product } from '../data/products';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [countryCode, setCountryCode] = useState<string | null>(null);

  useEffect(() => {
    const override = localStorage.getItem('devCountryOverride');
    if (override) {
      setCountryCode(override.toUpperCase());
    } else {
      fetch('https://get.geojs.io/v1/ip/country.json')
        .then(res => res.json())
        .then(data => setCountryCode((data.country || 'US').toUpperCase()))
        .catch(() => setCountryCode('US'));
    }
  }, []);

  const isLoading = countryCode === null;
  const isBlocked = countryCode
    ? product.excludedCountries?.includes(countryCode) || false
    : false;

  return (
    <div className="bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images}
          alt={product.name}
          className="w-full h-72 object-cover rounded-t-2xl"
        />
      </Link>

      <div className="p-4 flex flex-col gap-3">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-white font-semibold hover:text-green-400 transition-colors text-lg">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-green-400">
            ${product.price.toFixed(2)}
          </span>

          <button
            type="button"
            disabled={isBlocked || isLoading}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (isBlocked || isLoading || !countryCode) return;

              const extra = product.extraShippingCost?.[countryCode] || 0;
              const adjustedProduct = {
                ...product,
                price: product.price + extra,
              };

              addToCart(adjustedProduct);
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all text-sm font-medium
              ${
                isBlocked || isLoading
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : added
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isBlocked
              ? 'Unavailable'
              : isLoading
              ? 'Checking...'
              : added
              ? 'Added!'
              : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
