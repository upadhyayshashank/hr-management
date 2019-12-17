import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(f_name, l_name, application_id, education, experience, position_id) {
  return { position_id, f_name, l_name, application_id, education, experience, position_id };
}

const headCells = [

  { id: 'f_name', numeric: false, disablePadding: false, label: 'First Name' },
  { id: 'l_name', numeric: false, disablePadding: false, label: 'Last Name' },
  { id: 'application_id', numeric: false, disablePadding: false, label: 'Application ID' },
  { id: 'education', numeric: false, disablePadding: false, label: 'Education' },
  { id: 'experience', numeric: false, disablePadding: false, label: 'Experience' },
  { id: 'positionId', numeric: true, disablePadding: true, label: 'Position ID' },
  { id: '', numeric: false, disablePadding: false, label: ''  },
  { id: '', numeric: false, disablePadding: false, label: ''  }
];

class Jobapplication extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      rows: [],
      empRes: [],
      searchRes: []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:4000/viewapplicants').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.F_Name, elem.L_Name, elem.Application_ID, elem.Education, elem.Experience, elem.Position_ID))
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

  getInfo = (id) => {

    if(id.trim() === '') {
      this.setState({
        rows: []
      })
    } else {
      axios.get('http://localhost:4000/viewapplicants/'+id).then(res => {
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
      <div id='JobApplication'>
        <TableLayout getInfo={this.getInfo} tableName='Job Application' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default Jobapplication
