import { Box, CircularProgress, Fab, Stack } from '@mui/material'
import HeaderFormat from '../Common/HeaderFormat'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import NoData from "./../Images/NoData.jpg"
import { GetCoachApi } from '../../Redux/Action/CoordinatorAction';
import ProtectedRoute from '../../ProtectedRoute';
import { toast } from 'react-toastify';
import AddCoach from './AddCoach';
import { VerifiedUser } from '@mui/icons-material';


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
    const dispatch =  useDispatch()
    const {coachdata, loading, data, error} = useSelector(state => state.coordinator)

    const columns = useMemo(coachdata => [
    { field: "imageUrl", headerName: "Avatar", width: 80, headerClassName: "header", headerAlign: "center", align: "center",
     renderCell: (params) => (
        <img src={params.value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ), },
    { field: "coachName", headerName: "Name", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coachEmail", headerName: "Email", width: 170, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contactNo", headerName: "Contact", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
     { field: "gender", headerName: "Gender", width: 90, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "experience", headerName: "Experience", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "achievements", headerName: "Achievements", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    
  ])

  useEffect(() => {
    dispatch(GetCoachApi())
    if(data){
        toast.success(data.msg)
    }
    if(error){
        toast.error(data.msg)
    }
  }, [dispatch,data,error])
  

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

export default ProtectedRoute(Coach,'coordinator') 
