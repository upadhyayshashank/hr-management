import React from 'react'
import Proptypes from 'prop-types'
import {withStyles} from '@material-ui/core/styles'
import Projects from './Projects'

const styles = theme => ({
  container: {

  }
})

class EmpDash extends React.Component {
  render() {
    const {classes} = this.props
    return (
      <div className={classes.container}>
        <Projects/>

      </div>
    )
  }
}

EmpDash.propTypes = {
  classes: Proptypes.object.isRequired
}

export default withStyles(styles)(EmpDash)
