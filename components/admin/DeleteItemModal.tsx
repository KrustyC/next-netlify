import { Modal } from "./Modal";
import { useNetlifyDeleteFunction } from "@/hooks/useNetlifyDeleteFunction";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/admin/LoadingSpinner";

interface DeleteItemModalProps {
  itemGenericName: string;
  itemToDelete: any;
  questionItem: string;
  deletePath: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export const DeleteItemModal: React.FC<DeleteItemModalProps> = ({
  itemGenericName,
  itemToDelete,
  questionItem,
  deletePath,
  onSuccess,
  onCancel,
}) => {
  const { user } = useAuth();
  const { onDelete, pending, error } = useNetlifyDeleteFunction({
    user,
  });

  const onDeleteItem = async () => {
    try {
      await onDelete(deletePath);

      onSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  if (!itemToDelete) {
    return null;
  }

  return (
    <Modal width="w-5/12">
      <div>
        <div className="text-left px-2">
          <h2 className="text-4xl text-admin-primary font-bold py-4 ">
            Are you sure?
          </h2>
          <p className="text-left text-gray-500">
            Do you really want to delete the item{" "}
            <b>&quot;{questionItem}&quot;</b>?
            <br />
            This action is irreversible.
          </p>
        </div>

        <div className="p-3 mx-2 text-right space-x-4 border-t-2 border-slate-300 mt-4 pt-4">
          <button disabled={pending} className="btn-admin" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn-admin btn-danger"
            disabled={pending}
            onClick={onDeleteItem}
          >
            {pending ? <LoadingSpinner /> : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
