import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(personId, monthlySalary, benifits, ratingNo) {
  return { personId, monthlySalary, benifits, ratingNo};
}

const headCells = [
  { id: 'personId', numeric: true, disablePadding: true, label: 'Person ID' },
  { id: 'monthlySalary', numeric: false, disablePadding: false, label: 'Monthly Salary' },
  { id: 'benifits', numeric: false, disablePadding: false, label: 'Benifits' },
  { id: 'ratingNo', numeric: false, disablePadding: false, label: 'Rating No' },

];

class SalaryTable extends React.Component {

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

    axios.get('http://localhost:4000/employees').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.Monthly_Salary, elem.Benifits, elem.Rating_No))
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
        tempRows.push(createData(elem.Person_ID, elem.Monthly_Salary, elem.Benifits, elem.Rating_No))
      })
      this.setState({
        rows: tempRows,
        searchRes: []
      })
    }
  }


  render() {
    return(
      <div id='salaryTable'>
        <TableLayout searchEmp={this.searchEmp} tableName='Salary Table' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default SalaryTable
