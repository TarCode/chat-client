import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { postMessage, checkSentiment } from '../../actions'

class NewMessageContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: ""
    }
  }

  render() {
    const { checkSentiment, loadingSentiment, sentiment, postMessage, postingMessage, groupId, user } = this.props
    return (
      <div className="newMessage">

        <textarea value={this.state.message} onChange={(e) => {
          this.state.message = e.target.value
          console.log('something', loadingSentiment);
          if(this.state.message.length > 2 && !loadingSentiment) {
            checkSentiment(this.state.message)
          }
          this.setState(this.state)
        }} placeholder="Type your message here..."></textarea>

        <div className={sentiment && sentiment.sentiment == 'Negative' && sentiment.confidence > 79 ? "indicator negative" : (sentiment && sentiment.sentiment == 'Positive' ? "indicator positive" : "indicator")}>

          <div>
            <div className="eyes">
              <div></div>
              <div></div>
            </div>
            <div className="mouth"></div>
          </div>

        </div>

        <div onClick={() => {
          const message = {
            user,
            message: this.state.message,
            timestamp: new Date(),
            groupId
          }
          if(sentiment && sentiment.confidence > 79) {
            swal({
              title: 'Are you sure?',
              text: 'We have detected that your message is potentially negative',
              showCancelButton: true
            })
            .then(result => {
              console.log('result from check message', result);
              if(result) {
                postMessage(message)
                this.state.message = ""
                this.setState(this.state)
              }
            })
            .catch(err => {
              console.log('cancelled');
            })
          } else {
            console.log('message from message', message);
            postMessage(message)
            this.state.message = ""
            this.setState(this.state)
          }
        }} className={!loadingSentiment && this.state.message.length > 0 ? "send active" : "send"}>Send</div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  const { postingMessage, loadingSentiment, sentiment } = state.message
  return {
    loadingSentiment,
    sentiment,
    postingMessage
  }
}

function mapDispatchToProps(dispatch) {
  return {
    postMessage: bindActionCreators(postMessage, dispatch),
    checkSentiment: bindActionCreators(checkSentiment, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageContainer)
