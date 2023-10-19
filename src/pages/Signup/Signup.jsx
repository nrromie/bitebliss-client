
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContex } from '../../Providers/AuthProvider';

const Signup = () => {

    const { createUser } = useContext(AuthContex);


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;


        createUser(email, password)
            .then(result => {
                console.log(result.user)
            })
            .catch(error => {
                console.error(error)
            })

        //send data
        fetch('https://brandshop-server-ten.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ email, cart: [] })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    };

    return (
        <div className='bg-white dark:bg-slate-800 py-8'>
            <div className="container mx-auto max-w-md p-8 border rounded shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-white">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 dark:text-white">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="mt-1 p-2 w-full border rounded bg-gray-50 focus:outline-none focus:border-orange-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-4">
                    <p className="text-sm text-gray-600 dark:text-white">
                        Already have an account? <Link to="/login" className="text-orange-500 hover:underline">Log in here</Link>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;