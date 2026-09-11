import React from "react";
import {
  Shirt,
  Footprints,
  Layers,
  Truck,
  BadgeCheck,
  DollarSign,
} from "lucide-react";

const About = () => {
  return (
    <div className="relative min-h-screen px-6 py-20 text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/background.jpg"
          alt="Fashion Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
        <div className="text-center mb-14">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-500 font-[cursive]">
            Our Store
          </h1>

          <p className="mt-4 text-gray-200 max-w-2xl mx-auto text-lg">
            Modern fashion for everyday life — premium clothing, stylish
            bottoms, and high-quality footwear.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="bg-black/40 border border-yellow-500/40 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Our Story
            </h2>
            <p className="text-gray-200 leading-relaxed">
              We created this brand to make fashion simple, stylish, and
              accessible. From everyday wear to modern footwear, our focus is on
              comfort, quality, and confidence in every outfit you wear.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap text-sm text-gray-300">
              <span className="border border-yellow-500/40 px-3 py-1 rounded-full">
                Clothing
              </span>
              <span className="border border-yellow-500/40 px-3 py-1 rounded-full">
                Bottoms
              </span>
              <span className="border border-yellow-500/40 px-3 py-1 rounded-full">
                Shoes
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Shirt, label: "Clothing" },
              { icon: Layers, label: "Bottoms" },
              { icon: Footprints, label: "Footwear" },
              { icon: DollarSign, label: "Affordable" },
              { icon: Truck, label: "Fast Delivery" },
              { icon: BadgeCheck, label: "Quality" },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="
                    bg-black/40
                    border border-yellow-500/30
                    rounded-xl p-5
                    flex flex-col items-start gap-3
                    transition duration-300
                    hover:bg-yellow-500
                    hover:text-black
                    hover:scale-[1.05]
                    cursor-pointer
                  "
                >
                  <Icon size={20} />
                  <span className="font-semibold">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
