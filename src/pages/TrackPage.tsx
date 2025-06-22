import { useCart } from '../CartContext';

const TrackPage = () => {
  const { cart } = useCart();

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const deliveryDate = (added: string, days: number) => {
    const date = new Date(added);
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    };

  return (
    <main className="p-6 text-white">
      <h2 className="text-3xl font-bold mb-6">Track Your Orders</h2>

      {cart.length === 0 ? (
        <p className="text-gray-400 mt-10">You have no orders to track.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 border border-gray-800 p-4 rounded-lg"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-400">Ordered on: {formatDate(item.addedAt)}</p>
                <p className="text-sm text-green-400 font-medium">
                  Estimated Delivery: {deliveryDate(item.addedAt, item.estimatedDeliveryDays)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default TrackPage;
