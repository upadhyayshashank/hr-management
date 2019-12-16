import React from 'react';
import PropTypes from 'prop-types'
import axios from 'axios'

import TableLayout from './TableLayout'

function createData(EquipmentID, EquipmentName, PersonID, EquipmentStatus) {
  return { EquipmentID, EquipmentName, PersonID, EquipmentStatus};
}

const headCells = [
  { id: 'equipmentID', numeric: true, disablePadding: true, label: 'Equipment Id' },
  { id: 'equipmentName', numeric: false, disablePadding: false, label: 'Equipment Name' },
  { id: 'personID', numeric: false, disablePadding: false, label: 'Person ID' },
  { id: 'equipmentStatus', numeric: false, disablePadding: false, label: 'Equipment Status' }

];

class EquipmentTable extends React.Component {

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
        tempRows.push(createData(elem.Equipment_ID, elem.Equipment_Name, elem.Person_ID, elem.Equipment_Status))
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
      let selectedEmp = this.state.rows.find(elem => {return elem.PersonID == event.target.value})
      if(selectedEmp != undefined) this.setState({
        searchRes: [selectedEmp],
        rows: []
      })
      console.log(this.state.rows, selectedEmp);
    } else {
      let tempRows=[]
      this.state.empRes.map(elem => {
        tempRows.push(createData(elem.Equipment_ID, elem.Equipment_Name, elem.Person_ID, elem.Equipment_Status))
      })
      this.setState({
        rows: tempRows,
        searchRes: []
      })
    }
  }


  render() {
    return(
      <div id='equipmentTable'>

        <TableLayout searchEmp={this.searchEmp} tableName='Equipment Table' rows={this.state.searchRes.length > 0 ? this.state.searchRes : this.state.rows} headCells={headCells}/>

      </div>
    )
  }
}

export default EquipmentTable
