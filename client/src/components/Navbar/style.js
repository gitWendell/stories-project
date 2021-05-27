import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 0,
    marginBottom: '30px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 50px',
    backgroundColor: '#1a1a1d',
  },
  heading: {
    color: 'white',
    textDecoration: 'none',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '350px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '350px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    border: '2px solid white'
  },
  buttton: {
    margin: theme.spacing(1),
  },
  [theme.breakpoints.down('sm')]: {
    appBar: {
      flexDirection: 'column',
    },toolbar: {
      justifyContent: 'center',
    },
  },
}));
