import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getImageName } from "@/utils/images";
import { Modal } from "../Modal";
import { LoadingSpinner } from "../LoadingSpinner";
import { useNetlifyDeleteFunction } from "@/hooks/useNetlifyDeleteFunction";
import { useAuth } from "@/contexts/AuthContext";

interface DeleteImageModalProps {
  imageToDelete: string;
  onSuccess: VoidFunction;
  onCancel: VoidFunction;
}

export const DeleteImageModal: React.FC<DeleteImageModalProps> = ({
  imageToDelete,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const { pending, error, onDelete } = useNetlifyDeleteFunction({ user });

  useEffect(() => {
    if (error) {
      toast.error(
        "The image could not be deleted, please try again later or contact the web admin."
      );
    }
  }, [error]);

  const onDeleteImage = async () => {
    const fileName = getImageName(imageToDelete);

    const res = await onDelete(`/admin-images?name=${fileName}`);

    if (res !== undefined) {
      onSuccess();
      toast.success(`The image "${fileName}" has been successfully deleted!`);
    }
  };

  return (
    <Modal>
      <div>
        <div className="text-start px-5 flex-auto justify-center">
          <h2 className="text-4xl text-admin-primary font-bold py-4 ">
            Are you sure?
          </h2>
          <p className="text-sm text-gray-500">
            Do you really want to delete this image?{" "}
            <b>This process can not be undone.</b>
          </p>

          <div className="mt-4 w-full flex justify-center">
            <img className="max-w-md" src={imageToDelete} />
          </div>
        </div>

        <div className="p-3 mx-2 text-right space-x-4">
          <button disabled={pending} className="btn-admin" onClick={onCancel}>
            Cancel
          </button>
          <button
            disabled={pending}
            className="btn-admin btn-danger"
            onClick={onDeleteImage}
          >
            {pending ? (
              <LoadingSpinner color="bg-admin-danger-dark" />
            ) : (
              "Delete"
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};
