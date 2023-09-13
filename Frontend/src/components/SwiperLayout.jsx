import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./css/SwiperLayout/SwiperLayout.css";

import { Pagination, Navigation } from "swiper/modules";

import CardComponent from "./CardComponent";


const SwiperLayout = ({ title, items }) => {
  return (
    <>
      <section className="mt-6">
        <div className="container mx-auto px-10 md:px-16 lg:px-32">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-0 md:mb-2 lg:mb-3">
            {title}
          </h2>
        </div>

        <div className="overflow-hidden py-5">
          <div className="container mx-auto px-10 md:px-16 lg:px-32">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              modules={[Pagination, Navigation]}
              className="mySwiper customSwiper"
            >
              {items.map((card, index) => (
                <SwiperSlide key={index} className="h-56">
                  <CardComponent
                    img={card.img}
                    price={card.price}
                    currency={card.currency}
                    category={card.category}
                    title={card.title}
                    desc={card.desc}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
};

export default SwiperLayout;
