import React from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

class Chat extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { group, groupIndex } = this.props
    return (
      <div>
        <div className="chatInfo">
          <div onClick={() => {
            browserHistory.push('/edit-group/'+ groupIndex)
          }} className="editGroup">SETTINGS</div>
          <div className="chatName">{group.groupName}</div>
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
  const { groups } = state.groups
  return {
    group: groups[ownProps.params.groupId],
    groupIndex: ownProps.params.groupId
  }
}

export default connect(mapStateToProps, {})(Chat)
