import { createContext, useEffect, useState } from "react";
import { FacebookAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import app from '../firebase/firebase.config';


const auth = getAuth(app);

export const AuthContex = createContext(null);





const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const facebookSignIn = () => {
        const provider = new FacebookAuthProvider();
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const logOut = () => {
        return signOut(auth);
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unSubscribe();
        };
    }, []);



    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        googleSignIn,
        facebookSignIn,
        logOut
    }


    return (
        <AuthContex.Provider value={authInfo}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;