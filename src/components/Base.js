import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addGroup, getGroups, getUsers, getMessages } from '../actions'
import Loader from './Loader'

class Base extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.user) {
      browserHistory.push('/login')
    } else {
      this.props.getGroups(this.props.user.email)
    }
  }
  render() {
    const { user, groups, getMessages, addGroup, loading } = this.props
    const selectIndex = this.props.params.groupId
    return (
      <div>
        <div className='chats'>
          <div className='head'>
            <div>Groups</div>
            <div onClick={() => {
              swal({
                title: 'Add Group Name',
                input: 'text',
                showCancelButton: true,
                inputValidator: value => {
                  return new Promise((resolve, reject) => {
                    if (value) {
                      resolve()
                    } else {
                      reject('You need to write something!')
                    }
                  })
                }
              }).then(result => {
                addGroup(result, user)
              })
             } } className='addGroup'>+</div>
          </div>
          {
            loading ?
            <Loader/> :
            (groups && groups.length > 0 ?
            groups.map((g, index) => (
              <div onClick={() => {
                getMessages(g._id)
                browserHistory.push('/chat/' + g._id)
              }} key={index} className={g._id === selectIndex ? 'chat active' : 'chat'}>
                <div style={ g.img_url ? {background: `url(${g.img_url})`, backgroundSize: 'cover'} : null } className='picture'></div>
                <div className='name'>{g.groupName}</div>
              </div>
            )) :
            <div className='chat'>
              <div className='name'>No Groups</div>
            </div>)
          }
        </div>

        {
          loading ?
          <Loader/> :
          <div className='content'>
            {this.props.children}
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { user } = state.user
  const { groups, loading } = state.groups
  return {
    user,
    groups,
    loading
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addGroup: bindActionCreators(addGroup, dispatch),
    getGroups: bindActionCreators(getGroups, dispatch),
    getMessages: bindActionCreators(getMessages, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
