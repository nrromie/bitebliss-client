
const SpecialOffers = () => {
  const specialOffers = [
    {
      id: 1,
      title: 'Limited Time Offer',
      description: 'Get 20% off on all gourmet chocolates. Indulge in heavenly sweetness!',
    },
    {
      id: 2,
      title: 'Weekend Delights',
      description: 'Buy 2, Get 1 Free on select tea blends. Enjoy a cozy weekend with our finest teas!',
    },
    {
      id: 3,
      title: 'Exclusive Membership',
      description: 'Sign up for our membership and receive a complimentary coffee sampler pack!',
    },
  ];

  return (
    <section className="py-12 bg-orange-500 dark:bg-slate-900">
      <div className="container w-10/12 mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {specialOffers.map(offer => (
            <div key={offer.id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold mb-4">{offer.title}</h3>
              <p className="text-gray-700 dark:text-white">{offer.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;