import { Box, CircularProgress, Stack, } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import AddCategory from './AddCategory';
import HeaderFormat from '../Common/HeaderFormat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryApi } from '../../Redux/Action/AdminAction';
import { useMemo } from 'react';
import NoData from "./../Images/NoData.jpg"
import { toast } from 'react-toastify';
import ProtectedRoute from '../../ProtectedRoute';

// Tolbar for datagrid
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
      <AddCategory />
    </GridToolbarContainer>
  );
}

// For No Row Display
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
      <Box sx={{ mt: 0 }}>No Category Added</Box>
    </div>
  );
}



const CategoryManage = () => {

  const dispatch = useDispatch()
  const { categorydata, loading, data, error } = useSelector(state => state.admin)

  const columns = useMemo(categorydata => [
    { field: "id", headerName: "Id", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "categoryName", headerName: "Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "categoryTime", headerName: "Time(Minutes)", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },

  ])

  useEffect(() => {
    dispatch(getCategoryApi())
    if (data) {
      toast.success(data.msg)
    }
    if (error) {
      toast.error(error.msg)
    }
  }, [dispatch, data, error])


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Category Management" />
      </Box>

      {
        loading ? <CircularProgress /> :
          <Stack style={{
            marginTop: "1%",
            display: "grid",
            width: "90%",
            height: "60vh",

          }}>{

              categorydata && categorydata.length > 0 ? (
                <DataGrid
                  rows={categorydata}
                  columns={columns}
                  getRowId={(row) => row.id}
                  rowHeight={42}
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

export default ProtectedRoute(CategoryManage,'admin')
