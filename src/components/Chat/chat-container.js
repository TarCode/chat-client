import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getMessages } from '../../actions'
import Loader from '../Loader'
import io from 'socket.io-client'
import moment from 'moment'
const socketEndpoint = 'http://localhost:3000'

const MessagesComponent = ({ loadingMessages, messages, user }) => (
  <div className="chatContainer">
    {
      loadingMessages ?
      <Loader/> :
      (
        messages && messages.length > 0 ?
        (
          messages.sort((a, b) => ( new Date(a.timestamp) - new Date(b.timestamp))).map((m, i) => (
            <div key={i} className={user && user.email == m.user.email ? "message" : "message other"}>
              <div className="initials">{m.user.firstname[0] +  m.user.surname[0]}</div>
              <div className="text">
                <div>{m.message}</div>
                <div>{moment(m.timestamp).fromNow()}</div>
              </div>
            </div>
          ))
        ) :
        <h3>No messages yet</h3>
      )
    }

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
    const { messages, loadingMessages, user } = this.props
    return (
      <MessagesComponent user={user} loadingMessages={loadingMessages} messages={messages}/>
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
