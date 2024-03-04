import axios, { AxiosError } from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function SignUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const cadastrarUser = async (e: React.FormEvent) => {
        try{
            e.preventDefault();
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            const regexEmail =  /^[a-zA-Z0-9._-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/; 
            const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*]).{6,}$/;
            if(!regexEmail.test(email)){
                alert("Insira um email válido");
            }else if(!regexPassword.test(password)){
                alert("Insira uma senha forte");
            }else if(password !== confirmPassword) {
                alert("O campo senha e o confirmação de senha não correspondem");
            }else{
                await axios.post("http://localhost:4000/signUp", formData, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                alert("Seu cadastro foi realizado com sucesso")
                navigate("/");
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
        <div>
            <div className="signUpContainer">
            <form className="signUpForm">
                <h2>Cadastro</h2>
                <div className="formGroup">
                <label>Nome:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>
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
                <label>Senha:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <div className="formGroup">
                        <label>Confirmar Senha:</label> {/* Novo campo de confirmação de senha */}
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                <button type="submit" onClick={cadastrarUser}>Cadastrar</button>
            </form>
            </div>
        </div>
    )
}

export default SignUp