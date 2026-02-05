import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProductImage {
  node: {
    url: string;
    altText: string | null;
  };
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productTitle: string;
}

export const ProductImageGallery = ({ images, productTitle }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div 
        className="aspect-square rounded-lg overflow-hidden bg-white border border-border cursor-pointer group relative"
        onClick={() => setLightboxOpen(true)}
      >
        {images[selectedImage]?.node ? (
          <>
            <img 
              src={images[selectedImage].node.url} 
              alt={images[selectedImage].node.altText || productTitle}
              className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-colors">
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Kein Bild
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-20 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors bg-white ${
                selectedImage === index ? 'border-primary' : 'border-border hover:border-primary/50'
              }`}
            >
              <img 
                src={img.node.url} 
                alt={img.node.altText || `${productTitle} ${index + 1}`}
                className="w-full h-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Dialog */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-black/95 border-none">
          <div className="relative flex items-center justify-center min-h-[50vh]">
            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white h-12 w-12"
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            {/* Main Lightbox Image */}
            <img 
              src={images[selectedImage]?.node.url} 
              alt={images[selectedImage]?.node.altText || productTitle}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                {selectedImage + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
