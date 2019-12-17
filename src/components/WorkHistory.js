import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(personId, startDate, endDate, roleID, departmentID, fName,lName, Gender, dateOfBirth, phoneNumber) {
  return { personId, startDate, endDate, roleID, departmentID, fName, lName, Gender, dateOfBirth, phoneNumber };
}

const headCells = [
  { id: 'personId', numeric: true, disablePadding: true, label: 'Person Id' },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' },
  { id: 'roleID', numeric: false, disablePadding: false, label: 'Role ID' },
  { id: 'departmentID', numeric: false, disablePadding: false, label: 'Department ID' },
  { id: 'fName', numeric: false, disablePadding: false, label: 'F Name' },
  { id: 'lName', numeric: false, disablePadding: false, label: 'L Name' },
  { id: 'Gender', numeric: false, disablePadding: false, label: 'Gender'  },
  { id: 'GendateOfBirthder', numeric: false, disablePadding: false, label: 'Date Of Birth'  },
  { id: 'phoneNumber', numeric: false, disablePadding: false, label: 'Phone Number'  }
];

class WorkHistory extends React.Component {

  state={
    rows: []
  }

  componentDidMount() {

    axios.get('http://localhost:4000/employeesJobHistory').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.Start_Date, elem.End_Date, elem.Role_ID, elem.Department_ID, elem.F_Name, elem.L_Name, elem.Gender, elem.Date_Of_Birth, elem.Phone_Number))
      })
      this.setState({
        rows: tempRows,
        empRes: res.data.data
      })
    }).catch(err => {
      console.log(err);
    })
    console.log(this.state.rows);
  }

  render() {
    return(
      <div id='workHistory'>
        {
          this.state.rows.length > 0 ? <TableLayout tableName='Job History' rows={this.state.rows} headCells={headCells}/> : <p>loading</p>
        }
      </div>
    )
  }
}

export default WorkHistory
