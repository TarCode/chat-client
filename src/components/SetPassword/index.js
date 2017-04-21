import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { setPassword } from '../../actions'

let SetPassword = ({ handleSubmit }) => (
  <table className="middle"><tbody>
    <tr><td>

  		<div className="loginContainer">

  			<div className="head">Set Password</div>

  			<div className="subhead">Enter a password below to log in</div>

  			<Field component="input" name="password" type="password" placeholder="Password" />

  			<div onClick={handleSubmit} className="btn">Log In</div>

  		</div>

  	</td></tr>
  </tbody></table>
)

export default reduxForm({
  form: "password",
  onSubmit: (values, dispatch, ownProps) => {
    const { email } = ownProps.location.query
    values['email'] = email
    dispatch(setPassword(values))
  }
})(SetPassword)
