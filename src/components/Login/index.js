import React from 'react'
import { Field, reduxForm } from 'redux-form'

const Login = ({ handleSubmit }) => (
  <table className="middle">
    <tbody>
      <tr><td>

    		<div className="loginContainer">

    			<div className="head">Log In</div>

    			<Field component="input" name="email" type="email" placeholder="Email" />
    			<Field component="input" name="password" type="password" placeholder="Password" />

    			<div onClick={handleSubmit} className="btn">Log In</div>

    		</div>

    	</td></tr>
    </tbody>
  </table>
)

export default reduxForm({
  form: 'Login',
  onSubmit: (values, dispatch, ownProps) => {
    console.log('login values', values);
    if(!values.email || values && values.email && values.email.length < 3) {
      swal({
        title: 'Error!',
        text: 'Please enter a valid email',
        type: 'error',
        confirmButtonText: 'Okay'
      })
    }
  }
})(Login)
