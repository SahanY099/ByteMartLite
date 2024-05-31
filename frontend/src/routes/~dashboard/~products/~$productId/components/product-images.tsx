import { Hint } from "@/components/hint";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookmarkCheck } from "lucide-react";

const ImagePlaceholder = () => {
  return <div className="aspect-square rounded-md border border-dashed"></div>;
};

type ProductImagesProps = {
  images: {
    url: string;
  }[];
};

export const ProductImages = ({ images }: ProductImagesProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>Preview images of the product</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative aspect-square h-full w-full rounded-md object-cover sm:w-1/2">
            {images[0] ? (
              <>
                <img
                  alt="Product image"
                  className="aspect-square h-full w-full rounded-md object-cover"
                  src={images[0].url}
                />
                <div className="absolute bottom-3 right-3">
                  <Hint label="This is the default product image" side="left">
                    <BookmarkCheck className="text-muted-foreground" />
                  </Hint>
                </div>
              </>
            ) : (
              <ImagePlaceholder />
            )}
          </div>
          <div className="grid h-full w-full grid-cols-2 grid-rows-2 gap-2 sm:w-1/2">
            {images.slice(1).map((image) => (
              <img
                key={image.url}
                alt="Product image"
                className="aspect-square h-full w-full rounded-md object-cover"
                height="100"
                src={image.url}
                width="100"
              />
            ))}
            {Array.from({
              length: images[0] ? 5 - images.length : 4 - images.length,
            }).map((_, index) => (
              <ImagePlaceholder key={index} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
