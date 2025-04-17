import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/user/personalProfile.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../utils/useUserData";

function PersonalProfile() {
   
    const [isAccountDeleted, setIsAccountDeleted] = useState(false); // Estado para controlar se a conta foi deletada
    const navigate = useNavigate(); 
    const {userName, userEmail} = useUserData();

    const logout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    const deleteAccount = async () => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir sua conta? ");
        if(confirmDelete){
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:4000/user`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setIsAccountDeleted(true); // Define o estado para indicar que a conta foi deletada com sucesso
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    }

    // Verifica se a conta foi deletada com sucesso e redireciona para a rota raiz
    useEffect(() => {
        if (isAccountDeleted) {
            alert("Sua conta foi deletada com sucesso");
            localStorage.removeItem('token'); // Remover o token após a exclusão da conta
            navigate("/"); // Redirecionar para a rota raiz após a exclusão da conta
        }
    }, [isAccountDeleted, navigate]);

    return (
        <div>
            <h2>Informações pessoais</h2>
            <form>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" value={userName} readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={userEmail} readOnly />

                <button onClick={logout} className="btn-logout">Sair da conta</button>
                <button onClick={deleteAccount} className="btn-deletar">Deletar conta</button>
            </form>
        </div>
    );
}

export default PersonalProfile;
