import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import type { FC } from "react";
import image1 from "../../assets/img/hero/hero-1.webp";
import image2 from "../../assets/img/hero/hero-2.webp";
import image3 from "../../assets/img/hero/hero-3.webp";

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
            src={image1}
            className="w-full h-full object-cover"
            alt="hero-2"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image2}
            className="w-full h-full object-cover"
            alt="hero-1"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={image3}
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
