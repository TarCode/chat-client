import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'

let GroupHeader = ({ group, loading, groups, groupId }) => (
  <div className="chatInfo">
    <div onClick={() => {
      browserHistory.push('/edit-group/'+ groupId)
    }} className="editGroup">SETTINGS</div>
    <div className="chatName">{
      loading ?
      "Loading..." :
      groups && groups.length > 0 && groups.filter(g => g._id === groupId)[0].groupName || group && group.groupName
    }</div>
  </div>
)

class GroupHeaderContainer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { groups, groupId, loading } = this.props
    return (
      <GroupHeader loading={loading} groupId={groupId} groups={groups}/>
    )
  }
}
function mapStateToProps(state) {
  const { groups } = state.groups
  const { group } = state.group
  return {
    groups
  }
}

export default connect(mapStateToProps)(GroupHeaderContainer)
