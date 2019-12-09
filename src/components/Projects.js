import React from 'react';
import PropTypes from 'prop-types'

import TableLayout from './TableLayout'

function createData(projectId, projectName, departmentId, projectstartDate, projectendDate) {
  return { projectId, projectName, departmentId, projectstartDate, projectendDate };
}

const headCells = [
  { id: 'projectId', numeric: true, disablePadding: true, label: 'Project Id' },
  { id: 'projectName', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'departmentId', numeric: true, disablePadding: false, label: 'Department Id' },
  { id: 'projectstartDate', numeric: false, disablePadding: false, label: 'Project Start Date' },
  { id: 'projectendDate', numeric: false, disablePadding: false, label: 'Project End Date' },
];

class Projects extends React.Component {

  state={
    rows: []
  }

  componentDidMount() {
    this.setState({
      rows: [
        createData(1, 'SQL', 123, '15th February', '18th November'),
        createData(2, 'SQL', 124, '11th February', '19th November'),
        createData(3, 'SQL', 125, '13th February', '11th November'),
        createData(4, 'SQL', 126, '19th February', '13th November'),
        createData(5, 'SQL', 127, '12th February', '15th November'),
        createData(6, 'SQL', 128, '15th February', '16th November'),
        createData(7, 'SQL', 129, '18th February', '19th November'),

      ]
    })
    console.log(this.state.rows);
  }

  render() {
    return(
      <div id='projectTable'>
        {
          this.state.rows.length > 0 ? <TableLayout tableName='Projects' rows={this.state.rows} headCells={headCells}/> : <p>loading</p>
        }
      </div>
    )
  }
}

export default Projects
