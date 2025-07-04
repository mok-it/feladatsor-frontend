import {
  Avatar,
  Box,
  Button,
  Card,
  IconButton,
  Stack,
  Table,
  TableHead,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import StorageIcon from "@mui/icons-material/Storage";
import dayjs from "dayjs";
import {
  useListExcelExportsQuery,
  useExportExcelMutation,
} from "@/generated/graphql.tsx";
import { StyledTableRow } from "@/components/StyledTableRow.tsx";
import { StyledTableCell } from "@/components/StyledTableCell.tsx";

interface DatabaseExportsProps {
  onDeleteExport: (exportId: string, fileName: string) => void;
}

export const DatabaseExports = ({ onDeleteExport }: DatabaseExportsProps) => {
  const {
    data: exportsData,
    loading: exportsLoading,
    refetch: refetchExports,
  } = useListExcelExportsQuery();

  const [exportExcel] = useExportExcelMutation();

  const handleExportDatabase = async () => {
    try {
      const result = await exportExcel();
      if (result.data?.exportExcel?.url) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `database-export-${timestamp}.xlsx`;

        // Add cache busting parameter
        const url = new URL(result.data.exportExcel.url);
        url.searchParams.set("t", Date.now().toString());

        const link = document.createElement("a");
        link.href = url.toString();
        link.download = filename;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Wait a bit before refetching to ensure the export is processed
        setTimeout(() => {
          refetchExports();
        }, 1000);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const formatFileSize = (sizeStr: string) => {
    const size = parseInt(sizeStr);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string) => {
    return dayjs(+dateStr).format("YYYY. MM. DD. HH:mm");
  };

  const handleDownload = (url: string, fileName: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <Box p={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">Adatbázis exportálás</Typography>
          <Button
            variant="contained"
            onClick={handleExportDatabase}
            startIcon={<StorageIcon />}
          >
            Adatbázis exportálása
          </Button>
        </Stack>

        {exportsLoading && <Typography>Exportálás betöltése...</Typography>}

        {exportsData?.listExcelExports && (
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>
                  <Typography variant="body1" textAlign="center">
                    Fájlnév
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body1" textAlign="center">
                    Méret
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body1" textAlign="center">
                    Exportálta
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body1" textAlign="center">
                    Létrehozva
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body1" textAlign="center">
                    Műveletek
                  </Typography>
                </StyledTableCell>
              </StyledTableRow>
            </TableHead>
            {exportsData.listExcelExports.map((exportItem) => (
              <StyledTableRow key={exportItem.id}>
                <StyledTableCell>
                  <Typography variant="body2">
                    {exportItem.fileName}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">
                    {formatFileSize(exportItem.fileSize)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Avatar
                      src={exportItem.exportedBy.avatarUrl ?? undefined}
                      sx={{ width: 24, height: 24 }}
                    />
                    <Typography variant="body2">
                      {exportItem.exportedBy.name}
                    </Typography>
                  </Stack>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2">
                    {formatDate(exportItem.createdAt)}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Stack direction="row" gap={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleDownload(exportItem.url, exportItem.fileName)}
                    >
                      <DownloadIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => onDeleteExport(exportItem.id, exportItem.fileName)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </Table>
        )}

        {exportsData?.listExcelExports?.length === 0 && (
          <Typography
            color="text.secondary"
            sx={{ textAlign: "center", py: 4 }}
          >
            Nincs exportálás
          </Typography>
        )}
      </Box>
    </Card>
  );
};