import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(personId, totalLeaves, LeaveAvailed, pendingLeaves) {
  return { personId, totalLeaves, LeaveAvailed, pendingLeaves};
}

const headCells = [
  { id: 'personId', numeric: true, disablePadding: true, label: 'Person Id' },
  { id: 'totalLeaves', numeric: false, disablePadding: false, label: 'Total Leaves' },
  { id: 'LeaveAvailed', numeric: false, disablePadding: false, label: 'Leaves Availed' },
  //{ id: 'salaryDeduction', numeric: false, disablePadding: false, label: 'Salary Deduction' },
  { id: 'pendingLeaves', numeric: false, disablePadding: false, label: 'Pending Leaves' }

];

class LeaveRequest extends React.Component {

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

    axios.get('http://localhost:4000/employeesLeaves').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.Total_Leaves, elem.Leaves_Availed, elem.Pending_Leaves))
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
    console.log('search: ', event);
  }



  render() {
    return(
      <div id='leaveTable'>
        <TableLayout searchEmp={this.searchEmp} tableName='Leaves' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default LeaveRequest
