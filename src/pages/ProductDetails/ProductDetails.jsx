import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContex } from '../../Providers/AuthProvider';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetails = () => {
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useContext(AuthContex);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://brandshop-server-ten.vercel.app/details/${id}`);
                const data = await response.json();
                setProduct(data);
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


    const handleAddToCart = async () => {
        try {
            if (!user || !product) {
                console.error('User or product data missing');
                return;
            }

            const email = user.email;
            const productId = product._id;

            const response = await fetch(` https://brandshop-server-ten.vercel.app/users/${email}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            });

            if (response.ok) {
                toast.success('Added to Cart')
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };


    const { image, name, brandName, type, price, shortDescription, rating } = product;

    return (
        <div className="container w-10/12 mx-auto p-8">
            <div className="flex flex-col md:flex-row lg:flex-row lg:h-[450px] gap-8">
                <div className="w-full md:w-1/2 lg:w-1/2 h-full flex justify-center items-center">
                    <img src={image} alt={name} className="w-full h-auto lg:w-[450px] lg:h-full object-cover rounded-lg shadow-lg" />
                </div>
                <div className="w-full md:w-1/2 lg:w-1/2">
                    <h2 className="text-4xl font-semibold mb-4">{name}</h2>
                    <p className="text-gray-600 text-lg mb-4">{brandName}</p>
                    <p className="text-gray-600 text-lg mb-4">{type}</p>
                    <p className="text-green-600 text-xl font-semibold mb-4">${price.toFixed(2)}</p>
                    <p className="text-gray-600 text-lg mb-4">{shortDescription}</p>
                    <p className="text-gray-600 text-lg mb-4">Rating: {rating}</p>
                    <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ProductDetails;