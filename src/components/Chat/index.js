import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatContainer from './chat-container'
import NewMessage from './new-message'
import GroupHeader from './group-header'

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { loading, group, user } = this.props
    return (
      <div>
        <GroupHeader  groupId={this.props.params.groupId}/>
        <ChatContainer user={user} groupId={this.props.params.groupId}/>
        <NewMessage user={user} groupId={this.props.params.groupId}/>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { group, loading } = state.group
  const { user } = state.user
  return {
    user,
    group,
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
