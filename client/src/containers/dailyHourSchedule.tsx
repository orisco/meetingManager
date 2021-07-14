import { FC, useState, useEffect, useContext } from 'react'
import { Box, ListItem, ListItemText, Divider } from '@material-ui/core';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import IconButton from '@material-ui/core/IconButton';
import { Meeting } from '../types/types';

import OccupiedHour from '../components/occupiedHour'
import { DataContext, ErrorContext } from '../utils/context';
import { deleteAMeeting } from '../services/httpService';
import VacantHour from './vacantHour';
import { occupancyIdentifier, responseHandler } from '../utils/helpers';

type Props = {
  hour: number
  meetings: Array<Meeting>
}

const DailyHourSchedule: FC <Props> = ({hour, meetings}: Props) => {
  const [meetingButton, setMeetingButton] = useState<boolean>(false)
  const [occupied, setOccupied] = useState<Meeting | undefined>()
  const { date, updateId, setUpdateId } = useContext(DataContext)
  const {setError} = useContext(ErrorContext)

  const deleteMeeting = (meeting: string | undefined) => {
    meeting && responseHandler(deleteAMeeting(meeting),setUpdateId, setError)
  }

  useEffect(() => {
    setMeetingButton(false)
    occupancyIdentifier(meetings, hour).then((res) => 
    setOccupied(res))
  },[updateId, date, meetings, hour])

  return (
    <>
        <ListItem className="hour" style={occupied && {backgroundColor: `#${occupied.color}`}} >
            <ListItemText primary={`${hour}:00`}/>
            <Box className="rowCenter">
              { meetingButton ? <VacantHour date={date} hour={hour} meetings={meetings} setMeetingButton={setMeetingButton}/> :
              occupied ? <OccupiedHour occupied={occupied} hour={hour} deleteMeeting={deleteMeeting}/> : <Box className="hide" onClick={() => setMeetingButton(true)}><IconButton><LibraryAddIcon/></IconButton></Box>
              }
            </Box>
        </ListItem>
        <Divider />
    </>
    
      )
}

export default DailyHourSchedule;