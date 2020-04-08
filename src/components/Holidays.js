import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(LocationID, HolidayName, Holiday_Date) {
  return { LocationID, HolidayName, Holiday_Date};
}

const headCells = [
  { id: 'locationID', numeric: true, disablePadding: true, label: 'Location ID' },
  { id: 'holidayName', numeric: false, disablePadding: false, label: 'Holiday Name' },
  { id: 'holiday_Date', numeric: false, disablePadding: false, label: 'Holiday_Date' }

];

class Holidays extends React.Component {

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
        tempRows.push(createData(elem.Location_ID, elem.Holiday_Name, elem.Holiday_Date,))
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
      <div id='holidays'>
        <TableLayout searchEmp={this.searchEmp} tableName='Holidays' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default Holidays
