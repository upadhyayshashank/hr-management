import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(reviewer_Fname, reviewer_Lname, person_reviewed, review_date, reviewer_comments, rating_no) {
  return {reviewer_Fname, reviewer_Lname, person_reviewed, review_date, reviewer_comments, rating_no };
}

const headCells = [
  { id: 'reviewer_Fname', numeric: true, disablePadding: true, label: 'Reviewer Fname' },
  { id: 'reviewer_Lname', numeric: false, disablePadding: false, label: 'Reviewer Lname' },
  { id: 'person_reviewed', numeric: false, disablePadding: false, label: 'Person Reviewed' },
  { id: 'review_date', numeric: false, disablePadding: false, label: 'Review Date' },
  { id: 'reviewer_comments', numeric: false, disablePadding: false, label: 'Reviewer Comments' },
  { id: 'rating_no', numeric: false, disablePadding: false, label: 'Rating No' }

];

class PerformanceTable extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      rows: [],
      empRes: [],
      searchRes: []
    }
  }

  componentDidMount() {

    axios.get('http://localhost:4000/personreview').then(res => {
      let tempRows=[]
      res.data.data.map(elem => {
        tempRows.push(createData(elem.reviewer_Fname, elem.reviewer_Lname, elem.person_reviewed, elem.review_date, elem.reviewer_comments, elem.rating_no))
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

  getPerformance = (id) => {
    if(id.trim() === '') {
      this.setState({
        rows: []
      })
    } else {
      axios.get('http://localhost:4000/personreview/'+id).then(res => {
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
      <div id='performanceTable'>
        <TableLayout searchEmp={this.getPerformance} tableName='Performance Table' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>
      </div>
    )
  }
}

export default PerformanceTable
