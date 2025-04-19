// SignInPage.tsx
import React, { useState } from 'react';
import '../../styles/user/SignIn.css';
import axios, { AxiosError } from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Modal from './Modal';
import SignUp from './SignUp';

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUpOpen, setSignUpOpen] = useState(false);

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;

    const handleSignIn = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            if (email.trim().length > 0 && password.trim().length > 0) {
                const response = await axios.post(`${API_URL}/signin`, {
                    email: email,
                    password: password
                });
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate("/home");
            } else {
                setErrorMessage("Preencha os campos!");
                setTimeout(() => setErrorMessage(""), 3000);
            }
        } catch (error) {
            if ((error as AxiosError).response && (error as AxiosError).response?.status === 400 ||
                (error as AxiosError).response && (error as AxiosError).response?.status) {
                setErrorMessage("Email ou senha inválidos");
                setTimeout(() => setErrorMessage(""), 5000);
            } else {
                console.log("Error: " + error);
            }
        }
    };

    return (
        <div className="signInContainer">
            <form className="signInForm" onSubmit={handleSignIn}>
                {errorMessage &&
                    <div className="error-message">
                        {errorMessage}
                    </div>
                }
                <h2>Login</h2>
                <div className="formGroup">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="formGroup">
                    <label>Password:</label>
                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <div className='login-btn'>
                    <button type="submit">Login</button>
                </div>
                <p>Não possui uma conta?{" "} 
                    <Link to="#" onClick={() => setSignUpOpen(true)}>Cadastre-se</Link>
                </p>
            </form>

            <Modal isOpen={isSignUpOpen} onClose={() => setSignUpOpen(false)}>
                <SignUp/>
            </Modal>
        </div>
    );
};

export default SignInPage;
