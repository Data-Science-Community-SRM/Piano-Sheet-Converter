import React from 'react'

const Modal = (props) => {
  return (
    <>
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl glass text-white">
              {props.children}
          </div>
      </div>
    </>
  )
}

export default Modal