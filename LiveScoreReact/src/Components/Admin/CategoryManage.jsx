import { Box, CircularProgress, Stack, } from '@mui/material';
import { DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import AddCategory from './AddCategory';
import HeaderFormat from '../Common/HeaderFormat';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryApi } from '../../Redux/Action/AdminAction';
import { useMemo } from 'react';


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
      <AddCategory />
    </GridToolbarContainer>
  );
}


const CategoryManage = () => {
  
const dispatch = useDispatch()
const { categorydata } = useSelector(state => state.admin)

  const columns = useMemo(categorydata => [
    { field: "id", headerName: "Id", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "categoryName", headerName: "Name", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    { field: "categoryTime", headerName: "Time(Minutes)", width: 150, headerClassName: "header", headerAlign: "center", align: "center" },
    
  ])

  useEffect(() => {
    dispatch(getCategoryApi())
  }, [dispatch])


  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", }} >
        <HeaderFormat title="Category Management" />
      </Box>
      <Stack style={{
        marginTop: "1%",
        display: "grid",
         width: "90%",
        height: "50vh",

      }}>
        {categorydata && categorydata.length > 0 ? (
          <DataGrid
            rows={categorydata}
            columns={columns}
            getRowId={(row) => row.id}
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

export default CategoryManage
