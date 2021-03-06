import React from 'react';
import PropTypes from 'prop-types'
import AddEmp from './AddEmp'
import TableLayout from './TableLayout'
import axios from 'axios'

function createData(personId, firstName, lastName, emailID, phoneNumber,dob,employeeAddress,gender,hireDate) {
  return { personId, firstName, lastName, emailID, phoneNumber,dob,employeeAddress,gender,hireDate};
}

const headCells = [
  { id: 'personId', numeric: true, disablePadding: true, label: 'Person Id' },
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'emailId', numeric: false, disablePadding: false, label: 'Email Id' },
  { id: 'phoneNumber', numeric: true, disablePadding: false, label: 'Phone Number' },
  { id: 'dob', numeric: true, disablePadding: false, label: 'DOB' },
  { id: 'employeeAddress', numeric: false, disablePadding: false, label: 'Employee Address' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
  { id: 'hireDate', numeric: false, disablePadding: false, label: 'Hire Date' },
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
        tempRows.push(createData(elem.Person_ID, elem.F_Name, elem.L_Name, elem.Email, elem.Phone_Number, elem.Date_Of_Birth, elem.Employee_Address, elem.Gender, elem.Hire_Date, elem.Person_Type))
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

  searchEmp = (id) => {
    if(id.length > 0) {
      let selectedEmp = this.state.rows.find(elem => {return elem.personId == id})
      if(selectedEmp != undefined) this.setState({
        searchRes: [selectedEmp],
        rows: []
      })
      console.log(this.state.rows, selectedEmp);
    } else {
      let tempRows=[]
      this.state.empRes.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.F_Name, elem.L_Name, elem.Email, elem.Phone_Number, elem.Date_Of_Birth, elem.Employee_Address, elem.Gender, elem.Hire_Date,elem.Person_Type))
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

  updateEmp = (body) => {
    let index = this.state.rows.findIndex(elem => {
      return elem.personId == body.personId
    })
    let updatedList = this.state.rows
    updatedList[index] = body
    console.log(updatedList[index]);
    this.setState({
      rows: updatedList
    })
  }

  addEmp = (body) => {
    let tempRow = this.state.rows
    tempRow.push(body)
    this.setState({
      rows: tempRow
    })
    console.log(tempRow);
  }

  render() {
    return(
      <div id='employeeTable'>
        <AddEmp addEmp={this.addEmp}/>
        <TableLayout updateEmp={this.updateEmp} deleteEmp={this.deleteEmp} searchEmp={this.searchEmp} tableName='Person' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default Employees
