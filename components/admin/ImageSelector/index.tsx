import { useState } from "react";
import { ImageSelectorModal } from "./ImageSelectorModal";

interface ImageSelectorProps {
  currentImage?: string;
  onSelectImage: (image: string) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  currentImage,
  onSelectImage,
}) => {
  const [showModal, setShowModal] = useState(false);

  const onDisplayModal = () => {
    setShowModal(true);
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const onImageSelected = (selectedImage: string) => {
    onSelectImage(selectedImage);
    setShowModal(false);
  };

  return (
    <div>
      {currentImage ? (
        <img
          src={currentImage}
          className="h-96 w-96 object-contain border-2 border-slate-300"
        />
      ) : (
        <div className="h-96 w-96 flex justify-center items-center border-2 border-slate-300 bg-gray-200">
          <p className="uppercase text-gray-800">No image selected</p>
        </div>
      )}

      <button
        type="button"
        className="btn-admin btn-primary btn-sm mt-2"
        onClick={onDisplayModal}
      >
        {currentImage ? "Update" : "Choose"} From Gallery
      </button>

      {showModal ? (
        <ImageSelectorModal
          onImageSelected={onImageSelected}
          onCancel={onCancel}
        />
      ) : null}
    </div>
  );
};
