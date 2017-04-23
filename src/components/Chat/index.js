import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { getGroup } from '../../actions'
import { bindActionCreators } from 'redux'

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {

  }

  render() {
    const { loading, group } = this.props
    return (
      <div>
        <div className="chatInfo">
          <div onClick={() => {
            browserHistory.push('/edit-group/'+ this.props.params.groupId)
          }} className="editGroup">SETTINGS</div>
          <div className="chatName">{
            loading ?
            "Loading..." :
            group && group.groupName
          }</div>
        </div>

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

          <div className="message other">
            <div className="initials">SJ</div>
            <div className="text">
              <div>This is a test message. This is a test message. This is a test message. This is a test message.</div>
              <div>11:05</div>
            </div>
          </div>

          <div className="message">
            <div className="initials">JB</div>
            <div className="text">
              <div>This is a test message. This is a test message. This is a test message. This is a test message.</div>
              <div>11:05</div>
            </div>
          </div>

        </div>

        <div className="newMessage">

          <textarea placeholder="Type your message here..."></textarea>

          <div className="indicator">

            <div>
              <div className="eyes">
                <div></div>
                <div></div>
              </div>
              <div className="mouth"></div>
            </div>

          </div>

          <div className="send">Send</div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  const { group, loading } = state.group
  return {
    group,
    loading
  }
}

export default connect(mapStateToProps)(Chat)
