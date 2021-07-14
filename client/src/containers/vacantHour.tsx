import React, {FC, useEffect, useState, useContext} from 'react'
import { Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import { DataContext, ErrorContext } from '../utils/context';
import { Meeting, PostMeeting } from '../types/types'
import { dateFormatter, availableHours, responseHandler } from '../utils/helpers'
import {  makeNewMeeting } from '../services/httpService';

type Props = {
  date: any
  hour: number
  meetings: Array<Meeting>
  setMeetingButton: React.Dispatch<React.SetStateAction<boolean>>
}

const VacantHour: FC <Props> = ({date, hour, meetings, setMeetingButton}: Props) => {
  const [meetingTime, setMeetingTime] = useState<number>(0)
  const [selectedManager, setSelectedManager] = useState<string>('')
  const [availableTime, setAvailableTime] = useState<number[] | undefined>()
  const { setUpdateId, managers } = useContext(DataContext)
  const { setError} = useContext(ErrorContext)
  

  const sendNewMeeting = () => {
    const body: PostMeeting = {
      date: dateFormatter(date),
      endTime: (hour + meetingTime - 1),
      startTime: hour,
      manager: selectedManager
    }
    if (!body.manager || meetingTime === 0) {
      setError({isError: true, message: "Please select a duration and a manager for meeting."})
      } else {
      responseHandler(makeNewMeeting(body), setUpdateId, setError)
    }
  }

  useEffect(() => {
      availableHours(meetings, hour).then((res) => setAvailableTime(res))
  }, [meetings, hour])

  return (
    <>
        <FormControl className="input">
          <InputLabel>Duration</InputLabel>
          <Select defaultValue="" onChange={(event: any): void => setMeetingTime(event.target.value)}>
            {availableTime && availableTime.map((time, i) => 
                <MenuItem key={i} value={i + 1}>{i + 1}</MenuItem>
              )}
          </Select>
        </FormControl>
        <FormControl className="input">
          <InputLabel>Manager</InputLabel>
          <Select defaultValue="" onChange={(e: any) => setSelectedManager(e.target.value)}>
            {managers.map((manager, i) => 
              <MenuItem key={i} value={manager._id}>{`${manager.firstName} ${manager.lastName}`}
              </MenuItem>
            )}
          </Select>  
        </FormControl>
        <Box borderLeft={1} paddingLeft={1} paddingY={1} className="center">
            <AddCircleIcon className="hover" onClick={() => sendNewMeeting()}/>
            <HighlightOffIcon className="hover" onClick={() => setMeetingButton(false)}/>
        </Box>       
    </>
  )
}


export default VacantHour;