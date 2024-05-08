import { Box, CircularProgress, Stack, } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import HeaderFormat from '../Common/HeaderFormat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryApi, getTounamentApi } from '../../Redux/Action/AdminAction';
import { useMemo } from 'react';
import AddTournament from './AddTournament';
import ProtectedRoute from '../../ProtectedRoute';
import NoData from "./../Images/NoData.jpg"
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { ClearMessageAdmin } from '../../Redux/Reducer/AdminReducer';

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
      <Box sx={{ mt: 0 }}>No Referee Added</Box>
    </div>
  );
}


const ManageTournament = () => {

  const dispatch = useDispatch()
  const { tounamentdata, loading, data, error } = useSelector(state => state.admin)
  const columns = useMemo(tounamentdata => [
    { field: "tournamentName", headerName: "Tournament Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "venue", headerName: "Venue", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "tournamentDate", headerName: "Date", width: 110, headerClassName: "header", headerAlign: "center", align: "center", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------" },
  ])

  useEffect(() => {
    dispatch(getTounamentApi())
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
        <HeaderFormat title="Tournament Management" />
      </Box>
      {loading ? <Box sx={{ display: "flex", justifyContent: "center" }} >
        <CircularProgress />
      </Box> :
        <Stack style={{
          marginTop: "1%",
          display: "grid",
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

export default ProtectedRoute(ManageTournament, 'admin')
