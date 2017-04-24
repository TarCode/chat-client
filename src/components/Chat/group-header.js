import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getGroup } from '../../actions'
import { browserHistory } from 'react-router'

let GroupHeader = ({ loading, group, groupId}) => (
  <div className="chatInfo">
    <div onClick={() => {
      browserHistory.push('/edit-group/'+ groupId)
    }} className="editGroup">SETTINGS</div>
    <div className="chatName">{
      loading ?
      "Loading..." :
      group && group.filter(g => g._id === groupId)[0].groupName
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
      <GroupHeader loading={loading} groupId={groupId} group={groups}/>
    )
  }
}
function mapStateToProps(state) {
  const { groups } = state.groups
  return {
    groups
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getGroup: bindActionCreators(getGroup, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupHeaderContainer)
