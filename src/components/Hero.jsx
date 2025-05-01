import { Link } from "react-router-dom";
// import { Button } from "../components/ui/Button";
import p1 from "../assets/sw1.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden wave-animation " style={{
        backgroundImage: "url('')"
      }}>
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 "
        style={{
          backgroundImage: `url(${p1})`, 
          filter: "brightness(0.6)",
        }}
      ></div>

      {/* Content */}
      {/* <div className="container mx-auto px-4 z-10 relative pt-16">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
            Dive Into Excellence
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Experience world-class swimming instruction for all ages and
            abilities. Join our swimming community today.
          </p>
          <div
            className="flex flex-col sm:flex-row gap-4 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-aqua-500 hover:bg-aqua-600 text-white px-8 py-6 text-lg rounded-md"
            >
              <Link to="/programs">Explore Programs</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm text-white border-white hover:bg-white/20 px-8 py-6 text-lg rounded-md"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div> */}

      {/* Decorative circle */}
      <div className="hidden md:block absolute right-[-5%] top-[20%] w-72 h-72 rounded-full bg-aqua-500 opacity-20 blur-3xl"></div>
    </section>
  );
};

export default Hero;
