import React from 'react'

export default () => (
  <div className='settingsContainer'>
    <div className='profilePicture'>
      <input type="file"/>
    </div>
    <input type='text' name='name' placeholder="Group Name"/>

    <div className='members'>
      <table>
        <thead>
          <tr>
            <th>Member</th>
            <th>Admin</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Member Name</td>
            <td><input type="checkbox"/></td>
          </tr>
          <tr>
            <td>Another Member</td>
            <td><input type="checkbox"/></td>
          </tr>
          <tr>
            <td>Yet Another Member</td>
            <td><input type="checkbox"/></td>
          </tr>
        </tbody>
      </table>
      <div className='add'>Add Member</div>
    </div>
    <div>
      <div className='save btn'>Save Group</div>
    </div>
  </div>
)
