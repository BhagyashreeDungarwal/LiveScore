import ProtectedRoute from '../../ProtectedRoute'
import { Box, CircularProgress, Fab, Stack, Tooltip } from "@mui/material"
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import NoData from "./../Images/NoData.jpg"
import HeaderFormat from "../Common/HeaderFormat";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import { DriveFileRenameOutlineRounded } from "@mui/icons-material";
import { useState } from "react";
import { GetMatch } from "../Apis/Coordinator";

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
      <Box sx={{ mt: 0 }}>No Match Added</Box>
    </div>
  );
}

const MatchDetails = () => {
  const [match, setMatch] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getMatch()
  }, [])

  const columns = useMemo(() => [
    { field: "matchGroup", headerName: "GroupId", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "tournament", headerName: "Tournament", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchType", headerName: "Match Type", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchStatus", headerName: "Match Status", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchDate", headerName: "Match Date", width: 100, headerClassName: "header", headerAlign: "center", align: "center", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------" },
    { field: "category", headerName: "Category", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "numberOfRound", headerName: "Rounds", width: 90, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "athleteRed", headerName: "Athlete Red", width: 120, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "athleteBlue", headerName: "Athlete Blue", width: 120, headerClassName: "header", headerAlign: "center", align: "center", valueGetter: (params) => params.row.athleteBlue ? params.row.athleteBlue : '------', },
    {
      field: "matchCoordinator", headerName: "Coordinator", width: 120, headerClassName: "header", headerAlign: "center", align: "center",
      valueGetter: (params) => params.row.matchCoordinator ? params.row.matchCoordinator : '------',
    },
    {
      field: "referee1", headerName: "Referee1", width: 120, headerClassName: "header", headerAlign: "center", align: "center",
      valueGetter: (params) => params.row.referee1 ? params.row.referee1 : '------',
    },
    { field: "referee2", headerName: "Referee2", width: 120, headerClassName: "header", headerAlign: "center", align: "center", valueGetter: (params) => params.row.referee2 ? params.row.referee2 : '------', },
    { field: "referee3", headerName: "Referee3", width: 120, headerClassName: "header", headerAlign: "center", align: "center", valueGetter: (params) => params.row.referee3 ? params.row.referee3 : '------', },
  ], [])

  const getMatch = async () => {
    setLoading(true)
    try {
      const { data } = await GetMatch()
      data && setMatch(data)
    }
    catch (e) {
      console.log("Something Went Wrong.", e);
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Match Management" />
      </Box>
      {
        loading ? <CircularProgress /> :
          <Stack style={{
            marginTop: "1%",
            display: "grid",
            height: "78vh",
          }}>
            {match && match.length > 0 ? (
              <DataGrid
                rows={match}
                columns={columns}
                getRowId={(row) => row.mid}
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

export default ProtectedRoute(MatchDetails, 'admin')
