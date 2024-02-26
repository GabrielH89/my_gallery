import { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/Home.css';
import { Link } from "react-router-dom";

interface Image {
    id_image: number;
    description: string;
    title: string;
    photo: string; // Use photo em vez de imageUrl
}

interface User {
    name: string;
}

function Home() {
    const [images, setImages] = useState<Image[]>([]);
    const [userName, setUserName] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Requisição para obter as imagens
                const imagesResponse = await axios.get<Image[]>("http://localhost:4000/gallery", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setImages(imagesResponse.data);

                // Requisição para obter os detalhes do usuário
                const userResponse = await axios.get<User[]>("http://localhost:4000/user", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (userResponse.data.length > 0) {
                    setUserName(userResponse.data[0].name); // Acessa o campo 'name' do primeiro elemento do array
                } else {
                    console.log("Nenhum usuário encontrado");
                }
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="menu">
                <h1>Welcome, {userName}</h1>
            </div>
            <div className="image-grid">
                {images.map((image: Image, index: number) => (
                    <div className="image-item" key={index}>
                        <h2 className="image-title">{image.title}</h2>
                        <div className="image-container">
                            <img 
                                src={`http://localhost:4000/uploads/${image.photo}`} 
                                alt='image' 
                                className="image-photo"
                            />
                            <div className="image-description">{image.description}</div>
                        </div>
                        <div className="button-container">
                            <Link to={`/updateImage/${image.id_image}`} className="edit-button"><button >Editar</button></Link>
                           
                            <button className="delete-button">Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
