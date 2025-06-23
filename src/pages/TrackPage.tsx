import { useCart } from '../CartContext';
import { useEffect } from 'react';

const TrackPage = () => {
  const { orders, setOrders } = useCart();

  useEffect(() => {
    const now = new Date();
    const stillInTransit = orders.filter((item) => {
      const deliveryDate = new Date(item.addedAt);
      deliveryDate.setDate(deliveryDate.getDate() + item.estimatedDeliveryDays);
      return deliveryDate > now;
    });

    if (stillInTransit.length !== orders.length) {
      localStorage.setItem('orders', JSON.stringify(stillInTransit));
      setOrders(stillInTransit);
    }
  }, [orders]);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

  // ✅ NUEVO: calcular rango de entrega
  const getDeliveryRange = (addedAt: string, minDays: number, maxDays: number) => {
    const start = new Date(addedAt);
    const end = new Date(addedAt);
    start.setDate(start.getDate() + minDays);
    end.setDate(end.getDate() + maxDays);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };

    return `${start.toLocaleDateString(undefined, options)} – ${end.toLocaleDateString(undefined, options)}`;
  };

  return (
    <main className="flex flex-col flex-1 p-6 text-white min-h-[70vh]">
      <h2 className="text-3xl font-bold mb-6">Track Your Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-400 mt-10">You have no orders to track.</p>
      ) : (
        <div>
          <div className="space-y-6">
            {orders.map((item) => (
              <div
                key={`${item.id}-${item.addedAt}`}
                className="flex items-center gap-6 border border-gray-800 p-4 rounded-lg"
              >
                <img
                  src={item.image || item.images}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm text-green-400 font-medium">
                    Ordered on: {formatDate(item.addedAt)}
                  </p>
                  <p className="text-sm text-gray-400">
                    Estimated delivery: {getDeliveryRange(item.addedAt, 7, 14)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default TrackPage;
