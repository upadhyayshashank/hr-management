import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

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

    axios.get('http://localhost:4000/employees').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.Project_ID, elem.Project_Name, elem.Department_ID, elem.Project_Start_Date, elem.Project_End_Date))
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
