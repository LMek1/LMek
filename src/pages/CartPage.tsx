import { useCart } from '../CartContext';
import { Minus, Plus } from 'lucide-react';

const CartPage = () => {
  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:4242/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cartItems: cart }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('No URL returned from server');
      }
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const decreaseQuantity = (id: number) => {
    const item = cart.find(p => p.id === id);
    if (item && item.quantity > 1) {
      removeFromCart(id);
      addToCart({ ...item, quantity: item.quantity - 1 });
    } else {
      removeFromCart(id);
    }
  };

  return (
    <main className="p-6 text-white flex flex-col h-[calc(100vh-96px)]">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-400 mt-10">Your cart is empty.</p>
      ) : (
        <>
          <div className="flex-1 overflow-y-auto border border-gray-800 rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead className="sticky top-0 bg-gray-900 z-10">
                <tr className="border-b border-gray-700 text-gray-400 text-sm uppercase">
                  <th className="p-4">Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="p-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                    </td>
                    <td>{item.name}</td>
                    <td>${item.price.toFixed(2)}</td>
                    <td className="flex items-center gap-2 py-4">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="text-gray-300 hover:text-red-400 p-1"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item)}
                        className="text-gray-300 hover:text-green-400 p-1"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-400 text-sm"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-800 pt-4 mt-6 text-right">
            <p className="text-xl font-bold text-green-400 mb-4">
              Total: ${total.toFixed(2)}
            </p>
            <button
              onClick={handleCheckout}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;
