import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const imageProp = ["1", "2", "3"];

function CarouselComponent() {
  return (
    <Carousel
      autoPlay
      navButtonsAlwaysVisible
      infiniteLoop
      showStatus={false}
      emulateTouch
      showThumbs={false}
    >
      {imageProp.map((image) => (
        <div
          style={{ maxHeight: "36rem" }}
          className="object-center brightness-50"
        >
          <img
            src={`https://picsum.photos/900/600?random=${image}`}
            alt={`random image ${image}`}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
