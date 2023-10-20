import { useContext, useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AuthContex } from "../../Providers/AuthProvider";
import { FaUserCircle } from 'react-icons/fa';
import { CiLight, CiDark } from 'react-icons/ci'

const Navbar = () => {

    const { user, logOut } = useContext(AuthContex);
    const [isDark, setIsDark] = useState()

    const handleSignOut = () => {
        logOut()
    }

    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
            setIsDark(true)
        } else {
            document.documentElement.classList.remove('dark')
            setIsDark(false)
        }
    }, [])


    const handleTheme = () => {
        if (!isDark) {
            document.documentElement.classList.add('dark')
            setIsDark(true)
        } else {
            document.documentElement.classList.remove('dark')
            setIsDark(false)
        }
    }

    const handleNavLinkClass = ({ isActive, isPending, isTransitioning }) => {
        const shared = "mx-auto lg:mx-4 hover:text-orange-400 dark:hover:text-orange-400";
        if (isPending) {
            return `${shared}`;
        } else if (isActive) {
            return `${shared} text-orange-500 underline`;
        } else if (isTransitioning) {
            return `${shared}`;
        } else {
            return `${shared} text-black dark:text-white`;
        }
    };

    const links = (
        <>
            <li><NavLink to={'/'} className={handleNavLinkClass}>Home</NavLink></li>
            <li><NavLink to={'/addproduct'} className={handleNavLinkClass}>Add Product</NavLink></li>
            <li><NavLink to={'/cart'} className={handleNavLinkClass}>My Cart</NavLink></li>
            <li><button className="btn rounded-full bg-transparent text-3xl" onClick={handleTheme}>{
                isDark ? <CiLight /> : <CiDark />
            }</button></li>
        </>
    );

    return (
        <div className="sticky top-0 z-50 bg-gray-100 text-orange-500 dark:bg-slate-900 dark:text-orange-500">
            <div className="w-10/12 mx-auto navbar p-0">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden pl-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost pl-0 normal-case text-xl">BiteBliss</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu-horizontal items-center px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ?
                            <div className="btn bg-transparent text-orange-500 border-orange-500 hover:border-orange-300">
                                {
                                    user.photoURL ?
                                        <div className="avatar">
                                            <div className="w-6 rounded-full">
                                                <img src={user.photoURL} />
                                            </div>
                                        </div>
                                        :
                                        <FaUserCircle />
                                }
                                <button onClick={handleSignOut}>Sign Out</button>
                            </div>
                            :
                            <Link className="btn text-white bg-orange-500 border-none hover:bg-orange-600" to={'/login'}>Login</Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;