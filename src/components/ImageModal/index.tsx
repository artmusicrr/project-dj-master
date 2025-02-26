import React from 'react';
import './styles.css';

interface ImageModalProps {
    isOpen: boolean;
    imageUrl: string;
    altText: string;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, altText, onClose }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    ×
                </button>
                <img src={imageUrl} alt={altText} className="modal-image" />
            </div>
        </div>
    );
};

export default ImageModal;