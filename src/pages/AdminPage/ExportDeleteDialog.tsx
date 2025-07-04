import { AlertDialog } from "@/components/Dialog.tsx";
import { useDeleteExcelExportMutation } from "@/generated/graphql.tsx";

interface ExportDeleteDialogProps {
  open: boolean;
  exportId: string | null;
  fileName: string;
  onClose: () => void;
  onDeleted: () => void;
}

export const ExportDeleteDialog = ({
  open,
  exportId,
  fileName,
  onClose,
  onDeleted,
}: ExportDeleteDialogProps) => {
  const [deleteExcelExport] = useDeleteExcelExportMutation();

  const handleDeleteExport = async () => {
    if (!exportId) return;
    
    try {
      await deleteExcelExport({ variables: { exportId } });
      onDeleted();
      onClose();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <AlertDialog
      open={open}
      title="Exportálás törlése"
      description={`Biztosan törli a(z) "${fileName}" fájlt? Ez a művelet nem vonható vissza.`}
      primaryButtonText="Törlés"
      secondaryButtonText="Mégse"
      primaryClick={handleDeleteExport}
      secondaryClick={onClose}
      handleClose={onClose}
    />
  );
};