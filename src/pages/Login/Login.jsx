import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContex } from '../../Providers/AuthProvider';
import { FcGoogle } from 'react-icons/fc'
import { FaFacebook } from 'react-icons/fa'

const Login = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { signInUser, googleSignIn, facebookSignIn } = useContext(AuthContex);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signInUser(email, password)
      .then(result => {
        navigate(location?.state ? location.state : '/')
      })
      .catch(error => {
        console.error(error);
      })
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(result => {
        const email = result.user.email;

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

        navigate(location?.state ? location.state : '/')
      })
      .catch(error => {
        console.error(error);
      })
  }

  const handleFbSignIn = () => {
    facebookSignIn()
      .then(result => {
        console.log(result.user)

        navigate(location?.state ? location.state : '/')
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <div className='bg-white dark:bg-slate-800 py-8'>
      <div className="container mx-auto max-w-md p-8 border rounded shadow-lg">
        <h2 className="text-2xl font-semibold mb-6">Log In</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border bg-gray-50 rounded focus:outline-none focus:border-orange-500"
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
              className="mt-1 p-2 w-full border bg-gray-50 rounded focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 focus:outline-none focus:ring focus:border-orange-300"
          >
            Log In
          </button>
        </form>
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-white">
            Don't have an account? <Link to="/signup" className="text-orange-500 hover:underline">Sign up here</Link>
          </p>
        </div>
        <div className='flex justify-center items-center gap-4 py-2'>
          <button onClick={handleGoogleSignIn} className='bg-white rounded-full text-3xl'><FcGoogle /></button>
          <button onClick={handleFbSignIn} className='text-3xl'><FaFacebook /></button>
        </div>
      </div>
    </div>
  );
};

export default Login;