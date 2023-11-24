// Navbar.tsx

import { Link } from 'react-router-dom';
import { auth } from "../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import '../App.css';
import logo from '../images/logo3.png'

const Navbar = () => {
    const [user] = useAuthState(auth);

    const signUserOut = async () => {
        await signOut(auth);
    };

    return (
        <div className="navbar">
            <div className="logo-section">
                <img src={logo} alt=''/>
            </div>
            <div className="navbar-links">
                {!user ? (
                    <>
                        <Link to={'/'} className="navbar-link">Home</Link>
                        <Link to={'/login'} className="navbar-link">Login</Link>
                    </>
                ) : (
                    <>
                        <Link to={'/'} className="navbar-link">Home</Link>
                        <Link to={'/createpost'} className="navbar-link">Create Post</Link>
                    </>
                )}
            </div>
            <div className="user-info">
                {user && (
                    <>
                        <p className="user-name">{user?.displayName}</p>
                        <img src={user?.photoURL || ""} alt='' className="user-img" width='30' height='30' />
                        <button onClick={signUserOut} className="logout-button">Logout</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
