import { FC, useState, useEffect, useContext} from "react";
import { Box } from "@material-ui/core";
import Header from '../components/header'
import DatePicker from '../components/datePicker'
import DailySchedule from "../components/dailySchedule";
import EditManagers from "../containers/editManagers"
import ErrorAlert from "../components/errorAlert"
import { DataContext, ErrorContext } from "../utils/context";
import { getAllManagers, getMeetingForTheDay } from "../services/httpService"
import { Manager, Meeting } from "../types/types";
import { responseHandler } from "../utils/helpers";


const HomePage: FC = () => {
  const [date, setDate] = useState<Object>(new Date());
  const [updateId, setUpdateId] = useState<string>("")
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [managers, setManagers] = useState<Manager[]>([])
  const { error, setError } = useContext(ErrorContext)

   
  useEffect(() => {
    responseHandler(getMeetingForTheDay(date), setMeetings, setError)
    responseHandler(getAllManagers(), setManagers, setError)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date, updateId])


  return (
    <Box className="wrapper">
      <Header/>
      <Box className="screenSplit">
      <DataContext.Provider value={{date, setDate, updateId, setUpdateId, managers, setManagers}}>
        <Box className="contentWrapper">
          <DatePicker/>
          <EditManagers/>
        </Box>
        <Box className="contentWrapper">
          <DailySchedule meetings={meetings}/>
        </Box>
        </DataContext.Provider>
      </Box>
      {error.isError && error.message && <ErrorAlert msg={error.message}/>}
    </Box>
  )
}

export default HomePage;