import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../actions'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: ""
    }
  }
  render() {
    const { login } = this.props
    return (
      <table className="middle">
        <tbody>
          <tr><td>

        		<div className="loginContainer">

        			<div className="head">Log In</div>

        			<input onChange={(e) => {
                this.state.email = e.target.value
                this.setState(this.state)
              }} name="email" type="email" placeholder="Email" />
        			<input onChange={(e) => {
                this.state.password = e.target.value
                this.setState(this.state)
              }} name="password" type="password" placeholder="Password" />

        			<div onClick={() => {
                if(!this.state.email || this.state && this.state.email && this.state.email.length < 3) {
                  swal({
                    title: 'Error!',
                    text: 'Please enter a valid email',
                    type: 'error',
                    confirmButtonText: 'Okay'
                  })
                } else {
                  login(this.state)
                }
              }} className="btn">Log In</div>

        		</div>

        	</td></tr>
        </tbody>
      </table>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: bindActionCreators(login, dispatch)
  }
}

export default connect(() => ({}), mapDispatchToProps)(Login)
