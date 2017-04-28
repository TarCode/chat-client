import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { browserHistory } from 'react-router'
import { getGroup } from '../../actions'

let GroupHeader = ({ group, loading, groups, groupId }) => (
  <div className="chatInfo">
    <div onClick={() => {
      browserHistory.push('/edit-group/'+ group._id)
    }} className="editGroup">SETTINGS</div>
    <div className="chatName">{
      loading ?
      "Loading..." :
      group && group.groupName
    }</div>
  </div>
)

class GroupHeaderContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { groups, groupId, loading, group } = this.props
    return (
      <GroupHeader group={group} loading={loading} groupId={groupId} groups={groups}/>
    )
  }
}
function mapStateToProps(state) {
  const { groups } = state.groups
  const { group } = state.group
  return {
    groups,
    group
  }
}

export default connect(mapStateToProps)(GroupHeaderContainer)
