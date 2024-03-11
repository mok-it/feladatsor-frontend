import Chip from "@mui/material/Chip";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { CategoryDifficulties } from "@/components/CategoryDifficulties.tsx";
import { DataTable } from "@/components/DataTable/DataTable.tsx";
import { ExerciseAgeGroup } from "@/generated/graphql.tsx";
import { DataGenerator } from "@/components/DataTable/DataTable.types.ts";
import { useNavigate } from "react-router-dom";

export type ExerciseItem = {
  fakeId: string;
  categoryDifficulties: { [key in ExerciseAgeGroup]: number };
  state: string;
  tags: string[];
  hasPicture: boolean;
  description: string;
};

export const ExerciseList = (props: {
  dataGenerator: DataGenerator<ExerciseItem>;
  totalRows: number;
}) => {
  let navigate = useNavigate();
  const routeChange = (id: string) => {
    let path = `/exercise/${id}`;
    navigate(path);
  };
  return (
    <DataTable<ExerciseItem>
      columns={{
        fakeId: {
          element: "fakeID",
          sortable: true,
          sx: { width: "5%" },
        },
        categoryDifficulties: {
          element: "Kategóriák",
          sortable: true,
          sx: { width: "5%" },
        },
        state: {
          element: "Állapot",
          sortable: true,
          sx: { width: "5%" },
        },
        tags: {
          element: "Címkék",
          sx: { width: "5%" },
        },
        hasPicture: {
          element: "Van ábra",
          sx: { width: "1%" },
        },
        description: {
          element: "Leírás",
          sortable: true,
          sx: { width: "50%" },
        },
      }}
      dataSource={{
        dataGenerator: props.dataGenerator,
        totalRows: props.totalRows,
      }}
      hoverable
      maxHeight="400px"
      pagination={{
        defaultRowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 15],
      }}
      onRowClick={(row) => routeChange(row.fakeId)}
      rowRenderers={{
        fakeId: (value) => <Chip label={value} />,
        tags: (tags: string[]) => (
          <>
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} />
            ))}
          </>
        ),
        hasPicture: (value) => (value ? <FaCheck /> : <RxCross2 />),
        categoryDifficulties: (value) => <CategoryDifficulties value={value} />,
      }}
    />
  );
};
