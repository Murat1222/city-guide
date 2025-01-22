import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getLoadingIndicator } from '../../components/Utils/Utils';
import './AttractionsInfo.scss';

import Reviews from '../../components/Reviews/Reviews';

function AttractionInfo() {
  const { id } = useParams();
  const [attraction, setAttraction] = useState(null);
  const [error, setError] = useState(null);
  const [isGalleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchAttractionData = async () => {
      try {
        const response = await fetch(`https://6734e04a5995834c8a9132b6.mockapi.io/attractions/${id}`);
        if (!response.ok) {
          if (response.status === 404) throw new Error('404, Ничего не найдено');
          if (response.status === 500) throw new Error('500, Внутренняя ошибка сервера');
          throw new Error(`Ошибка ${response.status}`);
        }
        const data = await response.json();
        setAttraction(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAttractionData();
  }, [id]);

  const openGallery = (startIndex) => {
    setCurrentImageIndex(startIndex);
    setGalleryOpen(true);
  };

  const closeGallery = () => {
    setGalleryOpen(false);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((currentIndex) =>
      (currentIndex + 1) % [attraction.image, attraction.extraImage].filter(Boolean).length
    );
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((currentIndex) =>
      (currentIndex - 1 + [attraction.image, attraction.extraImage].filter(Boolean).length) %
      [attraction.image, attraction.extraImage].filter(Boolean).length
    );
  };

  if (!attraction && !error) {
    return <div className="loading">{getLoadingIndicator()}</div>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const images = [attraction.image, attraction.extraImage].filter(Boolean);

  return (
    <div className="about__block">
      <div className="about__block-images">
        {images.map((src, index) => (
          <img
            key={index}
            className="about__block-images-image"
            src={src}
            alt={`Изображение ${index + 1}`}
            onClick={() => openGallery(index)}
          />
        ))}
      </div>
      <div className="about__block-texts">
        <h2 className="about__block-texts-title">{attraction.title}</h2>
        <p className="about__block-texts-text">{attraction.fullDescription}</p>
      </div>
      <div className="about__block-map">
        <iframe
          className="about__block-map-iframe"
          src={attraction.mapLink}
          title="map"
          allowFullScreen
        ></iframe>
      </div>

      {isGalleryOpen && (
        <div className="gallery__overlay">
          <button className="gallery__close" onClick={closeGallery}>
            X
          </button>
          <button className="gallery__prev" onClick={handlePreviousImage}>
            &lt;
          </button>
          <img
            className="gallery__image"
            src={images[currentImageIndex]}
            alt={`Изображение ${currentImageIndex + 1}`}
          />
          <button className="gallery__next" onClick={handleNextImage}>
            &gt;
          </button>
        </div>
      )}
      <Reviews attractionId={id} />
    </div>
  );
}

export default AttractionInfo;