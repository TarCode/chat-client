import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'

class Base extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.user) {
      browserHistory.push('/login')
    }
  }
  render() {
    const { groups } = this.props
    return (
      <div>
        <div className='chats'>
          <div className='head'>
            <div>Groups</div>
            <div onClick={() => { browserHistory.push('/edit-group') } } className='addGroup'>+</div>
          </div>
          {
            groups && groups.length > 0 ?
            groups.map((g, index) => (
              <div key={index} className='chat'>
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
  const { groups } = state.groups
  return {
    user,
    groups
  }
}

export default connect(mapStateToProps, {})(Base)
