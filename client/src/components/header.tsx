import { Box, Typography } from '@material-ui/core'
import { FC } from 'react'

const Header: FC = () => {
  
  return (
    <Box className="header">
      <Typography variant="h4">Meeting Room Scheduler</Typography>
    </Box>
  )
}

export default Header;