import { Link } from "@tanstack/react-router";
import {
  LazyLoadImage,
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import placeholderImage from "@/assets/placeholder.svg";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type CarouselProps = {
  carousel?: true;
  images: string[];
};

type SingleImageProps = {
  carousel: false;
  image: string;
};

type ProductImagesProps = (CarouselProps | SingleImageProps) & {
  productId: number;
  scrollPosition: ScrollPosition;
};

export const ProductImages = trackWindowScroll(
  ({ productId, scrollPosition, ...props }: ProductImagesProps) => {
    const isCarousel = props.carousel == undefined || props.carousel;

    if (isCarousel && props.images.length > 1) {
      return (
        <Carousel className="group relative w-full" opts={{ loop: true }}>
          <Link to="/item/$itemId" params={{ itemId: productId.toString() }}>
            <CarouselContent>
              {props.images.map((image, index) => (
                <CarouselItem key={index} className="">
                  <LazyLoadImage
                    src={image}
                    effect="blur"
                    height="100%"
                    className="aspect-square overflow-hidden rounded-xl object-cover"
                    wrapperClassName="aspect-square overflow-hidden rounded-xl object-cover"
                    scrollPosition={scrollPosition}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Link>

          <CarouselPrevious className="absolute left-0.5 hidden opacity-0 transition-opacity ease-out group-hover:opacity-100 md:flex" />
          <CarouselNext className="absolute right-0.5 hidden opacity-0 transition-opacity ease-out group-hover:opacity-100 md:flex" />
          <CarouselDots className="absolute bottom-4 left-1/2 -translate-x-1/2" />
        </Carousel>
      );
    }

    if (isCarousel) {
      return (
        <Link
          to="/item/$itemId"
          params={{ itemId: productId.toString() }}
          className="aspect-square"
        >
          <LazyLoadImage
            src={props.images[0] || placeholderImage}
            effect="blur"
            className="h-full w-full"
            height="100%"
            wrapperClassName="aspect-square overflow-hidden rounded-xl object-cover mb-2"
            placeholderSrc={placeholderImage}
            scrollPosition={scrollPosition}
          />
        </Link>
      );
    }

    if (props.carousel == false) {
      return (
        <Link
          to="/item/$itemId"
          params={{ itemId: productId.toString() }}
          className="aspect-square"
        >
          <LazyLoadImage
            src={props.image}
            effect="blur"
            height="100%"
            className="aspect-square rounded-xl object-cover"
            wrapperClassName="aspect-square overflow-hidden rounded-xl object-cover"
            placeholderSrc={placeholderImage}
            scrollPosition={scrollPosition}
          />
        </Link>
      );
    }
  },
);
