import React from 'react'
import { connect } from 'react-redux'
import { getMembers } from '../../actions'
import { bindActionCreators } from 'redux'
import ChatContainer from './chat-container'
import NewMessage from './new-message'
import GroupHeader from './group-header'

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // this.props.getMembers(this.props.params.groupId)
  }

  render() {
    const { loadingMembers, loading, group } = this.props
    return (
      <div>
        {
          loadingMembers ?
          <p>Loading...</p> :
          <div>
            <GroupHeader groupId={this.props.params.groupId}/>

            <ChatContainer groupId={this.props.params.groupId}/>
            <NewMessage groupId={this.props.params.groupId}/>
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
