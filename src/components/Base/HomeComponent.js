import React from 'react'
import Loader from '../Loader'

export default () => (
  <div>
    <div className='chats'>
      <div className='head'>
        <div>Groups</div>
        <div className='addGroup'>+</div>
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

    </div>
  </div>
)
