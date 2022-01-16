// import { useEffect } from "react";
// import { useState } from "react";
// import { useAuth } from "@/contexts/AuthContext";
// import { useNetlifyGetFunction } from "@/hooks/useNetlifyGetFunction";

// type UseAdminIndexFilesListArgs<FetchResult, T> = {
//   fetchPath: string;
//   parseResponse: (response: FetchResult) => T[];
// };

// type UseAdminIndexFilesListReturn<T> = {
//   files: T[];
//   loading: boolean;
//   error?: Error;
//   fileToRemoveIndex: number;
//   onWantToRemoveFile: (index: number) => void;
//   onRemoveConfirmed: VoidFunction;
//   onRemoveCancelled: VoidFunction;
// };

// export const useAdminIndexFilesList = <FetchResult, T>({
//   fetchPath,
//   parseResponse,
// }: UseAdminIndexFilesListArgs<
//   FetchResult,
//   T
// >): UseAdminIndexFilesListReturn<T> => {
//   const [files, setFiles] = useState<string[]>([]);
//   const [fileToRemoveIndex, setFileToRemoveIndex] = useState(-1);

//   const { user } = useAuth();
//   const { data, loading, error } = useNetlifyGetFunction<FetchResult>({
//     fetchUrlPath: fetchPath,
//     user,
//   });

//   useEffect(() => {
//     if (!data || files.length > 0) {
//       return;
//     }

//     const response = parseResponse(data);

//     setFiles(response);
//   }, [data]);

//   const onWantToRemoveFile = (index: number) => {
//     setFileToRemoveIndex(index);
//   };

//   const onRemoveConfirmed = () => {
//     const updatedFiles = [
//       ...files.slice(0, fileToRemoveIndex),
//       ...files.slice(fileToRemoveIndex + 1),
//     ];

//     setFileToRemoveIndex(-1);
//     setFiles(updatedFiles);
//   };

//   const onRemoveCancelled = () => {
//     setFileToRemoveIndex(-1);
//   };

//   const onConfirmFileUpload = (newFile: string) => {
//     setFiles([...files, newFile]);
//   };

//   const onSelectFile = (index: number) => {
//     setFileToRemoveIndex(index);
//   };

//   const onCancelView = () => {
//     setFileToRemoveIndex(-1);
//   };

//   const onWantToDeleteFile = (index: number) => {
//     selectedFileIndex = undefined;
//     imageToDeleteIndex = index;
//   };

//   const onDeleteSuccess = () => {
//     images = [
//       ...images.slice(0, imageToDeleteIndex),
//       ...images.slice(imageToDeleteIndex + 1),
//     ];

//     imageToDeleteIndex = undefined;
//   };

//   const onCancelDelete = () => {
//     imageToDeleteIndex = undefined;
//   };

//   return {
//     files,
//     loading,
//     error,
//     fileToRemoveIndex,
//     onWantToRemoveFile,
//     onRemoveConfirmed,
//     onRemoveCancelled,
//   };
// };
