import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMessages } from '../../actions'
import Loader from '../Loader'
import io from 'socket.io-client'
const socketEndpoint = 'http://localhost:3000'
const MessagesComponent = ({ loadingMessages, messages }) => (
  <div className="chatContainer">
    {
      loadingMessages ?
      <Loader/> :
      (
        messages && messages.length > 0 ?
        (
          messages.map((m, i) => (
            <div key={i} className="message">
              <div className="initials">JB</div>
              <div className="text">
                <div>{m.message}</div>
                <div>11:05</div>
              </div>
            </div>
          ))
        ) :
        <h3>No messages yet</h3>
      )
    }

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

  componentDidMount() {
    const { getMessages } = this.props
    getMessages(this.props.groupId)
    const socket = io.connect(`${socketEndpoint}/messages`)
    socket.on('receive', () => {
      getMessages(this.props.groupId)
    })
  }

  render() {
    const { messages, loadingMessages } = this.props
    return (
      <MessagesComponent loadingMessages={loadingMessages} messages={messages}/>
    )
  }
}

function mapStateToProps(state) {
  const { messages, loadingMessages } = state.messages
  return {
    loadingMessages,
    messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getMessages: bindActionCreators(getMessages, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesContainer)
