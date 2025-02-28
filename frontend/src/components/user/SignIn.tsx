// SignInPage.tsx

import React, { useState } from 'react';
import '../../styles/SignIn.css';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    
    const handleSignIn = async (e: { preventDefault: () => void; }) => {
        try{
            e.preventDefault();
                if(email.trim().length > 0 && password.trim().length > 0){
                    const response = await axios.post("http://localhost:4000/signIn", {
                    email: email,
                    password: password
                })
                console.log("Reponse ", response.data);
                const token = response.data.token; // Supondo que o token esteja na resposta como 'token'
                localStorage.setItem('token', token);
                navigate("/home");
            }else{
                setErrorMessage("Preencha os campos!");
                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
            }
            
        }catch(error){
            if((error as AxiosError).response && (error as AxiosError).response?.status === 400 || 
            (error as AxiosError).response && (error as AxiosError).response?.status) {
                setErrorMessage("Email ou senha inválidos");
                setTimeout(() => {
                    setErrorMessage("");
                }, 5000);
            }else{
                console.log("Error: " + error);
            }  
        }
    }
        
    return (
        <div className="signInContainer">
        <form className="signInForm" onSubmit={handleSignIn}>
            {errorMessage && 
                <div className="error-message" style={{ backgroundColor: '#B22222', color: 'white', 
                padding: '10px', marginBottom: '10px', borderRadius: '5px', textAlign: 'center', fontSize: '1.1rem' }}>
            {errorMessage}</div>}
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
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>
            <div className='login-btn'>
                <button type="submit" onClick={handleSignIn}>Login</button>
            </div>
            <p>Não possui uma conta? <Link to="signUp">Cadastre-se</Link></p>
        </form>
        </div>
    );
};

export default SignInPage;
