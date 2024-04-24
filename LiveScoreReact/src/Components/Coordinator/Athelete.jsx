import { Box, CircularProgress, Stack } from '@mui/material'
import HeaderFormat from '../Common/HeaderFormat'
import AddAthelete from './AddAthelete'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import NoData from "./../Images/NoData.jpg"
import { useEffect, useMemo } from 'react';
import { GetCoachApi, getAtheleteApi } from '../../Redux/Action/CoordinatorAction';
import { toast } from 'react-toastify';
import { getCategoryApi } from '../../Redux/Action/AdminAction';
// import { useState } from 'react';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport />
      <GridToolbarDensitySelector
        slotProps={{ tooltip: { title: 'Change density' } }}
      />
      <Box sx={{ flexGrow: 1 }} />
      <AddAthelete />
    </GridToolbarContainer>
  );
}

function CustomNoRowsOverlay() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%'
    }}>
      <img
        style={{ flexShrink: 0, marginTop: "15%" }}
        src={NoData}
        alt="No Rows"
        width="240"
        height="240"

      />
      <Box sx={{ mt: 0 }}>No Coach Added</Box>
    </div>
  );
}

const Athelete = () => {

  const dispatch = useDispatch()
  const { atheletedata, loading, data, error } = useSelector(state => state.coordinator)

  const columns = useMemo(atheletedata => [
    {
      field: "imageUrl", headerName: "Avatar", width: 70, headerClassName: "header", headerAlign: "center", align: "center",
      renderCell: (params) => (
        <img src={params.value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ),
    },
    { field: "athleteName", headerName: "Name", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "email", headerName: "Email", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contact", headerName: "Contact", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "dateOfBirth", headerName: "DateOFBirth", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "gender", headerName: "Gender", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "height", headerName: "Height", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "weight", headerName: "Weight", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "city", headerName: "City", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "state", headerName: "State", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
    {
      field: "categoryId", headerName: "Category", width: 80, headerClassName: "header", headerAlign: "center", align: "center",
      renderCell: params => {
        // Assuming params.row.category contains the entire category object
        const categoryName = params.row.category ? params.row.category.categoryName : "Unknown Category";
        return <span>{categoryName}</span>;
      }
    },
    { field: "coachId", headerName: "Coach", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coordinater", headerName: "Coordinater", width: 100, headerClassName: "header", headerAlign: "center", align: "center" }

  ])

  useEffect(() => {
    dispatch(getAtheleteApi())
    dispatch(getCategoryApi())
    dispatch(GetCoachApi())
    if (data) {
      toast.success(data.msg)
    }
    if (error) {
      toast.error(data.msg)
    }
  }, [dispatch, data, error])


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Athelete Management" />
      </Box>
      {
        loading ? <CircularProgress /> :
          <Stack style={{
            marginTop: "1%",
            display: "grid",
            // width: "100%",
            height: "80vh",

          }}>
            {
              atheletedata && atheletedata.length > 0 ? (
                <DataGrid
                  rows={atheletedata}
                  columns={columns}
                  getRowId={(row) => row.id}
                  rowHeight={54}
                  rowSelection="true"
                  rowSpacingType='margin'
                  slots={{ toolbar: CustomToolbar }}
                  scrollbarSize={1}
                  columnHeaderHeight={37}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />) : (

                <DataGrid
                  autoHeight
                  rows={[]}
                  columns={columns}
                  getRowId={(row) => row.id}
                  rowHeight={42}
                  rowSelection="true"
                  rowSpacingType='margin'
                  slots={{ toolbar: CustomToolbar, noRowsOverlay: CustomNoRowsOverlay }}
                  scrollbarSize={1}
                  columnHeaderHeight={37}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              )
            }
          </Stack>
      }
    </Box>

  )
}


export default Athelete
