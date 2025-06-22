import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  isRunningOut?: boolean;
}


export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id.toString() === id);

  if (!product) {
    return <div className="text-white p-6">Product not found</div>;
  }

  const { addToCart } = useCart();

  return (
    <div className="flex flex-col min-h-[70vh]">
      <div className="text-white p-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Imagen grande */}
        <div className="md:w-1/2">
          <img
            src={product.images}
            alt={product.name}
            className="w-full max-h-[600px] object-contain rounded-2xl shadow-xl"
          />
        </div>

        {/* Info a la derecha */}
        <div className="md:w-1/2 flex flex-col justify-start">
          <h1 className="text-4xl font-extrabold mb-4">{product.name}</h1>
          <p className="text-green-400 text-3xl font-semibold mb-4">${product.price}</p>
          <p className="text-gray-400 mb-6 text-lg">
            {product.description || 'This product combines quality, style, and value to meet your needs.'}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition-all w-fit"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}