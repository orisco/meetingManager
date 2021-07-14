import { FC } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

// import HourSchedule from '../containers/hourSchedule';
import DailyHourSchedule from '../containers/dailyHourSchedule'
import { Meeting } from '../types/types';
import { workingHours } from '../utils/helpers'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: '600px',
    backgroundColor: theme.palette.background.paper,
  },
}));

type Props = {
  meetings: Array<Meeting>
}

const DailySchedule: FC<Props> = ({meetings}: Props) => {
  const classes = useStyles();

  return (
      <List className={classes.root}>
        {workingHours.map((hour, key) =>  <DailyHourSchedule key={key} hour={hour} meetings={meetings}/>
        )}   
      </List>
  )
}

export default DailySchedule;