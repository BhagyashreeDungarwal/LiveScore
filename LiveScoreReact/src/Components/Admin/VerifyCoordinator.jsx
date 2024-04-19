import { Box, CircularProgress, Stack } from '@mui/material'
import HeaderFormat from '../Common/HeaderFormat'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getCategoryApi, getCoordinatorApi } from '../../Redux/Action/AdminAction';


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

const VerifyCoordinator = () => {
  const dispatch = useDispatch()
const {coordinatordata} = useSelector(state => state.admin)

const columns = useMemo(coordinatordata => [
    { field: "imageURL", headerName: "Avatar", width: 80, headerClassName: "header", headerAlign: "center", align: "center",
     renderCell: (params) => (
        <img src={params.value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ), },
    { field: "name", headerName: "Name", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "email", headerName: "Email", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contact", headerName: "Contact", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "dateOfBirth", headerName: "DateOFBirth", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "gender", headerName: "Gender", width: 90, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "age", headerName: "Age", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "lastLogin", headerName: "LastLogin", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "city", headerName: "City", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "state", headerName: "state", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "status", headerName: "Status", width: 90, headerClassName: "header", headerAlign: "center", align: "center" },
    
  ])

  useEffect(() => {
    dispatch(getCoordinatorApi())
  }, [dispatch])
  

  return (
    <div>
       <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Coordinator Verifications" />
      </Box>
      <Stack style={{
        marginTop: "1%",
        display: "grid",
        // width: "100%",
        height: "80vh",

      }}>
        {coordinatordata && coordinatordata.length > 0 ? (
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
          />) : <CircularProgress />
        }
      </Stack>
    </Box>
      
    </div>
  )
}

export default VerifyCoordinator
