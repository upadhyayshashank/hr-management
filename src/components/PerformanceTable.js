import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(firstName, lastName, personId, reviewDate, reviewerComments, ratingNo) {
  return {firstName, lastName, personId, reviewDate, reviewerComments, ratingNo };
}

const headCells = [
  { id: 'firstName', numeric: true, disablePadding: true, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'personId', numeric: false, disablePadding: false, label: 'Person ID' },
  { id: 'reviewDate', numeric: false, disablePadding: false, label: 'Review Date' },
  { id: 'reviewerComments', numeric: false, disablePadding: false, label: 'Reviewer Comments' },
  { id: 'ratingNo', numeric: false, disablePadding: false, label: 'Rating No' }

];

class PerformanceTable extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      rows: [],
      empRes: [],
      searchRes: []
    }
    this.searchEmp = this.searchEmp.bind(this)
  }

  componentDidMount() {

    axios.get('http://localhost:4000/personreview').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.F_Name, elem.L_Name, elem.Person_ID, elem.Review_Date, elem.Reviewer_Comments, elem.Rating_No))
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

  render() {
    return(
      <div id='performanceTable'>
        <TableLayout searchEmp={this.searchEmp} tableName='Performance Table' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default PerformanceTable
