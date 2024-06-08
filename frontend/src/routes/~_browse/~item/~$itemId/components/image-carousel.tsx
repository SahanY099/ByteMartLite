import { useMediaQuery, useWindowSize } from "@uidotdev/usehooks";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useEffect, useRef, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

type ImageCarouselProps = {
  images: string[];
};

export const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const size = useWindowSize();
  const isLgScreen = useMediaQuery("only screen and (min-width : 1024px)");

  const mainImageRef = useRef<HTMLImageElement | null>(null);
  const [mainImageHeight, setMainImageHeight] = useState(300);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    mainImageRef.current &&
      setMainImageHeight(mainImageRef.current.clientHeight);
  }, [mainImageRef, size, mainImageHeight]);

  return (
    <div className="grid gap-4 lg:grid-cols-10">
      <img
        className="aspect-square w-full rounded-lg object-contain lg:col-span-8"
        ref={mainImageRef}
        src={images[activeImageIndex]}
      />
      <Carousel
        opts={{
          align: "start",
          skipSnaps: true,
          dragFree: true,
        }}
        orientation={isLgScreen ? "vertical" : "horizontal"}
        plugins={[WheelGesturesPlugin()]}
        className="group lg:col-span-2 lg:row-start-1"
        style={{
          height: isLgScreen ? mainImageHeight : "auto",
        }}
      >
        <CarouselContent
          style={{
            height: isLgScreen ? mainImageHeight : "auto",
          }}
        >
          {images.map((imageUrl, index) => (
            <CarouselItem
              key={index}
              className="ml-0 basis-1/3 md:basis-1/4"
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                className={cn(
                  "aspect-square rounded-lg object-cover",
                  activeImageIndex === index && "border-2 border-primary",
                )}
                loading="lazy"
                src={imageUrl}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -top-3 left-1/2 hidden -translate-x-1/2 opacity-0 transition-opacity ease-out disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-50 lg:flex" />
        <CarouselNext className="absolute -bottom-3 left-1/2 hidden -translate-x-1/2 opacity-0 transition-opacity ease-out disabled:opacity-0 group-hover:opacity-100 group-hover:disabled:opacity-50 lg:flex" />
      </Carousel>
    </div>
  );
};

export const ImageCarouselSkeleton = () => {
  const size = useWindowSize();
  const isLgScreen = useMediaQuery("only screen and (min-width : 1024px)");

  const mainImageRef = useRef<HTMLImageElement | null>(null);
  const [mainImageHeight, setMainImageHeight] = useState(300);

  useEffect(() => {
    mainImageRef.current &&
      setMainImageHeight(mainImageRef.current.clientHeight);
  }, [mainImageRef, size, mainImageHeight]);

  return (
    <div className="grid gap-4 lg:grid-cols-10">
      <div
        className="aspect-square w-full animate-pulse rounded-md bg-primary/10 object-contain lg:col-span-8"
        ref={mainImageRef}
      />
      <div
        className="flex flex-row gap-4 lg:col-span-2 lg:row-start-1 lg:flex-col"
        style={{
          height: isLgScreen ? mainImageHeight : "auto",
        }}
      >
        <Skeleton className="aspect-square flex-1 rounded-lg" />
        <Skeleton className="aspect-square flex-1 rounded-lg" />
        <Skeleton className="aspect-square flex-1 rounded-lg" />
        <Skeleton className="aspect-square flex-1 rounded-lg" />
      </div>
    </div>
  );
};
