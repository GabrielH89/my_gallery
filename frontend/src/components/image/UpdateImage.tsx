import axios from 'axios';
import { useState, useEffect, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/UpdateImage.css';

function UpdateImage() {
  const [imageTitle, setImageTitle] = useState("");
  const [imagePhoto, setImagePhoto] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const { id_image } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:4000/gallery/${id_image}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const image = response.data;
        setImageTitle(image.title || "");
        setImageDescription(image.description || "");
        setImagePhoto(image.photo || "");
        setPreview(`http://localhost:4000/uploads/${image.photo}`);
        console.log(image)
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    fetchImage();
  }, [id_image]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Verifica se files não é null antes de acessá-lo
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement; // Convertendo o alvo do evento para HTMLTextAreaElement
    if (target.value.length >= 255 && e.key !== 'Backspace') {
      e.preventDefault();
    }
  };
  
  const updateImage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(imageTitle.trim().length > 0 && imageDescription.trim().length > 0) {
        const formData = new FormData();
        formData.append("title", imageTitle);
        if(selectedFile !== null){ 
          formData.append("photo", selectedFile);
        }else{
          formData.append("photo", imagePhoto);
        }
        formData.append("description", imageDescription);
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:4000/gallery/${id_image}`, formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        });
        navigate("/home");
      }else{
        alert("Preencha todos os campos");
      }
       // Navegar de volta para a página inicial após a atualização
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <div>
      <div className='form-update'>
      <h1>Edit Image</h1>
      <form onSubmit={updateImage}>
        <div className='field'>
          <label className="label">Title</label>
          <div className='control'>
            <input className="input" type="text" value={imageTitle} 
            onChange={(e) => setImageTitle(e.target.value)} />
          </div>
        </div>
        <div className='field'>
          <label className="label">Description</label>
          <div className='control'>
            <textarea 
              className="textarea" 
              value={imageDescription} 
              onChange={(e) => setImageDescription(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className='field'>
          <label className="label">Image</label>
          <div className='control'>
            <div className='file'>
              <label className="file-label">
                <input type='file' className='file-input' onChange={handleFileChange} />
                <span className='file-cta'>
                  <span className='file-label'>Choose an image</span>
                </span>
              </label>
            </div>
          </div>
        </div>
        {preview && (
          <figure className='image is-128x128'>
            <img src={preview} alt='Preview Image' className='image-loaded'/>
          </figure>
        )}
        <div className='field'>
          <div className='control'>
            <button type='submit' className='button is-primary'>Update</button>
          </div>
        </div>
      </form>
      </div>
     
    </div>
  );
}

export default UpdateImage;
