import React from 'react';
import PropTypes from 'prop-types'
import AddEmp from './AddEmp'
import TableLayout from './TableLayout'
import axios from 'axios'

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

  constructor(props) {
    super(props)
    this.state={
      rows: [],
      empRes: [],
      searchRes: []
    }
    this.searchEmp = this.searchEmp.bind(this)
  }

  addEmpButton = () => {
    return AddEmp
  }

  componentDidMount() {

    axios.get('http://localhost:4000/employees').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.F_Name, elem.L_Name, elem.Email, elem.Phone_Number, elem.Date_Of_Birth, elem.Department_ID, elem.Employee_Address, elem.Gender, elem.Role_ID, elem.Hire_Date, elem.Reporting_Person_ID, elem.Project_ID, elem.Person_Type))
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

  searchEmp = (event) => {
    console.log('search: ', event.target.value);
    if(event.target.value.length > 0) {
      let selectedEmp = this.state.rows.find(elem => {return elem.personId == event.target.value})
      if(selectedEmp != undefined) this.setState({
        searchRes: [selectedEmp],
        rows: []
      })
      console.log(this.state.rows, selectedEmp);
    } else {
      let tempRows=[]
      this.state.empRes.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.F_Name, elem.L_Name, elem.Email, elem.Phone_Number, elem.Date_Of_Birth, elem.Department_ID, elem.Employee_Address, elem.Gender, elem.Role_ID, elem.Hire_Date, elem.Reporting_Person_ID, elem.Project_ID, elem.Person_Type))
      })
      this.setState({
        rows: tempRows,
        searchRes: []
      })
    }
  }

  deleteEmp = (empId) => {
    axios.delete('http://localhost:4000/employees/'+empId).then(res => {
      let tempRows = this.state.rows.filter(elem => {
        return elem.personId != empId
      })
      this.setState({
        rows: tempRows
      })
    }).catch(err => {
      console.log(err);
    })
  }

  updatedEmp = (body) => {
    let index = this.state.rows.findIndex(elem => {
      return elem.personId == body.personId
    })
    let updatedList = this.state.rows
    updatedList[index] = body
    this.setState({
      rows: updatedList
    })
  }

  render() {
    return(
      <div id='employeeTable'>
        <AddEmp/>
        <TableLayout updateEmp={this.updateEmp} deleteEmp={this.deleteEmp} searchEmp={this.searchEmp} tableName='Employees' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default Employees
