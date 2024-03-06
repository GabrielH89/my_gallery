import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/personalProfile.css";
import { useNavigate } from "react-router-dom";

function PersonalProfile() {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get("http://localhost:4000/user", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const user = response.data;
                console.log(user);
                setUserName(user.name || "");
                setUserEmail(user.email || ""); // Definindo o email do usuário no estado
               
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        fetchData();
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    return (
        <div>
            <h2>Informações pessoais</h2>
            <form>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" value={userName} readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={userEmail} readOnly />

                <button onClick={logout}>Sair da conta</button>
            </form>
        </div>
    );
}

export default PersonalProfile;
