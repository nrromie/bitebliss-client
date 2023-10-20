import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../Components/ProductCard/ProductCard';

const BrandsProducts = () => {
    const [brandsProducts, setBrandsProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        fetch(`https://brandshop-server-ten.vercel.app/products/${name}`)
            .then(res => res.json())
            .then(data => {
                setBrandsProducts(data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })
    }, [])

    if (loading) {
        return <div className='h-[80vh] flex justify-center items-center bg-white dark:bg-slate-800'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    if (error) {
        return <div>Error loading featured products. Please try again later.</div>;
    }

    return (
        <section className="py-12 bg-white dark:bg-slate-800">
            <div className="container w-10/12 mx-auto">
                <h2 className="text-3xl font-semibold mb-8">Featured Products</h2>
                {brandsProducts.length === 0 ?
                    (
                        <p>No product is available at this moment.</p>
                    )
                    :
                    (<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {brandsProducts.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>)
                }
            </div>
        </section>
    );
};

export default BrandsProducts;