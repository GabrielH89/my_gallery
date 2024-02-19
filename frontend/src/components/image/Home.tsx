import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getImages = async () => {
            try {
                const token = localStorage.getItem('token'); // Recuperando o token do localStorage
                const response = await axios.get("http://localhost:4000/gallery", {
                    headers: {
                        'Authorization': `Bearer ${token}` // Incluindo o token no cabeçalho de autorização
                    }
                });
                setImages(response.data);
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        getImages();
    }, []);

    return (
        <div>Home</div>
    );
}

export default Home;
