import { useEffect } from 'react';
import { useCart } from '../CartContext';
import { CheckCircle, Home } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const SuccessPage = () => {
  const { clearCart, cart, addOrder } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    if (!sessionId) return; // ⚠️ Evita guardar si no viene de Stripe

    addOrder(cart);
    clearCart();

    // Redirigir después de 5s
    const timeout = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timeout);
  }, [location.search, cart, addOrder, clearCart, navigate]);

  return (
    <main className="flex flex-col items-center justify-center h-[80vh] text-white text-center px-4">
      <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Thank you for your purchase!</h1>
      <p className="text-gray-400 mb-6">Your order has been received and is being processed.</p>
      <p className="text-sm text-gray-600">You will be redirected to the homepage shortly...</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 text-green-400 hover:underline text-base"
      >
        <Home className="w-5 h-5" />
        Return to Homepage
      </Link>
    </main>
  );
};

export default SuccessPage;
