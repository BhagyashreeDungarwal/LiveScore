import { Box, CircularProgress, Fab, Stack, Tooltip } from "@mui/material"
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from "@mui/x-data-grid";
import NoData from "./../Images/NoData.jpg"
import HeaderFormat from "../Common/HeaderFormat";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect, useMemo } from "react";
import dayjs from "dayjs";
import AddMatch from "./AddMatch";
import { DriveFileRenameOutlineRounded, HowToReg } from "@mui/icons-material";
import { useState } from "react";
import { GetMatch } from "../Apis/Coordinator";
import { clearMessage } from "../../Redux/CoordinatorRedux";
import { Link } from "react-router-dom";

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

  const [match, setMatch] = useState()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const { data, error } = useSelector(state => state.coordinator)

  useEffect(() => {
    getMatch()
  }, [])

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


  const columns = useMemo(() => [
    { field: "matchGroup", headerName: "Id", width: 30, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "tournament", headerName: "Tournament", width: 145, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchType", headerName: "Match Type", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    // { field: "matchStatus", headerName: "Match Status", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "matchDate", headerName: "Match Date", width: 100, headerClassName: "header", headerAlign: "center", align: "center", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------" },
    { field: "category", headerName: "Category", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    // { field: "numberOfRound", headerName: "Rounds", width: 50, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "athleteRed", headerName: "Athlete Red", width: 110, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "athleteBlue", headerName: "Athlete Blue", width: 110, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "matchCoordinator", headerName: "Coordinator", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "referee1", headerName: "Referee 1", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "referee2", headerName: "Referee 2", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "referee3", headerName: "Referee 3", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
    {
      headerName: "Action", width: 200, headerClassName: "header", headerAlign: "center", align: "center", renderCell: params => {
        return (
          <Box>
            <Tooltip title="Edit">
              <Fab variant="extended" size="small" color="warning" sx={{ fontSize: '0.75rem', mr: 1 }}>
                <DriveFileRenameOutlineRounded size="small" sx={{ mr: "1px" }} /> Edit
              </Fab>
            </Tooltip>
            <Tooltip title="Assign Referee and Coordinator">
              <Link to={`/coordinator/assignMatch/${params.row.mid}`} >
                <Fab variant="extended" size="small" color="success" sx={{ fontSize: '0.75rem' }}>
                  <HowToReg size="small" sx={{ mr: "1px" }} /> Assign
                </Fab>
              </Link>
            </Tooltip>
          </Box>
        )
      }
    }
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

  useEffect(() => {
    getMatch()
    if (data) {
      toast.success(data.msg)
      dispatch((clearMessage()))
    }
    if (error) {
      toast.error(error.msg)
      dispatch((clearMessage()))
    }
  }, [data, error])

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

export default Match
