import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import { Checkbox } from "@mui/material";
import { useState } from "react";

const initialRows = [
  { id: 1, user: "Papa", permission1: false, permission2: false },
  { id: 2, user: "Balázs", permission1: false, permission2: false }
];

export const RoleConfig = () => {
  const [rows, setRows] = useState(initialRows);

  const handlePermissionChange = (id: number, field: string, checked: boolean) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        return { ...row, [field]: checked };
      }
      return row;
    });
    setRows(newRows);
  };

  const columns = [
    { field: "user", headerName: "User", width: 200 },
    {
      field: "permission1",
      headerName: "Permission 1",
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <Checkbox
            checked={params.value as boolean}
            onChange={(event) => {
              handlePermissionChange(params.id as number, "permission1", event.target.checked);
              event.preventDefault();
            }}
          />
        );
      }
    },
    {
      field: "permission2",
      headerName: "Permission 2",
      width: 200,
      renderCell: (params: GridCellParams) => {
        return (
          <Checkbox
            checked={params.value as boolean}
            onChange={(event) => {
              handlePermissionChange(params.id as number, "permission2", event.target.checked);
              event.preventDefault();
            }}
          />
        );
      }
    }
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 }
        }
      }}
      pageSizeOptions={[5, 10]}
    />
  );
};