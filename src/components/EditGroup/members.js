import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Loader from '../Loader'
import { addGroupMember, removeGroupMember, setGroupAdmin } from '../../actions'

const Memberbody = ({ loading, group, removeGroupMember, setGroupAdmin }) => (
  <tbody>
    {
      loading ?
      <tr><td>Loading...</td></tr> :
      (
        group && group.members && group.members.length > 0 ?
        group.members.map((i, index) => (
          <tr key={index}>
            <td onClick={() => {
              if(group.members.length > 1) {
                removeGroupMember(index)
              } else {
                swal({
                  type: 'error',
                  html: 'Cannot delete last member'
                })
              }
            }}>{i.email}</td>
            <td><input checked={i.isAdmin} onChange={() => {
              if(group.members.length === 1) {
                if(i.isAdmin) {
                  swal({
                    type: 'error',
                    html: 'Must have at least 1 group admin'
                  })
                } else {
                  setGroupAdmin(index)
                }
              } else {
                setGroupAdmin(index)
              }
            }} type="checkbox"/></td>
          </tr>
        )) :
        <tr><td>No members</td></tr>
      )
    }
  </tbody>
)
class Members extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addMember: false,
      email: ""
    }
  }
  render() {
    const { addGroupMember, setGroupAdmin, removeGroupMember, loading, group, users } = this.props
    return (
      <div className='members'>
        <table>
          <thead>
            <tr>
              <th>Member</th>
              <th>Admin</th>
            </tr>
          </thead>
          <Memberbody setGroupAdmin={setGroupAdmin} loading={loading} removeGroupMember={removeGroupMember} group={group}/>
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
              if(group.members.length === 1 && group.members[0].isAdmin === false) {
                swal({
                  html: 'User not found',
                  type: 'error'
                })
              } else {
                if(letAdd) {
                  addGroupMember(memberToAdd)
                  this.state.email = ""
                  this.state.addMember = false
                  this.setState(this.state)
                } else {
                  swal({
                    html: 'Must have at least 1 group admin',
                    type: 'error'
                  })
                }
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

function mapStateToProps(state) {
  const { group } = state.group
  return {
    group
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addGroupMember: bindActionCreators(addGroupMember, dispatch),
    removeGroupMember: bindActionCreators(removeGroupMember, dispatch),
    setGroupAdmin: bindActionCreators(setGroupAdmin, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Members)
