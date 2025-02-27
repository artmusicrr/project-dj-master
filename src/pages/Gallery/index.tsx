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

    const [images, setImages] = useState<GalleryTypes[]>([]);
    const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);

    const { gallery: galleryRedux } = useSelector(
        (state: RootState) => state.gallery,
    );

    useEffect(() => {
        dispatch(fetchGalleryRequest());
    }, [dispatch]);

    useEffect(() => {
        if (galleryRedux) {
            console.log("galleryRedux ====>", galleryRedux);
            const processedImages = galleryRedux.images.map(image => ({
                ...image,
                image_url: `http://localhost:4000${image}`,
                src: `http://localhost:4000${image}`,
                alt: 'Gallery Image'
            }));
            setImages(processedImages);
        }
    }, [galleryRedux]);

    console.log("images ====>", images);

    return (
        <div className="gallery-container">
            <h1>Nossa Galeria</h1>
            <div className="gallery-grid">
                {images.map((item) => {
                    console.log("Image src:", item.src);
                    return (
                        <div
                            key={item.id}
                            className="gallery-item"
                            onClick={() => setSelectedImage({ url: item.image_url || '', alt: item.alt })}
                        >
                            <img src={item.image_url} alt={item.alt} loading="lazy" />
                        </div>
                    );
                })}
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