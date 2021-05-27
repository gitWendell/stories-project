import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 32,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '5px',
    height: '100%',
    position: 'relative',
    width: '100%',
    margin: '35px 0 0 0',
  },
  overlay: {
    padding: '20px 20px 5px 20px'
  },
  overlay2: {
    position: 'absolute',
    right: '20px',
    top: '20px',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '-5px 20px 15px 20px',
  },
  title: {
    padding: '0 16px',
  },
  tag: {
    display: 'inline-block',
    borderLeft: '2px solid #f50057',
    color: '#f50057',
    padding: '5px 10px 5px 20px',
    marginRight: '10px',
    boxShadow: '0 3px 10px rgb(0 0 0 / 20%)',
  },
  cardActions: {
    padding: '20px 40px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  comments: {
    padding: '0 20px',
    marginBottom: '20px'
  },
  commentsList: {
    maxHeight: '220px',
    overflowX: 'auto',
    paddingRight: '5px',
    '&::-webkit-scrollbar': {
      width: '0.4em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.5)',
      borderRadius: '5px'
    },
  },
  comment: {
    backgroundColor: '#3a3b3c',
    padding: '10px',
    borderRadius: '5px',
    margin: '5px 0',
    color: '#e4e6eb',
    fontSize: '50px'
  },
  scroll: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  name: {
    fontWeight: '550',
    fontSize: '0.8rem'
  }
}); 