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
import Grid from '@material-ui/core/Grid'
import 'date-fns';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {withStyles} from '@material-ui/core/styles'
import axios from 'axios'
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import 'date-fns';


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    right: 270,
    marginTop: 25,
    zIndex: 1
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      minWidth: 250
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AddEmp extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      open: false,
      firstName: '',
      lastName: '',
      personId: '',
      phoneNumber: '',
      email: '',
      dob: '',
      address: '',
      hireDate: '',
      personType: '',
      gender: ''
    }
  }
  handleClickOpen = () => {
    this.setState({open: true})
  };
  handleClose = () => {
    this.setState({open: false})
  };

  handleDateChange = date => {
      this.setState({dob: new Date(date)})
    };

  addEmp = () => {
    const {firstName, lastName, phoneNumber, dob, email, hireDate, personType, gender, address} = this.state
    if(firstName === '' || lastName == '' || address == '' || email == '') {
      this.setState({error: 'Fields must not be empty'})
    } else {
      axios.post('http://localhost:4000/employeesInsert', {
        firstName, lastName, phoneNumber, address, dob, email, gender, personType, hireDate
      }).then(res => {
        let personId = 0
        this.props.addEmp({personId, firstName, gender, hireDate, personType, dob, lastName, phoneNumber, address, email})
        this.setState({open: false})
      }).catch(err => {
        console.log(err);
      })
    }
  }

  render() {
    const {classes} = this.props
    return (
    <div>
      <Button className={classes.addButton} variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Add
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Employee</DialogTitle>
        <DialogContent>
         <form className={classes.form} onSubmit={this.addEmp} autoComplete="off">
          <TextField value={this.state.firstName} onChange={(event) => {this.setState({firstName: event.target.value})}} name='firstName' id="firstName" label="First Name" variant="outlined" />
          <TextField value={this.state.lastName} onChange={(event) => {this.setState({lastName: event.target.value})}} id="lastName" label="Last Name" variant="outlined" />
          <TextField value={this.state.phoneNumber} onChange={(event) => {this.setState({phoneNumber: event.target.value})}} id="phoneNumber" label="Phone Number" variant="outlined" />
          <TextField value={this.state.email} onChange={(event) => {this.setState({email: event.target.value})}} id="emailId" type='email' label="Email Id" variant="outlined" />
          <TextField value={this.state.dob} onChange={(event) => {this.setState({dob: event.target.value})}} id="emailId" label="DOB" variant="outlined" />
          <TextField value={this.state.hireDate} onChange={(event) => {this.setState({hireDate: event.target.value})}}  label="Hire Date" variant="outlined" />
          <TextField value={this.state.gender} onChange={(event) => {this.setState({gender: event.target.value})}}  label="Gender" variant="outlined" />
          <TextField value={this.state.personType} onChange={(event) => {this.setState({personType: event.target.value})}} label="Person Type" variant="outlined" />
          <br/>
          <TextField value={this.state.address} onChange={(event) => {this.setState({address: event.target.value})}} multiline rows={3} fullWidth id="address" label="Address" variant="outlined" />
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button type='submit' onClick={this.addEmp} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}
export default withStyles(styles)(AddEmp)
