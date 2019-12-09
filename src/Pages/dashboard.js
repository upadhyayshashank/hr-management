import React from 'react';
import Proptypes from 'prop-types'
import EmpDash from '../components/EmpDash';
import HrDash from '../components/HrDash';
import Header from '../components/AppBar'

class Dashboard extends React.Component {
  render() {
    return(
      <Header>
        <HrDash/>
      </Header>
    )
  }
}

export default Dashboard
