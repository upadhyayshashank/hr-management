import React from 'react';
import PropTypes from 'prop-types'
import AddEmp from './AddEmp'
import TableLayout from './TableLayout'

function createData(personId, firstName, lastName, emailID, phoneNumber,dob,departmentId,employeeAddress,gender,role,hireDate,reportingpersonId,projectID) {
  return { personId, firstName, lastName, emailID, phoneNumber,dob,departmentId,employeeAddress,gender,role,hireDate,reportingpersonId,projectID };
}

const headCells = [
  { id: 'personId', numeric: true, disablePadding: true, label: 'Person Id' },
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'emailId', numeric: false, disablePadding: false, label: 'Email Id' },
  { id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone Number' },
  { id: 'dob', numeric: true, disablePadding: false, label: 'DOB' },
  { id: 'departmentId', numeric: true, disablePadding: false, label: 'Department Id' },
  { id: 'employeeAddress', numeric: false, disablePadding: false, label: 'Employee Address' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
  { id: 'role', numeric: true, disablePadding: false, label: 'Role Id' },
  { id: 'hireDate', numeric: false, disablePadding: false, label: 'Hire Date' },
  { id: 'reportingpersonId', numeric: true, disablePadding: false, label: 'Reporting Person Id' },
  { id: 'projectId', numeric: true, disablePadding: false, label: 'Project Id' },
  {id: '', numeric: false, disablePadding: false, label: ''}
];

class Employees extends React.Component {

  state={
    rows: []
  }

  addEmpButton = () => {
    return AddEmp
  }

  componentDidMount() {
    this.setState({
      rows: [
        createData(1, 'shekhar', 'bhattacharya', 'asdfsaf@sd.df', 12312312312, '15th February 1993', 121, 'mannheim', 'male', 'manager', '15th December 2018', 3, 55),
        createData(2, 'shashank', 'upadhyay', 'asdfsaf@sd.df', 12312312312, '15th February 1993', 121, 'mannheim', 'male', 'manager', '15th December 2018', 3, 55)
      ]
    })
    console.log(this.state.rows);
  }

  render() {
    return(
      <div id='employeeTable'>
        <AddEmp/>
        {
          this.state.rows.length > 0 ? <TableLayout tableName='Employees' rows={this.state.rows} headCells={headCells}/> : <p>loading...</p>
        }
      </div>
    )
  }
}

export default Employees
