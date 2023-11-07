import React from "react";

export default function PreviewImageModal({ imageUrl }) {
  return (
    <div className="pb-8 pt-4">
      <img
        className="rounded-2xl w-preview-image-modal h-preview-image-modal object-contain"
        src={imageUrl}
      />
    </div>
  );
}
