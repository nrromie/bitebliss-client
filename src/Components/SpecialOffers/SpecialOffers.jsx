import { useEffect, useState } from "react";

const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://brandshop-server-ten.vercel.app/offers')
      .then(res => res.json())
      .then(data => {
        setOffers(data);
        setLoading(false)
      })
      .catch(error => {
        setError(error)
        setLoading(false)
      })
  }, []);

  if (loading) {
    return <div className='h-[80vh] flex justify-center items-center bg-white dark:bg-slate-800'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  if (error) {
    return <div>Error loading. Please try again later.</div>;
  }


  return (
    <section className="py-12 bg-orange-500 dark:bg-slate-900">
      <div className="container w-10/12 mx-auto">
        <h2 className="text-3xl font-semibold mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {offers.map(offer => (
            <div key={offer._id} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-lg">
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