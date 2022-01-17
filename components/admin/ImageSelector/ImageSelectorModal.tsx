import { Modal } from "../Modal";
import { LoadingSpinner } from "../LoadingSpinner";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { toast } from "react-toastify";

interface ImageSelectorModalProps {
  onImageSelected: (image: string) => void;
  onCancel: VoidFunction;
}

export const ImageSelectorModal: React.FC<ImageSelectorModalProps> = ({
  onImageSelected,
  onCancel,
}) => {
  const { user } = useAuth();
  const { loading, error, data } = useNetlifyGetFunction<{ images: string[] }>({
    fetchUrlPath: "/admin-images",
    user,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching images");
    }
  }, [error]);

  const images = data?.images || [];

  const onChooseImage = (index: number) => {
    if (images.length > 0) {
      onImageSelected(images[index]);
    }
  };

  return (
    <Modal>
      <div>
        <div className="text-left px-5 flex-auto justify-center">
          <h2 className="text-2xl text-admin-primary font-bold py-4">
            Choose an image
          </h2>
          <p className="text-left text-sm text-gray-500">
            Select an image from your gallery. If you can{"'"}t find the image
            you are looking for,{" "}
            <a className="text-admin-link" href="/admin/images" target="_blank">
              click here
            </a>{" "}
            to open the images loading page (in a new tab). Once you have added
            your image, please close and re-open this modal.
          </p>
        </div>

        {loading ? (
          <div className="h-24 flex align-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4 mt-4 px-5">
            {images.map((image, index) => (
              <div key={index} className="relative border-2 border-slate-300">
                <img className="w-full cursor-pointer" src={image} />
                <button
                  type="button"
                  className="btn-admin btn-outlined-primary btn-sm absolute bottom-2 right-2"
                  onClick={() => onChooseImage(index)}
                >
                  Choose
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="text-right mt-8 pt-3 border-t-2 justify-end">
          <button
            type="button"
            className="btn-admin btn-danger"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
