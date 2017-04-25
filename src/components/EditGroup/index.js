import React from 'react'
import { bindActionCreators } from 'redux'
import { getMembers, getGroup, updateGroup, uploadImg, changeGroupName, getUsers } from '../../actions'
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
    const { group, users, loading, submit, uploadImg, loading_img, changeGroupName } = this.props
    return (
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
        <Members members={group && group.members}/>
        <div>
          <div onClick={() => {
            // submit({
            //   groupName: this.state.groupName,
            //   members: this.state.members,
            // })
          }} className='save btn'>Save Group</div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {
  const { loading_img, group } = state.group
  return {
    group,
    loading_img
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getUsers: bindActionCreators(getUsers, dispatch),
    changeGroupName: bindActionCreators(changeGroupName, dispatch),
    getGroup: bindActionCreators(getGroup, dispatch),
    submit: bindActionCreators(updateGroup, dispatch),
    uploadImg: bindActionCreators(uploadImg, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditGroup)
