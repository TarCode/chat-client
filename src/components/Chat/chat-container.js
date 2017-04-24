import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const MessagesComponent = ({ messages }) => (
  <div className="chatContainer">
    <div className="message">
      <div className="initials">JB</div>
      <div className="text">
        <div>This is a test message. This is a test message. This is a test message. This is a test message.</div>
        <div>11:05</div>
      </div>
    </div>

    <div className="message other">
      <div className="initials">SJ</div>
      <div className="text">
        <div>This is a test message. This is a test message. This is a test message. This is a test message.</div>
        <div>11:05</div>
      </div>
    </div>
  </div>
)
class MessagesContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { messages } = this.props
    return (
      <MessagesComponent messages={messages}/>
    )
  }
}

function mapStateToProps(state) {

  return {

  }
}

function mapDispatchToProps(dispatch) {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
