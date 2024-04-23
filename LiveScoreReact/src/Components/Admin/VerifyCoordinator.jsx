import { Avatar, Box, Chip, CircularProgress, Fab, Stack } from '@mui/material'
import HeaderFormat from '../Common/HeaderFormat'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { VerifyCoordinatorApi, getCoordinatorApi } from '../../Redux/Action/AdminAction';
import ProtectedRoute from '../../ProtectedRoute';
import dayjs from 'dayjs';
import { Circle, VerifiedUser } from '@mui/icons-material';
import { toast } from 'react-toastify';
import NoData from "./../Images/NoData.jpg"


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
      <Box sx={{ mt: 0 }}>No Request Added</Box>
    </div>
  );
}


const VerifyCoordinator = () => {
  const dispatch = useDispatch()
  const { coordinatordata, verifydata, error, loading } = useSelector(state => state.admin)


  const handleRequest = async (id) => {
    await dispatch(VerifyCoordinatorApi(id))
  }


  const columns = useMemo(coordinatordata => [
    {
      field: "imageURL", headerName: "Avatar", width: 60, headerClassName: "header", headerAlign: "center", align: "center",
      renderCell: (params) => (
        <Avatar src={params.value} />
        // <img src={params.value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ),
    },
    { field: "name", headerName: "Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "email", headerName: "Email", width: 230, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contact", headerName: "Contact", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "dateOfBirth", headerName: "DateOFBirth", width: 120, headerClassName: "header", headerAlign: "center", align: "center", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------" },
    { field: "gender", headerName: "Gender", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "age", headerName: "Age", width: 40, headerClassName: "header", headerAlign: "center", align: "center" },
    // { field: "lastLogin", headerName: "LastLogin", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "city", headerName: "City", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "state", headerName: "state", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    {
      field: "status", headerName: "Status", width: 140, headerClassName: "header", headerAlign: "center", align: "center", renderCell: params => {
        if (params.row.status === false) {
          return <Chip icon={<Circle fontSize='small' color='error' />} label="Not Verified" color='error' variant='outlined' size='small' />
        }
        else if (params.row.status === true) {
          return <Chip icon={<Circle fontSize='small' color='success' />} label="Verified" color='success' variant='outlined' size='small' />
        }
      }
    }, {
      headerName: "Actions", headerClassName: "header", headerAlign: "center", align: "center",
      width: 122,
      renderCell: params => {
        if (params.row.status === false) {   
        return (
          <Fab variant="extended" size="small" color="success" sx={{ fontSize: '0.75rem' }} onClick={() => handleRequest(params.row.id)}>
            <VerifiedUser size="small" sx={{ mr: 1 }} />
            Accept
          </Fab>)
        }
      }
    }

  ])

  useEffect(() => {
    dispatch(getCoordinatorApi())

    if (verifydata) {
      toast.success(verifydata.msg)
      dispatch(getCoordinatorApi())
    }
    if (error) {
      toast.error(error.msg)
    }

  }, [dispatch, verifydata, error])


  return (
    <div>
      <Box>
        <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
          <HeaderFormat title="Coordinator Verifications" />
        </Box>
        {
          loading ? <CircularProgress /> :
            <Stack style={{
              marginTop: "1%",
              display: "grid",
              // width: "90%",
              height: "60vh",

            }}>
              {
                coordinatordata && coordinatordata.length > 0 ? (
                  <DataGrid
                    rows={coordinatordata}
                    columns={columns}
                    getRowId={(row) => row.id}
                    rowHeight={53}
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
                    rowHeight={53}
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

    </div>
  )
}

export default ProtectedRoute(VerifyCoordinator, 'admin')
