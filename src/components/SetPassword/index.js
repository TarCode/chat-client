import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setPassword } from '../../actions'

class SetPassword extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: ""
    }
  }
  render() {
    const { setPassword } = this.props
    return (
      <table className="middle"><tbody>
        <tr><td>

      		<div className="loginContainer">

      			<div className="head">Set Password</div>

      			<div className="subhead">Enter a password below to log in</div>

      			<input onChange={(e) => {
              this.state.password = e.target.value
              this.setState(this.state)
            }} name="password" type="password" placeholder="Password" />

      			<div onClick={() => {
              const data = {
                email: this.props.location.query.email,
                password: this.state.password
              }
              setPassword(data)
            }} className="btn">Log In</div>

      		</div>

      	</td></tr>
      </tbody></table>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setPassword: bindActionCreators(setPassword, dispatch)
  }
}

export default connect(() => ({}), mapDispatchToProps)(SetPassword)
