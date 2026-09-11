import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <img
        src="/hero.jpg"
        alt="Fashion Collection"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-wider font-[cursive] text-white">
          Elevate
          <span className="block text-yellow-500">Your Style</span>
        </h1>

        <p className="mt-6 text-lg  md:text-xl text-white/90 max-w-2xl mx-auto">
          Discover premium fashion crafted for confidence, comfort, and everyday
          excellence.
        </p>

        <Link
          to="/collections/all"
          className="inline-block mt-10  bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;
