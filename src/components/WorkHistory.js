import React from 'react';
import PropTypes from 'prop-types'

import TableLayout from './TableLayout'

function createData(personId, firstName, lastName, startDate, endDate, reason, leaveStatus) {
  return { personId, firstName, lastName, startDate, endDate, reason, leaveStatus };
}

const headCells = [
  { id: 'personId', numeric: true, disablePadding: true, label: 'Person Id' },
  { id: 'firstName', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'lastName', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' },
  { id: 'reason', numeric: false, disablePadding: false, label: 'Reason' },
  { id: 'leaveStatus', numeric: false, disablePadding: false, label: 'Leave Status' },
  { id: '', numeric: false, disablePadding: false, label: ''  },
  { id: '', numeric: false, disablePadding: false, label: ''  }
];

class WorkHistory extends React.Component {

  state={
    rows: []
  }

  componentDidMount() {
    this.setState({
      rows: [
        createData(1, 'shashank', 'Upadhyay', '15th February', '19th February', 'Personal work', 'Pending'),
        createData(2, 'Yu', 'Wu', '15th February', '19th February', 'Personal work', 'Pending'),
        createData(3, 'Juili', 'pot', '15th February', '19th February', 'Personal work', 'Pending'),
        createData(4, 'Sheetal', 'xyxz', '15th February', '19th February', 'Personal work', 'Pending'),
      ]
    })
    console.log(this.state.rows);
  }

  render() {
    return(
      <div id='workHistory'>
        {
          this.state.rows.length > 0 ? <TableLayout tableName='Work History' rows={this.state.rows} headCells={headCells}/> : <p>loading</p>
        }
      </div>
    )
  }
}

export default WorkHistory
