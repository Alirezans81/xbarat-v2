import React, { useRef } from "react";
import { useState } from "react";
import ReactCrop, { convertToPixelCrop } from "react-image-crop";
import { useLanguageState } from "../../Providers/LanguageProvider";
import { useFontState } from "../../Providers/FontProvider";
import { useCropImageModalClose } from "../../Providers/CropImageModalProvider";
import imageCompression from "browser-image-compression";

const setCanvasPreview = (
  image, // HTMLImageElement
  canvas, // HTMLCanvasElement
  crop // PixelCrop
) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";
  ctx.save();

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  // Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
};

export default function CropImageModal({ imageSrc, setImage }) {
  const lang = useLanguageState();
  const font = useFontState();
  const closeCropImageModal = useCropImageModalClose();

  const imageRef = useRef();
  const canvasRef = useRef();

  const [crop, setCrop] = useState({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const compressFile = async (file) => {
    try {
      return imageCompression(file);
    } catch (error) {
      console.log("error: ", error);
      return file;
    }
  };

  const handleSubmit = () => {
    setCanvasPreview(
      imageRef.current,
      canvasRef.current,
      convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
    );
    canvasRef.current.toBlob((blob) => {
      compressFile(blob).then((result) => {
        setImage(result);
      });
    });
    closeCropImageModal();
  };

  return (
    <div className="flex flex-col items-center gap-4 pb-1">
      <div className="flex">
        <ReactCrop
          className="pb-0"
          crop={crop}
          onChange={(c) => setCrop(c)}
          keepSelection
        >
          <img
            alt="uplooad file"
            ref={imageRef}
            className="max-w-[80dvw] h-[80dvh]"
            src={imageSrc}
          />
        </ReactCrop>
        <div>
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className={`w-48 bg-blue text-white font-${font}-regular rounded-lg pt-2 pb-1`}
      >
        {lang["submit"]}
      </button>
    </div>
  );
}
