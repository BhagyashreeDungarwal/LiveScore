import { Avatar, Box, CircularProgress, Fab, IconButton, Stack, Tooltip } from '@mui/material'
import HeaderFormat from '../Common/HeaderFormat'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import NoData from "./../Images/NoData.jpg"
import { BlockCoachApi, GetCoachApi } from '../../Redux/Action/CoordinatorAction';
import ProtectedRoute from '../../ProtectedRoute';
import { toast } from 'react-toastify';
import AddCoach from './AddCoach';
import { Block, DriveFileRenameOutlineRounded, VerifiedUser } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { clearMessage } from '../../Redux/Reducer/CoordinatorReducer';


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
      <AddCoach />
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
const Coach = () => {
  const dispatch = useDispatch()
  const { coachdata, loading, data, error } = useSelector(state => state.coordinator)


  const handleRequest = async (id) => {
    dispatch(BlockCoachApi(id))
    dispatch(GetCoachApi())
  }
   
  const imgurl = "http://localhost:5032/coach/";

  const columns = useMemo(coachdata => [
    {
      field: `imageUrl`, headerName: "Avatar", width: 60, headerClassName: "header", headerAlign: "center", align: "center",
      renderCell: (params) => (
        <Link to={`/coordinator/editcoachpic/${params.row.coachId}`}> <Avatar src={`${imgurl}${params.value}`} alt="Avatar" /></Link>
      ),
    },
    { field: "coachName", headerName: "Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coachEmail", headerName: "Email", width: 200, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contactNo", headerName: "Contact", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "gender", headerName: "Gender", width: 90, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "experience", headerName: "Experience", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "achievements", headerName: "Achievements", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    {
      headerName: "Actions", headerClassName: "header", headerAlign: "center", align: "center",
      width: 180,
      renderCell: params => {
        if (params.row.status === "UnBlock") {
          return (
            <Box sx={{ p: 1 }}>
              <Tooltip title="Edit">
                <Link to={`/coordinator/editcoach/${params.row.coachId}`} >
                  <Fab variant="extended" size="small" color="warning" sx={{ fontSize: '0.75rem', mr: 1 }}>
                    <DriveFileRenameOutlineRounded size="small" sx={{ mr: 1 }} />Edit
                  </Fab>
                </Link>
              </Tooltip>
              <Fab variant="extended" size="small" color="error" sx={{ fontSize: '0.75rem' }} onClick={() => handleRequest(params.row.coachId)}>
                <VerifiedUser size="small" sx={{ mr: 1 }} />
                Block
              </Fab>
            </Box>
          )
        }
        else if (params.row.status === "Block") {
          return (
            <Fab variant="extended" size="small" color="success" sx={{ fontSize: '0.75rem' }} onClick={() => handleRequest(params.row.coachId)}>
              <Block size="small" sx={{ mr: 1 }} />
              Unblock
            </Fab>)
        }
      }
    }

  ])

  useEffect(() => {
    dispatch(GetCoachApi())
  }, [dispatch])

  useEffect(() => {
    if (data) {
      toast.success(data.msg)
      dispatch(clearMessage())
    }
  }, [data])

  useEffect(() => {
    if (error) {
      toast.error(data.msg)
      dispatch(clearMessage())
    }
  }, [error])


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Coach Management" />
      </Box>
      {
        loading ? <CircularProgress /> :
          <Stack style={{
            marginTop: "1%",
            display: "grid",
            width: "90%",
            height: "70vh",

          }}>{

              coachdata && coachdata.length > 0 ? (
                <DataGrid
                  rows={coachdata}
                  columns={columns}
                  getRowId={(row) => row.coachId}
                  // rowHeight={53}
                  rowSelection={true}
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

export default ProtectedRoute(Coach, 'coordinator') 
