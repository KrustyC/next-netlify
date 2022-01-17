import type { NextPage } from "next";
import { ReactElement, useEffect } from "react";
import { toast } from "react-toastify";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAdminIndexFiles } from "@/hooks/useAdminIndexFiles";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { ImageCard } from "@/components/admin/Cards/ImageCard";
import { ViewImageModal } from "@/components/admin/Modals/ViewImageModal";
import { DeleteImageModal } from "@/components/admin/Modals/DeleteImageModal";
import { UploadImageButton } from "@/components/admin/UploadImageButton";

const AdminImages: NextPage = () => {
  const {
    files: images,
    loading,
    onSelectFile: onSelectImage,
    fileSelectedForDetail: imageSelectedForDetail,
    fileSelectedForRemove: imageSelectedForRemove,
    onConfirmImageUpload,
    onCancelView,
    onWantToDeleteImage,
    onDeleteSuccess,
    onCancelDelete,
    error,
  } = useAdminIndexFiles<{ images: string[] }>({
    fetchUrlPath: "/admin-images",
    parseResponse: (response) => response.images,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching images");
    }
  }, [error]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Images</h2>
        <UploadImageButton
          actionCopy="Upload Image"
          folder="images"
          onConfirm={onConfirmImageUpload}
        />
      </div>

      <p className="text-gray-600">
        In this section you can manage your Images. Click on any image to view
        it in its full size or delete it.
      </p>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {images.map((image, index) => (
              <ImageCard
                key={image}
                image={image}
                onClick={() => onSelectImage(index)}
              />
            ))}
          </>
        )}
      </div>

      {imageSelectedForDetail ? (
        <ViewImageModal
          image={imageSelectedForDetail}
          onClose={onCancelView}
          onWantToDeleteImage={onWantToDeleteImage}
        />
      ) : null}

      {imageSelectedForRemove ? (
        <DeleteImageModal
          imageToDelete={imageSelectedForRemove}
          onSuccess={onDeleteSuccess}
          onCancel={onCancelDelete}
        />
      ) : null}
    </div>
  );
};

(AdminImages as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminImages;
