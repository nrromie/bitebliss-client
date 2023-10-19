import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FeaturedBrands = () => {

  const [FeaturedBrands, setFeaturedBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://brandshop-server-ten.vercel.app/brands');
        const data = await response.json();
        setFeaturedBrands(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className='h-[80vh] flex justify-center items-center bg-white dark:bg-slate-800'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  if (error) {
    return <div>Error loading featured products. Please try again later.</div>;
  }

  return (
    <section className="bg-white dark:bg-slate-800 py-16">
      <div className="container mx-auto w-10/12">
        <h2 className="text-3xl font-semibold mb-8">Featured Brands</h2>
        <div className="flex flex-wrap items-center lg:justify-between justify-center gap-3">
          {FeaturedBrands.map((brand) => (
            <Link to={`/brandproducts/${brand.name}`} key={brand._id} className=" dark:hover:border-orange-500 dark:border dark:border-slate-900 dark:text-white dark:bg-slate-900 rounded-lg p-3 shadow-md flex flex-col justify-center items-center w-[204px]">
              <img src={brand.image} alt={brand.name} className="w-32 h-32 mb-4 rounded-lg" />
              <h3 className="text-xl font-semibold mb-2">{brand.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBrands;