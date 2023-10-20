import React, { useState, useEffect, useContext } from 'react';
import { AuthContex } from '../../Providers/AuthProvider';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user, loading } = useContext(AuthContex);
    const [dataLoading, setDataLoading] = useState(true);

    const fetchData = () => {
        const userEmail = user.email;
        fetch(`https://brandshop-server-ten.vercel.app/cart/${userEmail}`)
            .then((response) => response.json())
            .then((data) => {
                setCartItems(data);
                setDataLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching cart items:', error);
                setDataLoading(false);
            });
    }

    useEffect(() => {
        if (loading) {
            return
        }
        else {
            if (user) {
                fetchData();
            } else {
                setDataLoading(false);
            }
        }

    }, [user]);

    if (dataLoading) {
        return <div className='h-[80vh] flex justify-center items-center bg-white dark:bg-slate-800'>
            <span className="loading loading-spinner loading-lg"></span>
        </div>;
    }

    const removeFromCart = (productId) => {
        fetch(` https://brandshop-server-ten.vercel.app/cart/${user.email}/${productId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    fetchData();
                } else {
                    console.error('Failed to remove item from cart');
                }
            })
            .catch((error) => console.error('Error removing item from cart:', error));
    };

    return (
        <div className='bg-white dark:bg-slate-800 py-8'>
            <div className="container mx-auto max-w-lg p-8 border rounded shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Shopping Cart</h2>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <ul className="grid grid-cols-1 gap-4">
                        {cartItems.map((item) => (
                            <li key={item._id} className="flex items-center justify-between p-4 border rounded">
                                <div className="flex items-center">
                                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover mr-4" />
                                    <div>
                                        <h3 className="text-lg font-semibold">{item.name}</h3>
                                        <p className="text-gray-600">{item.type}</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <span className="mr-4">${item.price}</span>
                                    <button
                                        className="text-red-600 hover:underline cursor-pointer"
                                        onClick={() => removeFromCart(item._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Cart;