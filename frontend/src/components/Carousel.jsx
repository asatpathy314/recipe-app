import { useState, useEffect } from "react";
import { Flex, Box, Image, AspectRatio } from "@chakra-ui/react";

export default function Carousel() {
  const slides = [
    { img: "/food1.jpg" },
    { img: "/food2.jpg" },
    { img: "/food3.jpg" },
    { img: "/food4.jpg" },
    { img: "/food5.jpg" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;
  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";

  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);

  return (
    <Flex w="full" alignItems="center" justifyContent="center" bg="transparent">
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="500px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full">
              <AspectRatio ratio={16 / 9} w="full" h="full">
                <Image
                  src={slide.img}
                  alt={`carousel image ${sid}`}
                  objectFit="cover"
                />
              </AspectRatio>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
}
