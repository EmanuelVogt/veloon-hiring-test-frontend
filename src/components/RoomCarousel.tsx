import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RoomCarouselProps {
  images: string[];
}

export const RoomCarousel = ({ images }: RoomCarouselProps) => {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="aspect-video relative rounded-lg overflow-hidden">
              <img
                src={image}
                alt={`Foto do quarto ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
};