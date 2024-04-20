import { Box, CircularProgress, Stack, } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import HeaderFormat from '../Common/HeaderFormat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  getTounamentApi } from '../../Redux/Action/AdminAction';
import { useMemo } from 'react';
import AddTournament from './AddTournament';
import ProtectedRoute from '../../ProtectedRoute';

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
      <AddTournament />
    </GridToolbarContainer>
  );
}

const ManageTournament = () => {

   
const dispatch = useDispatch()
const { tounamentdata } = useSelector(state => state.admin)

  const columns = useMemo(tounamentdata => [
    // { field: "tId", headerName: "Tournament Id", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "tournamentName", headerName: "Tournament Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "location", headerName: "Location", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "tournamentDate", headerName: "Date", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "categoryId", headerName: "Category", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    
  ])

  useEffect(() => {
    dispatch(getTounamentApi())
  }, [dispatch])


  return (
   <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Tournament Management" />
      </Box>
      <Stack style={{
        marginTop: "1%",
        display: "grid",
         width: "90%",
        height: "50vh",

      }}>
        {tounamentdata && tounamentdata.length > 0 ? (
          <DataGrid
            rows={tounamentdata}
            columns={columns}
            getRowId={(row) => row.tId}
            rowHeight={42}
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
  )
}

export default ProtectedRoute(ManageTournament,'admin')
