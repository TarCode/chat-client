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
    return (
      <div>
        <div className='chats'>
          <div className='head'>
            <div>Groups</div>
            <div onClick={() => { browserHistory.push('/edit-group') } } className='addGroup'>+</div>
          </div>

          <div className='chat active'>
            <div className='picture'></div>
            <div className='name'>Group 1</div>
          </div>

          <div className='chat'>
            <div className='picture'></div>
            <div className='name'>Group 2</div>
          </div>

          <div className='chat'>
            <div className='picture'></div>
            <div className='name'>Group 3</div>
          </div>
        </div>

        <div className='content'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.users
  return {
    user
  }
}

export default connect(mapStateToProps, {})(Base)
