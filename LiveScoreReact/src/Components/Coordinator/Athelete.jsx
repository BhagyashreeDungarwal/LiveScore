import { Box, Stack } from '@mui/material'
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
    { field: "imageUrl", headerName: "Avatar", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "athleteName", headerName: "Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "email", headerName: "Email", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "contact", headerName: "Contact", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "dateOfBirth", headerName: "DateOFBirth", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "gender", headerName: "Department", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "height", headerName: "Address", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "weight", headerName: "Department", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "city", headerName: "Address", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "state", headerName: "state", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "categoryId", headerName: "categoryId", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coachId", headerName: "coachId", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "coordinater", headerName: "coordinater", width: 150, headerClassName: "header", headerAlign: "center", align: "center" }

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
            rowHeight={37}
            rowSelection="true"
            rowSpacingType='margin'
            slots={{ toolbar: CustomToolbar }}
            scrollbarSize={1}
            columnHeaderHeight={37}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />) : (<h1>error</h1>)
        }
      </Stack>
    </Box>
  )
}

export default Athelete
