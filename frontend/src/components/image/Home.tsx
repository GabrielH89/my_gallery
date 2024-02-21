import { useState, useEffect } from "react";
import axios from 'axios';

interface Image {
    description: string;
    title: string;
    photo: string; // Use photo em vez de imageUrl
}

function Home() {
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        const getImages = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get<Image[]>("http://localhost:4000/gallery", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setImages(response.data);
                console.log("Images: ", response.data);
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        getImages();
    }, []);

    return (
        <div>
            {images.map((image: Image, index: number) => (
                <div key={index}>
                    <h2>{image.title}</h2>
                    <img src={`http://localhost:4000/uploads/${image.photo}`} alt='image' />
                    <p>{image.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Home;
