import axios, { AxiosError } from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "../../styles/user/SignUp.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    const handleSignUp = async (e: React.FormEvent) => {
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            const regexEmail =  /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/; 
            const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
            if(!regexEmail.test(email)){
                setErrorMessage("Insira um email válido");
            }else if(!regexPassword.test(password)){
                setErrorMessage("Insira uma senha forte");
            }else if(password !== confirmPassword) {
                setErrorMessage("O campo senha e o confirmação de senha não correspondem");
            }else{
                await axios.post(`${API_URL}/signup`, formData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                alert("Seu cadastro foi realizado com sucesso")
                navigate("/");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            }
        }catch(error) {
            if((error as AxiosError).response && (error as AxiosError).response?.status === 400) {
                alert("Email já existente, tente se cadastrar com outro");
            }else{
                console.log("Error: " + error);
            }
        }
    }

    return (
        <div className="signUpContainer">
        <form className="signUpForm" onSubmit={handleSignUp}>
          {errorMessage && (
            <div
              className="error-message"
              style={{
                backgroundColor: "#B22222",
                color: "white",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                textAlign: "center",
                fontSize: "1.1rem",
              }}
            >
              {errorMessage}
            </div>
          )}
          <h2>Cadastro</h2>
          <div className="formGroup">
            <label>Nome:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={255}
              required
            />
          </div>
          <div className="formGroup">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              maxLength={600}
              required
            />
          </div>
          <div className="formGroup">
            <label>Senha:</label>
            <div className="password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={300}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p>
              A senha deve ter, no mínimo, 6 caracteres, incluindo números, letras
              maiúsculas, minúsculas, minúsculos e não ter espaço em branco
            </p>
          </div>
          <div className="formGroup">
            <label>Confirmar senha:</label>
            <div className="password-input-container">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                maxLength={300}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
  
          <div className="signUp-btn">
            <button type="submit">Cadastrar</button>
          </div>
          <p>
            Já possui uma conta? <Link to="/">Entrar</Link>
          </p>
        </form>
      </div>
    )
}

export default SignUp