import axios from "axios";
import { useState, useEffect } from "react";
import "../../styles/personalProfile.css";

function PersonalProfile() {
   const [userName, setUserName] = useState("");
   const [userEmail, setUserEmail] = useState("");
    
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

    return (
        <div>
            <h2>Informações pessoais</h2>
            <form>
                <label htmlFor="name">Nome:</label>
                <input type="text" id="name" value={userName} readOnly />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={userEmail} readOnly />

            </form>
        </div>
    );
}

export default PersonalProfile;
