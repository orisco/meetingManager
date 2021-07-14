import {FC, useContext} from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { ErrorContext } from '../utils/context';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      position: 'absolute',
      bottom: 0,
    },
  }),
);

type Props = {
  msg: string
}

const ErrorAlert: FC<Props> = ({msg}: Props) => {
  const classes = useStyles();
  const {setError} = useContext(ErrorContext)

  return (
    <div className={classes.root}>
      <Alert onClose={() => setError({isError: false})} severity="error">{msg}</Alert>
    </div>
  );
}

export default ErrorAlert;