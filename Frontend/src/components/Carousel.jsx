import React, { useState } from "react";
import CameraCard from "./CameraCard";

const Carousel = ({ images, paths }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const goToNextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="flex gap-4">
      <button className="mr-2" onClick={goToPrevSlide}>
        &#10094;
      </button>
      <CameraCard
        path={paths[currentIndex]}
        thumbnail={images[currentIndex]}
      ></CameraCard>
      <CameraCard
        thumbnail={images[nextIndex]}
        path={paths[nextIndex]}
      ></CameraCard>
      <button className="ml-2" onClick={goToNextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;
