import { Box, CircularProgress, Fab, IconButton, Stack, Tooltip, } from '@mui/material';
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
import { ClearMessageAdmin } from '../../Redux/Reducer/AdminReducer';
import { Link } from 'react-router-dom';
import { DriveFileRenameOutlineRounded } from '@mui/icons-material';

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
    { field: "minWeight", headerName: "Minimum Weight", width: 150, headerClassName: "header", headerAlign: "center", align: "center" , valueFormatter: (params) => params.value ? `${params.value} Kg` :""  },
    { field: "maxWeight", headerName: "Maximum Weight", width: 150, headerClassName: "header", headerAlign: "center", align: "center" , valueFormatter: (params) => params.value ? `${params.value} Kg` :"" },
    { field: "minAge", headerName: "Minimum Age", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "maxAge", headerName: "Maximum Age", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    {
      headerName: "Actions", headerClassName: "header", headerAlign: "center", align: "center", width: 122,
      renderCell: params => {
        return (
          <Box>
            <Tooltip title="Edit">
              <Link to={`/admin/editcategory/${params.row.id}`} >
                <Fab variant="extended" size="small" color="warning" sx={{ fontSize: '0.75rem', mr: 1 }}>
                  {/* <IconButton aria-label="Edit" color='primary'> */}
                  <DriveFileRenameOutlineRounded size="small" sx={{ mr: 1 }} /> Edit
                  {/* </IconButton> */}
                </Fab>
              </Link>
            </Tooltip>
          </Box>
        )
      }

    }
  ])

  useEffect(() => {
    dispatch(getCategoryApi())
    if (data) {
      toast.success(data.msg)
      dispatch(ClearMessageAdmin())
    }
    if (error) {
      toast.error(error.msg)
      dispatch(ClearMessageAdmin())
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

export default ProtectedRoute(CategoryManage, 'admin')
