import React from 'react'
import Proptypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Projects from './Projects'
import Employees from './Employees'
import LeaveRequest from './LeaveRequest'
const styles = theme => ({
  container: {

  }
})

class HrDash extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.container}>
        <Projects/>

        <Employees/>

        <LeaveRequest/>
      </div>
    )
  }
}

HrDash.propTypes = {
  classes: Proptypes.object.isRequired
}

export default withStyles(styles)(HrDash)
