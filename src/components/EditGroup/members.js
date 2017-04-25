import React from 'react'
import { bindActionCreators } from 'redux'
import { getMembers, addMember } from '../../actions'
import { connect } from 'react-redux'
import Loader from '../Loader'

export default class Members extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addMember: false,
      email: ""
    }
  }
  render() {
    const { loading, members, users } = this.props
    return (
      <div className='members'>
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Admin</th>
            </tr>
          </thead>
          <tbody>
            {
              loading ?
              <tr><td>Loading...</td></tr> :
              (
                members && members.length > 0 ?
                members.map((i, index) => (
                  <tr key={index}>
                    <td>{i.email}</td>
                    <td><input checked={members[index].isAdmin} onChange={() => {
                      members[index]["isAdmin"] = !members[index]["isAdmin"]
                    }} type="checkbox"/></td>
                  </tr>
                )) :
                <tr><td>No members</td></tr>
              )
            }
          </tbody>
        </table>
        {
          this.state.addMember ?
          <div>
            <input value={this.state.email} onChange={(e) => {
              this.state.email = e.target.value
              this.setState(this.state)
            }}/>
            <div onClick={() => {
              let letAdd = false
              let memberToAdd = null
              users && users.length > 0 &&
              users.map(u => {
                if(this.state.email === u.email) {
                  letAdd = true
                  memberToAdd = u
                }
              })
              if(letAdd) {
                addMember(memberToAdd)
                this.state.email = ""
                this.state.addMember = false
                this.setState(this.state)
              } else {
                swal({
                  title: 'Error!',
                  text: 'User not found',
                  type: 'error',
                  confirmButtonText: 'Okay'
                })
              }
            }} className='save btn'>Add</div>
          </div> :
          null
        }
        {
          this.state.addMember ?
          <div onClick={() => {
            this.state.addMember = false
            this.setState(this.state)
          }} className='add'>Cancel</div> :
          <div onClick={() => {
            this.state.addMember = true
            this.setState(this.state)
          }} className='add'>Add Member</div>
        }
      </div>
    )
  }
}
