import { Box, CircularProgress, IconButton, Stack, Tooltip } from '@mui/material'
import HeaderFormat from '../Common/HeaderFormat'
import AddAthelete from './AddAthelete'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import NoData from "./../Images/NoData.jpg"
import { useEffect, useMemo } from 'react';
import { GetCoachApi, getAtheleteApi } from '../../Redux/Action/CoordinatorAction';
import { toast } from 'react-toastify';
import { getCategoryApi } from '../../Redux/Action/AdminAction';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { DriveFileRenameOutline, DriveFileRenameOutlineRounded } from '@mui/icons-material';
import Modal from '../Common/Modal';
// import { useState } from 'react';

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
      <AddAthelete />
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
      <Box sx={{ mt: 0 }}>No Athlete Added</Box>
    </div>
  );
}

const Athelete = () => {

  const dispatch = useDispatch()
  const { atheletedata, loading, data, error } = useSelector(state => state.coordinator)

  const columns = useMemo(atheletedata => [
    {
      field: "imageUrl", headerName: "Avatar", width: 70, headerClassName: "header", headerAlign: "center", align: "center",
      renderCell: (params) => (
        <Link to={`/coordinator/editatheletepic/${params.row.id}`}><img src={params.value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} /></Link>
      ),
    },

    { field: "athleteName", headerName: "Name", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "email", headerName: "Email", width: 190, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contact", headerName: "Contact", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "dateOfBirth", headerName: "DateOFBirth", width: 105, headerClassName: "header", headerAlign: "center", align: "center", valueFormatter: (params) => params.value ? dayjs(params.value).format('DD/MM/YYYY') : "------" },
    { field: "age", headerName: "Age", width: 50, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "gender", headerName: "Gender", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "city", headerName: "City", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "state", headerName: "State", width: 100, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "categoryName", headerName: "Category", width: 80, headerClassName: "header", headerAlign: "center", align: "center", },
    { field: "coachName", headerName: "Coach", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coordinater", headerName: "Coordinater", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    {
      headerName: "Action", width: 100, headerClassName: "header", headerAlign: "center", align: "center", renderCell: params => {
        return (
          <Box>
            <Tooltip title="Edit">
              <Link to={`/coordinator/editathelete/${params.row.id}`} >
                <IconButton aria-label="Edit" color='primary'>
                  <DriveFileRenameOutlineRounded />
                </IconButton>
              </Link>

              {/* <Modal id={params.row.id} /> */}
            </Tooltip>
          </Box>
        )
      }
    },

  ])

  useEffect(() => {
    dispatch(getAtheleteApi())
  }, [dispatch])

  useEffect(() => {
    dispatch(getCategoryApi())
  }, [dispatch])

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
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Athelete Management" />
      </Box>
      {
        loading ? <CircularProgress /> :
          <Stack style={{
            marginTop: "1%",
            display: "grid",
            // width: "100%",
            height: "80vh",

          }}>
            {
              atheletedata && atheletedata.length > 0 ? (
                <DataGrid
                  rows={atheletedata}
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


export default Athelete
