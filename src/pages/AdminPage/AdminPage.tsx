import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useListExcelExportsQuery } from "@/generated/graphql.tsx";
import { UserManagement } from "./UserManagement";
import { DatabaseExports } from "./DatabaseExports";
import { ExportDeleteDialog } from "./ExportDeleteDialog";

export const AdminPage = () => {
  const { refetch: refetchExports } = useListExcelExportsQuery();

  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    exportId: string | null;
    fileName: string;
  }>({ open: false, exportId: null, fileName: "" });

  const openDeleteDialog = (exportId: string, fileName: string) => {
    setDeleteDialog({ open: true, exportId, fileName });
  };

  const closeDeleteDialog = () => {
    setDeleteDialog({ open: false, exportId: null, fileName: "" });
  };

  const handleExportDeleted = () => {
    refetchExports();
  };

  return (
    <Box mb={16}>
      <Typography variant="h4" style={{ margin: "16px" }}>
        Adminisztráció
      </Typography>

      <UserManagement />

      <DatabaseExports onDeleteExport={openDeleteDialog} />

      <ExportDeleteDialog
        open={deleteDialog.open}
        exportId={deleteDialog.exportId}
        fileName={deleteDialog.fileName}
        onClose={closeDeleteDialog}
        onDeleted={handleExportDeleted}
      />
    </Box>
  );
};
