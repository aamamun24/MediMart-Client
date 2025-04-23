'use client'
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="container mx-auto h-[700px] px-4 py-8 overflow-hidden mb-20"> 
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        modules={[Autoplay]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '12px' 
        }} 
      >
        <SwiperSlide style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative'
        }}>
          <Image
            src="https://plus.unsplash.com/premium_photo-1672759455911-d51421fe442c?q=80&w=1416&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner Image 1"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </SwiperSlide>
        <SwiperSlide style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative'
        }}>
          <Image
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=1430&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner Image 2"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </SwiperSlide>
        <SwiperSlide style={{ 
          width: '100%', 
          height: '100%',
          position: 'relative'
        }}>
          <Image
            src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Banner Image 3"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;