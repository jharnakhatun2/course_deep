import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

import type { FC } from "react";

type Props = {
  children?: React.ReactNode; // static overlay content
};

const HeroSlider: FC<Props> = ({ children }) => {
  return (
    <div className="relative w-full h-[500px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        effect="fade"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[EffectFade, Autoplay]}
        className="w-full h-full"
      >
        {/* ✅ Background slides */}
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/Zp4HyzdS/hero-2.webp"
            className="w-full h-full object-cover"
            alt="hero-2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/ZzpZHBgT/hero-1.webp"
            className="w-full h-full object-cover"
            alt="hero-1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://i.ibb.co.com/HTDqRhMF/hero-3.webp"
            className="w-full h-full object-cover"
            alt="hero-3"
          />
        </SwiperSlide>
      </Swiper>

      {/* ✅ Static overlay children */}
      <div className="absolute inset-0 flex items-center justify-center text-white z-10">
        {children}
      </div>
    </div>
  );
};

export default HeroSlider;
