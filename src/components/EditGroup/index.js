import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { bindActionCreators } from 'redux'
import { getUsers, getGroup, updateGroup, uploadImg } from '../../actions'
import { connect } from 'react-redux'
import Loader from '../Loader'

class EditGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addMember: false,
      email: "",
      img_url: props.group.img_url || "",
      groupName: props.group.groupName,
      members: []
    }
  }
  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    const { group, users, loading, submit, uploadImg, loading_img } = this.props
    return (
      <div className='settingsContainer'>
        {
          loading_img ?
          <Loader/> :
          <div style={ this.state.img_url && this.state.img_url.length > 0 ? {background: `url(${this.state.img_url && this.state.img_url})`, backgroundSize: 'cover'} : null} className='profilePicture'>
            <input onChange={(e) => {
              console.log('this is the file', e.target);
              let reader = new FileReader();
               let file = e.target.files[0];

               reader.onloadend = () => {
                 this.state.img_url = {
                   file: file,
                   imagePreviewUrl: reader.result
                 }
                 uploadImg(file, this.state.groupName)
                 this.setState(this.state);
               }
               reader.readAsDataURL(file)
            }} type="file"/>
          </div>
        }
        <input value={this.state.groupName} onChange={(e) => {
          this.state.groupName = e.target.value
          this.setState(this.state)
        }} type='text' name='name' placeholder="Group Name"/>

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
                  this.state.members && this.state.members.length > 0 ?
                  this.state.members.map((i, index) => (
                    <tr key={index}>
                      <td>{i.firstname + ' ' + i.surname}</td>
                      <td><input value={this.state.members[index].isAdmin} onClick={() => {
                        this.state.members[index]["isAdmin"] = !this.state.members[index]["isAdmin"]
                        this.setState(this.state)
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
                users && users.length > 0 ?
                users.map(u => {
                  if(this.state.email === u.email) {
                    letAdd = true
                    memberToAdd = u
                  }
                }) :
                swal({
                  title: 'Error!',
                  text: 'User not found',
                  type: 'error',
                  confirmButtonText: 'Okay'
                })
                if(letAdd) {
                  this.state.members.push(memberToAdd)
                  this.state.email = ""
                  this.state.addMember = false
                  this.setState(this.state)
                } else {
                  swal({
                    title: 'Error!',
                    text: 'Please enter a valid email',
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
        <div>
          <div onClick={() => {
            // submit({
            //   groupName: this.state.groupName,
            //   members: this.state.members,
            //   groupIndex: this.props.groupIndex || null
            // })
          }} className='save btn'>Save Group</div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  const { users, loading } = state.users
  const { loading_img, group } = state.group
  return {
    users,
    group,
    loading_img,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
    getGroup: bindActionCreators(getGroup, dispatch),
    submit: bindActionCreators(updateGroup, dispatch),
    uploadImg: bindActionCreators(uploadImg, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup)
