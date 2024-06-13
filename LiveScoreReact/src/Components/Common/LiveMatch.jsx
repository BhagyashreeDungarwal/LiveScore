import { Box, Typography } from "@mui/material"
import { useParams } from "react-router-dom"


const LiveMatch = () => {
  const {mid,matchGroup} = useParams()
  return (
    <Box>
      <Typography variant="h4" color="initial">{matchGroup}</Typography>
    </Box>
  )
}

export default LiveMatch
