import { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/Home.css';
import { Link } from "react-router-dom";
import { mdiAccount } from "@mdi/js";

interface Image {
    id_image: number;
    description: string;
    title: string;
    photo: string; // Use photo em vez de imageUrl
}


function Home() {
    const [images, setImages] = useState<Image[]>([]);

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
                
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        fetchData();
    }, []);

    const deleteData = async (id_image: number) => {
        try {
            // Mostrar uma janela de confirmação antes de excluir
            const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta imagem?");
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:4000/gallery/${id_image}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setImages(images.filter(image => image.id_image !== id_image));
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    return (
        <div>
             <div className="menu">
                <h1>Bem-vindo(a)</h1>
                <div className="menu-buttons">
                    <button className="add-button">Adicionar Fotos</button>
                    <button className="delete-all-button">Excluir Todas as Fotos</button>
                </div>
                <div className="menu-profile">
                    <Link to="/personalProfile" >        
                    <span className="menu-icon">
                        <svg viewBox="0 0 24 24">
                            <path d={mdiAccount} />
                        </svg>
                    </span>
                    </Link>
                    <span className="menu-description">Seu perfil</span>
                </div>
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
                            <Link to={`/updateImage/${image.id_image}`} className="edit-button">
                                <button >Editar</button>
                            </Link>
                           
                            <button className="delete-button"
                            onClick={() => deleteData(image.id_image)}
                            >Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
