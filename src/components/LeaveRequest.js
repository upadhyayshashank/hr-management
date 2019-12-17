import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(personId, numberofDays, startDate, endDate, reason, totalLeaves, leavesAvailed,leaveStaus) {
  return { personId, numberofDays, startDate, endDate, reason, totalLeaves, leavesAvailed, leaveStaus};
}

const headCells = [
  { id: 'personId', numeric: true, disablePadding: true, label: 'Person Id' },
  { id: 'numberofDays', numeric: false, disablePadding: false, label: 'Number Of Days' },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' },
  { id: 'reason', numeric: false, disablePadding: false, label: 'Reason' },
  { id: 'reason', numeric: false, disablePadding: false, label: 'Total Leaves' },
  { id: 'totalLeaves', numeric: false, disablePadding: false, label: 'Leaves Availed' },
  { id: 'leaveStaus', numeric: false, disablePadding: false, label: 'Leave Status'  },
  { id: '', numeric: false, disablePadding: false, label: ''  }
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

    axios.get('http://localhost:4000/employeesHoliday').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.Person_ID, elem.Number_Of_Days, elem.Start_Date, elem.Start_Date, elem.End_Date, elem.Reason, elem.Total_Leave, elem.Leaves_Availed, elem.Leave_Status))
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
        tempRows.push(createData(elem.Person_ID, elem.Number_Of_Days, elem.Start_Date, elem.Start_Date, elem.End_Date, elem.Reason, elem.Total_Leave, elem.Leaves_Availed, elem.Leave_Status))
      })
      this.setState({
        rows: tempRows,
        searchRes: []
      })
    }
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
