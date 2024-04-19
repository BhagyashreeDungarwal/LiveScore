import { Box, CircularProgress, Stack } from '@mui/material'
import HeaderFormat from '../Common/HeaderFormat'
import AddAthelete from './AddAthelete'
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { getAtheleteApi } from '../../Redux/Action/CoordinatorAction';
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

const Athelete = () => {

  const dispatch = useDispatch()
  const { atheletedata } = useSelector(state => state.coordinator)

  const columns = useMemo(atheletedata => [
    { field: "imageUrl", headerName: "Avatar", width: 70, headerClassName: "header", headerAlign: "center", align: "center",
     renderCell: (params) => (
        <img src={params.value} alt="Avatar" style={{ width: 50, height: 50, borderRadius: '50%' }} />
      ), },
    { field: "athleteName", headerName: "Name", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "email", headerName: "Email", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contact", headerName: "Contact", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "dateOfBirth", headerName: "DateOFBirth", width: 110, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "gender", headerName: "Gender", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "height", headerName: "Height", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "weight", headerName: "Weight", width: 70, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "city", headerName: "City", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "state", headerName: "State", width: 100, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "categoryId", headerName: "Category", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coachId", headerName: "Coach", width: 80, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coordinater", headerName: "Coordinater", width: 100, headerClassName: "header", headerAlign: "center", align: "center" }

  ])

  useEffect(() => {
    dispatch(getAtheleteApi())
  }, [dispatch])


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Athelete Management" />
      </Box>
      <Stack style={{
        marginTop: "1%",
        display: "grid",
        // width: "100%",
        height: "80vh",

      }}>
        {atheletedata && atheletedata.length > 0 ? (
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
          />) : <CircularProgress />
        }
      </Stack>
    </Box>
  )
}


export default Athelete
