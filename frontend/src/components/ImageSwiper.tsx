import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ImageViewer from "./ImageViewer";
import { useState } from "react";

type Props = {
  imageUrls: string[];
};

export default function ImageSwiper({ imageUrls }: Props) {
  const [showFullImage, setShowFullImage] = useState(false);
  const [currentImage, setCurrentImage] = useState(imageUrls[0]);
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        className="w-full h-full"
        scrollbar={{ draggable: true }}
      >
        {imageUrls?.map((url) => {
          return (
            <SwiperSlide key={url}>
              <img
                src={url}
                onClick={() => {
                  setShowFullImage(true);
                  setCurrentImage(url);
                }}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <ImageViewer
        imageUrl={currentImage}
        open={showFullImage}
        setOpen={setShowFullImage}
      />
    </>
  );
}
