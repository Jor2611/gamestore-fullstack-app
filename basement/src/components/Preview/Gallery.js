import { useState } from 'react';
import { Box, Image } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

const placeholderImage = 'https://placehold.co/600x400';

export default function Gallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <Box w='100%'>
      <Swiper
        
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Navigation, Thumbs]}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image src={image || placeholderImage} w='100%' borderBottom='1px solid gray'/>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff',
          'margin': '5px' 
        }}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        loop={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        navigation={true}
      >
        {images.map((image, i) => (
          <SwiperSlide key={i}>
            <Image src={image || placeholderImage} border='1px solid gray' cursor='pointer'/>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

