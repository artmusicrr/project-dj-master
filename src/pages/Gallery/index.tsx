import React, { useEffect, useState } from "react";
import "./styles.css";
import ImageModal from "../../components/ImageModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { fetchGalleryRequest } from "../../store/gallery/actions";
import { HeaderPages } from "../../components/headerPages";

const API_BASE_URL = process.env.REACT_APP_API_PROD
console.log("API_BASE_URL === galery-PAGE:", API_BASE_URL)

const Gallery: React.FC = () => {
    const dispatch = useDispatch();
    const [selectedImage, setSelectedImage] = useState<{ url: string; alt: string } | null>(null);
    const themeMode = useSelector((state: any) => state.theme.mode);

    const { images: galleryImages } = useSelector(
        (state: RootState) => state.gallery.gallery
    );

    useEffect(() => {
        dispatch(fetchGalleryRequest());
    }, [dispatch]);

    return (
        <div className="gallery-container" data-theme={themeMode}>
            <HeaderPages title="Galeria" />
            <div className="gallery-grid">
                {galleryImages && galleryImages.map((imagePath, index) => (
                    <div
                        key={index}
                        className="gallery-item"
                        onClick={() => setSelectedImage({ 
                            url: `${API_BASE_URL}${imagePath}`, 
                            alt: 'Gallery Image' 
                        })}
                    >
                        <img 
                            src={`${API_BASE_URL}${imagePath}`} 
                            alt="Gallery Image" 
                            loading="lazy" 
                        />
                    </div>
                ))}
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