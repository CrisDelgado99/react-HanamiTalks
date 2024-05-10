import React from 'react'

export default function LoginSwitch({switchClicked, handleClick}) {

  return (
    <div className={switchClicked ? 'switch switch--active' : 'switch'} onClick={handleClick}>
      <div className='switch__handle'>

      </div>
    </div>
  )
}
