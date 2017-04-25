import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatContainer from './chat-container'
import NewMessage from './new-message'
import GroupHeader from './group-header'
import { getGroup } from '../../actions'
import Loader from '../Loader'

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getGroup(this.props.params.groupId)
  }

  render() {
    const { loading, group, user } = this.props
    return (
      <div>
        {
          loading ?
          <Loader/> :
          <div>
            <GroupHeader  groupId={this.props.params.groupId}/>
            <ChatContainer user={user} groupId={this.props.params.groupId}/>
            <NewMessage user={user} groupId={this.props.params.groupId}/>
          </div>
        }
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
    getGroup: bindActionCreators(getGroup, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Chat)
