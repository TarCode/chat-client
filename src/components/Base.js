import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addGroup } from '../actions'

class Base extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('props from base', this.props);
    if(!this.props.user) {
      browserHistory.push('/login')
    }
  }
  render() {
    const { groups, addGroup, selectedIndex } = this.props
    console.log('selected index from base', this.props.params);
    const selectIndex = this.props.params.groupId
    return (
      <div>
        <div className='chats'>
          <div className='head'>
            <div>Groups</div>
            <div onClick={() => {
              addGroup()
             } } className='addGroup'>+</div>
          </div>
          {
            groups && groups.length > 0 ?
            groups.map((g, index) => (
              <div onClick={() => {
                browserHistory.push('/chat/' + index)
              }} key={index} className={index === parseInt(selectIndex) ? 'chat active' : 'chat'}>
                <div className='picture'></div>
                <div className='name'>{g.groupName}</div>
              </div>
            )) :
            <div className='chat'>
              <div className='name'>No Groups</div>
            </div>
          }
        </div>

        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.user
  const { groups, selectedIndex } = state.groups
  return {
    user,
    groups,
    selectedIndex
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addGroup: bindActionCreators(addGroup, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
