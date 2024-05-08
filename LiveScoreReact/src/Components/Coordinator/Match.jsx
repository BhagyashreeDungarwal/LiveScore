import { Box, CircularProgress, Stack } from "@mui/material"
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import NoData from "./../Images/NoData.jpg"
import HeaderFormat from "../Common/HeaderFormat";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearMessage } from "../../Redux/Reducer/CoordinatorReducer";
import { GetMatchApi, getAtheleteApi } from "../../Redux/Action/CoordinatorAction";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import AddMatch from "./AddMatch";
import { getCategoryApi, getTounamentApi } from "../../Redux/Action/AdminAction";

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
      <AddMatch />
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

const Match = () => {

  const dispatch = useDispatch()
  const {  matchdata, loading, data, error } = useSelector(state => state.coordinator)

  useEffect(() => {
    dispatch(GetMatchApi())
  }, [dispatch])

  useEffect(() => {
    dispatch(getAtheleteApi())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCategoryApi())
  }, [dispatch])

  useEffect(() => {
    dispatch(getTounamentApi())
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


  const columns = useMemo(matchdata => [
    { field: "tournament", headerName: "Tournament", width: 120, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchType", headerName: "Match Type", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchStatus", headerName: "Match Status", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchDate", headerName: "Match Date", width: 100, headerClassName: "header", headerAlign: "center", align: "center", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------" },
    { field: "matchTime", headerName: "Match Time", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "category", headerName: "Category", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "numberOfRound", headerName: "No. Of Round", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "athleteRed", headerName: "Athlete Red", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "athleteBlue", headerName: "Athlete Blue", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
  ])

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
            height: "70vh",
          }}>
            {
              matchdata && matchdata.length > 0 ? (
                <DataGrid
                  rows={matchdata}
                  columns={columns}
                  getRowId={(row) => row.id}
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

export default Match
