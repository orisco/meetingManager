import { FC } from 'react'
import { Meeting } from '../types/types'

import { Box, Typography } from '@material-ui/core';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

type Props = {
  occupied: Meeting;
  hour: number;
  deleteMeeting: (arg0: string) => void;
}

const OccupiedHour: FC <Props> = ({deleteMeeting, occupied, hour}: Props) => {

  return (
    <>
    {occupied.endTime === hour &&  
      <Box className="occupied">
        <Box borderRight={1} p={1}>
          <Typography>{`${occupied.endTime - occupied.startTime + 1} hour meeting`}</Typography>
        </Box>

        <Box borderRight={1} p={1}>
          <Typography>{`${occupied.manager.firstName} ${occupied.manager.lastName}`}</Typography>
        </Box>
    
        <Box paddingLeft={2} className="center">
            <HighlightOffIcon className="hover" onClick={() => deleteMeeting(occupied?._id)}/>
        </Box>   
    </Box>
    }
    </>
  )

}

export default OccupiedHour;