// SignInPage.tsx

import React, { useState } from 'react';
import '../../styles/SignIn.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignInPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSignIn = async (e: { preventDefault: () => void; }) => {
        try{
            e.preventDefault();
            const response = await axios.post("http://localhost:4000/signIn", {
                email: email,
                password: password
            })
            console.log("Reponse ", response.data);
            const token = response.data.token; // Supondo que o token esteja na resposta como 'token'
            localStorage.setItem('token', token);
            navigate("/home");
        }catch(error){
            console.log("Error: " + error);
        }
    }
        
    return (
        <div className="signInContainer">
        <form className="signInForm">
            <h2>Sign In</h2>
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
        </form>
        </div>
    );
};

export default SignInPage;
