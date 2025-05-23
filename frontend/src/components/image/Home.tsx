import { useState, useEffect } from "react";
import axios from 'axios';
import '../../styles/image/Home.css';
import { Link } from "react-router-dom";
import { mdiAccount } from "@mdi/js";
import { useUserData } from "../../utils/useUserData";

interface Image {
    id_image: number;
    description: string;
    title: string;
    photo: string; 
}

function Home() {
    const [images, setImages] = useState<Image[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [imageTitle, setImageTitle] = useState("");
    const [imagePhoto, setImagePhoto] = useState<File | string>("");
    const [imageDescription, setImageDescription] = useState("");
    //const [userName, setUserName] = useState("");
    const {userName} = useUserData();
    const API_URL = import.meta.env.VITE_API_URL;

    const openModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');

                // Requisição para obter as imagens
                const imagesResponse = await axios.get<Image[]>(`${API_URL}/gallery`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setImages(imagesResponse.data);
            } catch (error) {
                console.log("Error: " + error);
            }
        };

        fetchData();
    }, []);

    const addData = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            const token = localStorage.getItem('token');
            const formData = new FormData();
            formData.append('title', imageTitle);
            formData.append('photo', imagePhoto);
            formData.append('description', imageDescription);
            
            const response = await axios.post(`${API_URL}/gallery`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Atualize o estado images com a nova imagem
            setImages([...images, response.data]);
            closeModal();
            setImageTitle("");
            setImagePhoto("");
            setImageDescription("");
        } catch (error) {
            console.log("Error: " + error);
        }
    }
    

    const deleteData = async (id_image: number) => {
        try {
            // Mostrar uma janela de confirmação antes de excluir
            const confirmDelete = window.confirm("Tem certeza de que deseja excluir esta imagem?");
            if (confirmDelete) {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/gallery/${id_image}`, {
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

    const deleteAll = async () => {
        try {
            // Mostrar uma janela de confirmação antes de excluir todas as imagens
            const confirmDeleteAll = window.confirm("Tem certeza de que deseja excluir todas as imagens?");
            if (confirmDeleteAll) {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_URL}/gallery`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setImages([]);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    }

    return (
        <div>
             <div className="menu">
                <h1>Bem-vindo(a), {userName}</h1>
                <div className="menu-buttons">
                    <button className="add-button" onClick={openModal}>Adicionar Fotos</button>
                    <button className="delete-all-button" onClick={deleteAll}>Excluir Fotos</button>
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

            {/*Modal para cadastrar imagem*/}
            {modalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Adicionar Imagem</h2>
                        <form onSubmit={addData}>
                            <label htmlFor="title">Título:</label>
                            <input type="text" id="title" value={imageTitle} 
                            onChange={(e) => setImageTitle(e.target.value)} required/>

                            <label htmlFor="photo">Foto:</label>
                            <input 
                            type="file" 
                            id="photo" 
                            onChange={(e) => setImagePhoto(e.target.files ? e.target.files[0] : "")} 
                            required 
                            />

                            <label htmlFor="description">Descrição:</label>
                            <input type="text" id="description" value={imageDescription} 
                            onChange={(e) => setImageDescription(e.target.value)} required/>
                            <button type="submit">Enviar</button>
                        </form>
                    </div>
                </div>
            )}
            <div className="image-grid">
                {images.map((image: Image, index: number) => (
                    <div className="image-item" key={index}>
                        <h2 className="image-title">{image.title}</h2>
                        <div className="image-container">
                            <img 
                                src={`${API_URL}/uploads/${image.photo}`} 
                                alt='image' 
                                className="image-photo"
                                onLoad={() => console.log('Image loaded successfully')}
                            />
                            <div className="image-description">{image.description}</div>
                        </div>
                        <div className="button-container">
                            <Link to={`/updateImage/${image.id_image}`}>
                                <button className="edit-button">Editar</button>
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