import React from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addGroup, getGroups, getUsers } from '../actions'
import Loader from './Loader'

class Base extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('props from base', this.props);
    if(!this.props.user) {
      browserHistory.push('/login')
    } else {
      this.props.getGroups()
    }
  }
  render() {
    const { user, groups, addGroup, loading } = this.props
    console.log('selected index from base', this.props.params);
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
                browserHistory.push('/chat/' + index)
              }} key={index} className={index === parseInt(selectIndex) ? 'chat active' : 'chat'}>
                <div className='picture'></div>
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
    getGroups: bindActionCreators(getGroups, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Base)
