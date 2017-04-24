import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getMembers } from '../../actions'
import { bindActionCreators } from 'redux'
import ChatContainer from './chat-container'
import NewMessage from './new-message'

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getMembers(this.props.params.groupId)
  }

  render() {
    const { loadingMembers, loading, group } = this.props
    return (
      <div>
        {
          loadingMembers ?
          <p>Loading...</p> :
          <div>
            <div className="chatInfo">
              <div onClick={() => {
                browserHistory.push('/edit-group/'+ this.props.params.groupId)
              }} className="editGroup">SETTINGS</div>
              <div className="chatName">{
                loading ?
                "Loading..." :
                group && group.groupName
              }</div>
            </div>

            <ChatContainer/>
            <NewMessage/>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { group, loading } = state.group
  const { members } = state.members
  return {
    group,
    loading,
    members,
    loadingMembers: state.members && state.members.loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMembers: bindActionCreators(getMembers, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
