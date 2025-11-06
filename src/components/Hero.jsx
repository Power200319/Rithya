import { useState, useEffect } from "react";

const Hero = () => {
  const [heroes, setHeroes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const response = await fetch('https://rithya.onrender.com/api/public/heroes/');
        if (response.ok) {
          const data = await response.json();
          // Ensure data is an array
          if (Array.isArray(data)) {
            setHeroes(data);
          } else {
            console.error('Heroes data is not an array:', data);
            setHeroes([]);
          }
        } else {
          console.error('Failed to fetch heroes:', response.status, response.statusText);
          setHeroes([]);
        }
      } catch (error) {
        console.error('Error fetching heroes:', error);
        setHeroes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroes();
  }, []);

  // Auto-scroll every 8 seconds
  useEffect(() => {
    if (heroes.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % heroes.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [heroes]);

  if (loading) {
    return (
      <section id="home" className="relative w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white">Loading...</div>
      </section>
    );
  }

  if (heroes.length === 0) {
    return (
      <section id="home" className="relative w-full h-screen flex items-center justify-center bg-black">
        <div className="text-white">No hero images available</div>
      </section>
    );
  }

  return (
    <section id="home" className="relative w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      <img
        src={heroes[currentIndex]?.image_url}
        alt={`Slide ${currentIndex + 1}`}
        loading="lazy"
        className="max-h-full max-w-full object-contain brightness-75 transition-all duration-1000"
      />

      {/* Slide Indicator Dots */}
      <div className="absolute bottom-6 flex gap-2">
        {heroes.map((_, index) => (
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
