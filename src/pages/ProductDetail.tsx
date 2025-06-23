import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../CartContext';
import { useState, useEffect } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  isRunningOut?: boolean;
  excludedCountries?: string[];
  extraShippingCost?: Record<string, number>;
}

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);
  const [added, setAdded] = useState(false);
  const [countryCode, setCountryCode] = useState<string>('US');

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

  const getAdjustedPrice = () => {
    const extra = product?.extraShippingCost?.[countryCode] || 0;
    return (product!.price + extra).toFixed(2);
  };

  const { addToCart } = useCart();

  if (!product) {
    return <div className="text-white p-6">Product not found</div>;
  }

  const getDeliveryRange = (minDays: number, maxDays: number) => {
    const now = new Date();
    const end = new Date();
    now.setDate(now.getDate() + minDays);
    end.setDate(end.getDate() + maxDays);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };

    return `${now.toLocaleDateString(undefined, options)} – ${end.toLocaleDateString(undefined, options)}`;
  };

  const isBlocked = product.excludedCountries?.includes(countryCode);

  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="text-white p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Imagen */}
        <div className="md:w-1/2">
          <img
            src={product.images}
            alt={product.name}
            className="w-full max-h-[600px] object-contain rounded-2xl shadow-xl"
          />
        </div>

        {/* Info */}
        <div className="md:w-1/2 flex flex-col justify-start">
          <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
          <p className="text-green-400 text-3xl font-semibold mb-4">
            ${getAdjustedPrice()} USD
          </p>
          <p className="text-gray-400 mb-6 text-lg">
            {product.description || 'This product combines quality, style, and value to meet your needs.'}
          </p>

          <p className="text-gray-400 mb-4">
            Estimated delivery: {getDeliveryRange(7, 14)} 
          </p>
          <p className="text-gray-400 mb-4">
            Shipping cost is already included 
          </p>

          {isBlocked && (
            <p className="text-red-500 font-medium mb-4">
              We do not ship to your country ({countryCode}).
            </p>
          )}

          <button
            disabled={isBlocked}
            onClick={() => {
              addToCart(product);
              setAdded(true);
              setTimeout(() => setAdded(false), 1200);
            }}
            className={`${
              added
                ? 'bg-green-600 hover:bg-green-700'
                : isBlocked
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white px-6 py-3 rounded-xl text-lg font-medium transition-all w-fit`}
          >
            {isBlocked ? 'Unavailable' : added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}
