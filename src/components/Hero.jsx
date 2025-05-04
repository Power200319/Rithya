import { useState, useEffect } from "react";
import p1 from "../assets/Hero1.JPG";
import p2 from "../assets/Hero2.JPG";
import p3 from "../assets/Hero3.JPG";
import p3 from "../assets/gallery1.jpg";

const images = [p1, p2, p3, p4];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // changed to 5000ms = 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        loading="lazy"
        className="max-h-full max-w-full object-contain brightness-75 transition-all duration-1000"
      />

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/40"
            } hover:bg-white transition-colors`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
