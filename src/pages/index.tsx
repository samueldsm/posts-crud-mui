import { useEffect, useState } from "react";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ButtonGroup from "@mui/material/ButtonGroup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";

import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid/";

import { AddButton } from "@/components/buttons/";
import { PostLayout } from "../components/layout/PostLayout";
import { FormDialog } from "../components/posts/formDialog";
import { SearchInput } from "../components/ui/";
import { DeleteDialog } from "../components/posts/deleteDialog";

import { getPost } from "@/redux/slices/post";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IPost } from "@/interfaces/post";

export default function PostsPage() {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const { isLoading, posts } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPost());
  }, []);

  const handleClickOpenDeleteDialog = (id: number) => {
    console.log("Delete ", id);
    setOpenDeleteDialog(true);
  };

  function handleEdit(row: number) {
    console.log("Edit", row);
  }

  function handleDelete(row: number) {
    console.log("Delete", row);
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.1 },
    { field: "title", headerName: "Title", flex: 0.3 },
    { field: "body", headerName: "Body", flex: 0.5 },
    {
      field: "options",
      headerName: "Options",
      flex: 0.1,
      renderCell: ({ row }: GridRenderCellParams) => {
        return (
          //TODO: Make this <ButtonGroup/>  with a responsive design
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              color="info"
              onClick={() => handleEdit(row.id)}
              startIcon={<EditOutlinedIcon />}
            ></Button>
            <Button
              color="error"
              onClick={() => handleClickOpenDeleteDialog(row.id)}
              endIcon={<DeleteIcon />}
            ></Button>
          </ButtonGroup>
        );
      },
    },
  ];

  const rows = posts.map((post: IPost) => ({
    id: post.id,
    title: post.title,
    body: post.body,
  }));
  return (
    <>
      <PostLayout
        title="Posts"
        icon={<ReceiptLongOutlinedIcon sx={{ fontSize: 24 }} />}
      >
        <Grid
          container
          spacing={2}
          sx={{ mt: 2, paddingLeft: 4, paddingRight: 4, minWidth: 700 }}
        >
          <Grid item xs={8}>
            <AddButton />
          </Grid>
          <Grid
            item
            xs={4}
            className="border"
            sx={{ width: "100%", height: "100%" }}
          >
            <SearchInput />
          </Grid>
          <Grid item xs={12} sx={{ minWidth: 700 }}>
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooterSelectedRowCount
              //Edit for when is loading
              loading={isLoading}
              // density="compact"
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 4 },
                },
              }}
              pageSizeOptions={[4, 8, 16]}
            />
          </Grid>
        </Grid>
        <FormDialog />

        <DeleteDialog
          openDeleteDialog={openDeleteDialog}
          setOpenDeleteDialog={setOpenDeleteDialog}
        />
      </PostLayout>
    </>
  );
}