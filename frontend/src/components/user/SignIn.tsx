// SignInPage.tsx

import React, { useState } from 'react';
import '../../styles/SignIn.css';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                alert("Preencha os campos");
            }
            
        }catch(error){
            if((error as AxiosError).response && (error as AxiosError).response?.status === 404) {
                alert("Email ou senha inválidos");
            }else{
                console.log("Error: " + error);
            }  
        }
    }
        
    return (
        <div className="signInContainer">
        <form className="signInForm">
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
            <button type="submit" onClick={handleSignIn}>login</button>
            <p>Não possui uma conta? <Link to="signUp">Cadastre-se</Link></p>
        </form>
        </div>
    );
};

export default SignInPage;
