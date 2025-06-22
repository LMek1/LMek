import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../CartContext'; // Asegúrate de la ruta correcta

interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  isRunningOut?: boolean;
}

interface ProductCardProps {
  product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [added, setAdded] = React.useState(false);
  const { addToCart } = useCart();  
  return (
    <Link to={`/product/${product.id}`} className="block">
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden group hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1">
        <div className="relative overflow-hidden">
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.isRunningOut && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Running Out
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="text-white font-semibold mb-2 group-hover:text-green-400 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-green-400">
              ${product.price}
            </span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                  setAdded(true);
                  setTimeout(() => setAdded(false), 1200); // vuelve al normal en 1.2s
                }}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  added
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}

              >
                <ShoppingCart className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {added ? 'Added!' : 'Add to Cart'}
                </span>
              </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;