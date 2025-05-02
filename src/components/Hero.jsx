import { Link } from "react-router-dom";
import p1 from "../assets/Hero1.jpg";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Responsive image controlling section height */}
      <img
        src={p1}
        alt="Hero"
        className="w-full h-auto object-contain brightness-75"
      />

    </section>
  );
};

export default Hero;
