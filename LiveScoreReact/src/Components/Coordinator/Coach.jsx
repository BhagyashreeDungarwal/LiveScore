import { Box, CircularProgress, Fab, IconButton, Stack, Tooltip } from '@mui/material'
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
    await dispatch(BlockCoachApi(id))
    dispatch(GetCoachApi())
  }

  const columns = useMemo(coachdata => [
    {
      field: "imageUrl", headerName: "Avatar", width: 80, headerClassName: "header", headerAlign: "center", align: "center",
      renderCell: (params) => (
        <img src={params.value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ),
    },
    { field: "coachName", headerName: "Name", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coachEmail", headerName: "Email", width: 170, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contactNo", headerName: "Contact", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "gender", headerName: "Gender", width: 90, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "experience", headerName: "Experience", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "achievements", headerName: "Achievements", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    // { headerName: "Actions", width: 70, headerClassName: "header", headerAlign: "center", align: "center", renderCell: params =>{
    // return (
    //       <Box>
    //         <Tooltip title="Edit">
    //           <Link to={`/coordinator/editcoach/${params.row.coachId}`} >
    //             <IconButton aria-label="Edit" color='primary'>
    //               <DriveFileRenameOutlineRounded />
    //             </IconButton>
    //           </Link>            
    //         </Tooltip>
    //       </Box>
    // )
    // } },
    {headerName: "Actions", headerClassName: "header", headerAlign: "center", align: "center",
      width: 152,
      renderCell: params => {
        if (params.row.status === "UnBlock") {   
        return (
          <Box>
            <Tooltip title="Edit">
              <Link to={`/coordinator/editcoach/${params.row.coachId}`} >
                <IconButton aria-label="Edit" color='primary'>
                  <DriveFileRenameOutlineRounded />
                </IconButton>
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
    } 
  }, [data])
  
  useEffect(() => {
   if (error) {
      toast.error(data.msg)
    } 
  }, [error])
  

  return (
    <Box>

      {
        loading ? <CircularProgress /> :
          <Stack style={{
            marginTop: "1%",
            display: "grid",
            width: "90%",
            height: "78vh",

          }}>{

              coachdata && coachdata.length > 0 ? (
                <DataGrid
                  rows={coachdata}
                  columns={columns}
                  getRowId={(row) => row.coachId}
                  rowHeight={53}
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
