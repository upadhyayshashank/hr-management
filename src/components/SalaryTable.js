import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(Person_ID, Annual_Salary, Benifits, Rating_No,Final_Salary) {
  return { Person_ID, Annual_Salary, Benifits, Rating_No, Final_Salary};
}

const headCells = [
  { id: 'Person_ID', numeric: true, disablePadding: true, label: 'Person ID' },
  { id: 'Annual_Salary', numeric: false, disablePadding: false, label: 'Monthly Salary' },
  { id: 'Benefits', numeric: false, disablePadding: false, label: 'Benifits' },
  { id: 'Rating_No', numeric: false, disablePadding: false, label: 'Rating No' },
  { id: 'Final_Salary', numeric: true, disablePadding: false, label: 'Final Salary' },

];

class SalaryTable extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      rows: [],
      empRes: [],
      searchRes: []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:4000/personSalary').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.Annual_Salary, elem.Benefits, elem.Rating_No, elem.Final_Salary))
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

  getSalary = (personId) => {

    if(personId.trim() === '') {
      this.setState({
        rows: []
      })
    } else {
      axios.get('http://localhost:4000/personSalary/'+personId).then(res => {
        this.setState({
          rows: res.data.data[1]
        })
      }).catch(err => {
        console.log(err);
      })
    }
  }


  render() {
    return(
      <div id='salaryTable'>
        <TableLayout getSalary={this.getSalary} tableName='Salary Table' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default SalaryTable
