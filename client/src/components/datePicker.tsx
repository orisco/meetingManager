import { FC, useContext } from 'react'
import { Box } from "@material-ui/core";
import Calendar from 'react-calendar'
import { DataContext } from '../utils/context';
import 'react-calendar/dist/Calendar.css';

const DatePicker: FC = () => {
  const {setDate} = useContext(DataContext)

  return (
    <Box height="450px">
      <Calendar className="react-calendar" onChange={(e: Date) => setDate(e)}/>
    </Box>
  )
}

export default DatePicker;