import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../assets/banner/pic1.jpg";
import banner2 from "../assets/banner/pic2.jpg";
import banner3 from "../assets/banner/pic4.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Import required modules
import { Pagination } from "swiper/modules";

// Import Simple Typewriter
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  return (
    <div className="mx-4 md:mx-6">
      <Swiper
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="relative h-[300px] md:h-[640px] rounded-xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={banner1}
              alt="Banner 1"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
                <Typewriter
                  words={["Welcome to VisaEase "]}
                  loop={false}
                  cursor
                  cursorStyle="_"
                />
              </h1>
              <p className="text-lg md:text-xl">Discover the world with us.</p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="relative h-[300px] md:h-[640px] rounded-xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={banner2}
              alt="Banner 2"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
                <Typewriter
                  words={["Your Next Destination"]}
                  
                />
              </h1>
              <p className="text-lg md:text-xl">
                <Typewriter
                  words={["Embark on a journey like never before."]}
                  loop={false}
                  cursor
                  cursorStyle="|"
                 
                />
              </p>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 */}
        <SwiperSlide>
          <div className="relative h-[300px] md:h-[640px] rounded-xl overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src={banner3}
              alt="Banner 3"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
                <Typewriter
                  words={["Explore the Unknown"]}
                  loop={false}
                  cursor
                />
              </h1>
              <p className="text-lg md:text-xl">
                <Typewriter
                  words={["Let us guide your way."]}
                  loop={false}
                  cursor
                />
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
