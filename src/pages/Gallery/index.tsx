import React, { useEffect, useState } from "react";
import "./styles.css";
import ImageModal from "../../components/ImageModal";
import { HomeOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchGalleryRequest } from "../../store/gallery/actions";
import type { GalleryTypes } from "../../store/gallery/types";

const Gallery: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

    const { images: galleryImages } = useSelector(
        (state: RootState) => state.gallery.gallery
    );

    useEffect(() => {
        dispatch(fetchGalleryRequest());
    }, [dispatch]);

    return (
        <div className="gallery-container">
            <h1>Nossa Galeria</h1>
            <div className="gallery-grid">
                {galleryImages && galleryImages.map((imagePath, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        onClick={() => setSelectedImage({ 
                            url: `http://localhost:4000${imagePath}`, 
                            alt: 'Gallery Image' 
                        })}
                    >
                        <img 
                            src={`http://localhost:4000${imagePath}`} 
                            alt="Gallery Image" 
                            loading="lazy" 
                        />
                    </div>
                ))}
            </div>

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