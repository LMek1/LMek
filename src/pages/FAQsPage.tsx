const FAQsPage = () => {
  return (
    <div className="flex flex-col min-h-[70vh]">
        <main className="p-6 text-white max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">FAQs</h1>

        <div className="mb-4">
            <h2 className="text-xl font-semibold text-green-400">When will my order arrive?</h2>
            <p className="text-gray-300">Most orders arrive within 7–14 business days depending on your location.</p>
        </div>

        <div className="mb-4">
            <h2 className="text-xl font-semibold text-green-400">Can I return a product?</h2>
            <p className="text-gray-300">We currently do not accept returns unless the item is damaged or incorrect.</p>
        </div>

        <div className="mb-4">
            <h2 className="text-xl font-semibold text-green-400">Do you ship internationally?</h2>
            <p className="text-gray-300">Yes! We ship to most countries including the US, UK, EU, and Latin America.</p>
        </div>
        </main>
    </div>
  );
};

export default FAQsPage;
