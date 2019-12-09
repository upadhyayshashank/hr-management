import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField'
import 'date-fns';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const useStyles = makeStyles(theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    margin: 10,
    zIndex: 1
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 250
    },
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddEmp() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button className={classes.addButton} variant="outlined" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
        <DialogContent>
          <form className={classes.form} autoComplete="off">
            <TextField id="firstName" label="First Name" variant="outlined" />
            <TextField id="lastName" label="Last Name" variant="outlined" />
            <TextField id="phoneNumber" label="Phone Number" variant="outlined" />
            <TextField id="emailId" type='email' label="Email Id" variant="outlined" />
            <TextField id="dob" value={new Date()} type='date' label="DOB" variant="outlined" />
            <br/>
            <TextField multiline rows={3} fullWidth id="address" label="Address" variant="outlined" />
            <TextField id="gender" label="Gender" variant="outlined" />
            <TextField id="departmentName" label="Department Name" variant="outlined" />
            <TextField id="role" label="Role" variant="outlined" />
            <TextField id="hireDate" label="Hire Date" variant="outlined" />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
