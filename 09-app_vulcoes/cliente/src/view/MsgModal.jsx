// @flow

import * as React from 'react'

type Props = {
  msg: string | void
}

const MsgModal = (props: Props) => {
  if (props.msg === undefined) return null
  return (
    <div className='modal is-active'>
      <div className='modal-background'></div>
      <div className='modal-content'>
        <div className='notification is-info'>
          {props.msg}
        </div>
      </div>
    </div>

  )
}

export default MsgModal
