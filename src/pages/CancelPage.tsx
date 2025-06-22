import { XCircle, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <main className="flex flex-col items-center justify-center h-[80vh] text-white text-center px-4">
      <XCircle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
      <p className="text-gray-400 mb-6">
        Your payment was not completed. You can return to your cart and try again.
      </p>

      <Link
        to="/cart"
        className="mt-4 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-base font-medium transition-all"
      >
        <ShoppingCart className="w-5 h-5" />
        Back to Cart
      </Link>
    </main>
  );
};

export default CancelPage;
