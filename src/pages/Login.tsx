// Login.tsx

import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import '../App.css';
import google from '../images/google2.png'

const Login = () => {
    const navigate = useNavigate();

    const signInWithGoogle = async () => {
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/');
    }

    return (
        <div className="login-container">
            <p className="login-text">Sign In With Google To Continue</p>
            <button onClick={signInWithGoogle} className="login-button">
                <img src={google} alt="" />
                Sign In With Google</button>
        </div>
    );
}

export default Login;
