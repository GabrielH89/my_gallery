import axios from "axios";
import { useState, useEffect } from "react";

export interface UserData {
    name: string;
    email: string;
}

export const useUserData = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get<UserData>("http://localhost:4000/user", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                const { name, email } = response.data;
                setUserName(name);
                setUserEmail(email);
            } catch (error) {
                console.log("Error: ", error);
            }
        };
        fetchData();
    }, []);

    return { userName, userEmail };
};
