import React from 'react'
import { bindActionCreators } from 'redux'
import { getGroup, postUpdateGroup, uploadImg, changeGroupName, getUsers } from '../../actions'
import { connect } from 'react-redux'
import Loader from '../Loader'
import Members from './members'

class EditGroup extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      addMember: false,
      email: "",
      img_url: props.group && props.group.img_url || "",
      members: props.members
    }
  }

  componentDidMount() {
    this.props.getUsers()
  }
  render() {
    const { user, users, group, loading, submit, uploadImg, loading_img, changeGroupName } = this.props
    const email = user && user.email
    return (
      <div>
        {
          loading ?
          <Loader/> :
          <div className='settingsContainer'>
            {
              loading_img ?
              <Loader/> :
              <div style={ group && group.img_url && group.img_url.length > 0 ? {background: `url(${group && group.img_url})`, backgroundSize: 'cover'} : null} className='profilePicture'>
                <input onChange={(e) => {
                  console.log('this is the file', e.target);
                  let reader = new FileReader();
                   let file = e.target.files[0];

                   reader.onloadend = () => {
                     this.state.img_url = {
                       file: file,
                       imagePreviewUrl: reader.result
                     }
                     uploadImg(file, group.groupName)
                     this.setState(this.state);
                   }
                   reader.readAsDataURL(file)
                }} type="file"/>
              </div>
            }
            {
              group && group.groupName ?
              <input value={group && group.groupName} onChange={(e) => {
                changeGroupName(e.target.value)
              }} type='text' placeholder="Group Name"/> :
              <Loader/>
            }
            <Members users={users} />
            <div>
              <div onClick={() => {
                console.log('save group', group);
                submit(group, email )
              }} className='save btn'>Save Group</div>
            </div>
          </div>
        }
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  const { loading_img, group, loading } = state.group
  const { users } = state.users
  const { user } = state.user
  return {
    group,
    loading,
    loading_img,
    users,
    user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
    changeGroupName: bindActionCreators(changeGroupName, dispatch),
    getGroup: bindActionCreators(getGroup, dispatch),
    submit: bindActionCreators(postUpdateGroup, dispatch),
    uploadImg: bindActionCreators(uploadImg, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup)
