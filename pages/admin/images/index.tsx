import type { NextPage } from "next";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { AdminLayout } from "@/layouts/AdminLayout";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";
import { ImageCard } from "@/components/admin/Cards/ImageCard";
import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";

interface UseFilesProps {
  fetchUrlPath: string;
}

const useFiles = ({ fetchUrlPath }: UseFilesProps) => {
  const [files, setFiles] = useState<string[]>([]);
  const { user } = useAuth();

  const [fileSelectedForDetail, setFileSelectedForDetail] = useState<
    string | null
  >(null);
  const [fileSelectedForRemove, setFileSelectedForRemove] = useState<
    string | null
  >(null);

  const { data, loading, error } = useNetlifyGetFunction<{
    [key: string]: string[];
  }>({
    fetchUrlPath,
    user,
  });

  useEffect(() => {
    if (!data || files.length > 0) {
      return;
    }

    // const response = parseResponse(data);

    setFiles(data.images);
  }, [data]);

  const onConfirmImageUpload = (newFile: string) => {
    setFiles([...files, newFile]);
  };

  const onSelectFile = (index: number) => {
    setFileSelectedForDetail(files[index]);
  };

  const onCancelView = () => {
    setFileSelectedForDetail(null);
  };

  const onWantToDeleteImage = (index: number) => {
    setFileSelectedForDetail(null);
    setFileSelectedForRemove(files[index]);
  };

  const onDeleteSuccess = () => {
    if (!fileSelectedForRemove) {
      return;
    }

    const imageToDeleteIndex = files.indexOf(fileSelectedForRemove);
    setFiles([
      ...files.slice(0, imageToDeleteIndex),
      ...files.slice(imageToDeleteIndex + 1),
    ]);

    setFileSelectedForRemove(null);
  };

  const onCancelDelete = () => {
    setFileSelectedForRemove(null);
  };

  return {
    files,
    loading,
    error,
    fileSelectedForDetail,
    fileSelectedForRemove,
    onConfirmImageUpload,
    onSelectFile,
    onCancelView,
    onWantToDeleteImage,
    onDeleteSuccess,
    onCancelDelete,
  };
};

const AdminImages: NextPage = () => {
  const {
    files: images,
    loading,
    onSelectFile: onSelectImage,
    error,
  } = useFiles({ fetchUrlPath: "/admin-images" });

  useEffect(() => {
    if (error) {
      toast.error("Error fetching images");
    }
  }, [error]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-gray-600 font-bold">Images</h2>
        UPLOAD
        {/* <UploadImageButton
      actionCopy="Upload Image"
      folder="images"
      onConfirm={onConfirmImageUpload}
    /> */}
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
      {/*
  {#if selectedImageIndex !== undefined}
    <ViewImageModal
      image={images[selectedImageIndex]}
      onClose={onCancelView}
      onWantToDeleteImage={() => onWantToDeleteImage(selectedImageIndex)}
    />
  {/if}

  {#if imageToDeleteIndex !== undefined}
    <DeleteImageModal
      imageToDelete={images[imageToDeleteIndex]}
      onCancel={onCancelDelete}
      onSuccess={onDeleteSuccess}
    />
  {/if} */}
    </div>
  );
};

(AdminImages as any).getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default AdminImages;
