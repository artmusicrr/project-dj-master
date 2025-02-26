import React, { useState } from "react";
import "./styles.css";
import ImageModal from "../../components/ImageModal";
import { HomeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"

const Gallery: React.FC = () => {
    const navigate = useNavigate()
    const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
    const galleryItems = [
        { id: 1, src: "/assets/img/01.jpg", alt: "Evento DJ Master 1" },
        { id: 2, src: "/assets/img/100.jpg", alt: "Evento DJ Master 2" },
        { id: 3, src: "/assets/img/102.jpg", alt: "Evento DJ Master 3" },
        { id: 4, src: "/assets/img/103.jpg", alt: "Evento DJ Master 4" },
        { id: 5, src: "/assets/img/104.jpg", alt: "Evento DJ Master 5" },
        { id: 6, src: "/assets/img/105.jpg", alt: "Evento DJ Master 6" },
        { id: 7, src: "/assets/img/106.jpg", alt: "Evento DJ Master 7" },
        { id: 8, src: "/assets/img/107.jpg", alt: "Evento DJ Master 8" },
    ];

    return (
        <div className="gallery-container">
            <h1>Nossa Galeria</h1>
            <div className="gallery-grid">
                {galleryItems.map((item) => (
                    <div
                        key={item.id}
                        className="gallery-item"
                        onClick={() => setSelectedImage({ url: item.src, alt: item.alt })}
                    >
                        <img src={item.src} alt={item.alt} loading="lazy" />
                    </div>
                ))}
            </div>
            {/* <IconButton
                component="a"
                href="/"
                className="home-button"
                sx={{
                    position: 'fixed',
                    bottom: '2rem',
                    right: '2rem',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    '&:hover': {
                        backgroundColor: '#f0f0f0'
                    }
                }}
            >
                <Home sx={{ fontSize: 32, color: '#333' }} />
            </IconButton> */}

            <div className="home-button">
                <HomeOutlined className="home-icon" onClick={() => navigate("/")} />
            </div>

            <ImageModal
                isOpen={!!selectedImage}
                imageUrl={selectedImage?.url || ''}
                altText={selectedImage?.alt || ''}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
};

export default Gallery;