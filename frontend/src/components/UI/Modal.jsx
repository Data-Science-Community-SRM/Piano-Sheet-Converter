import React from 'react'

const Modal = (props) => {
  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
          <div className="modal-box relative w-11/12 max-w-5xl glass text-white">
            <label htmlFor="my-modal-3" className="btn btn-sm glass text-white absolute right-2 top-2">✕</label>
            {props.children}
          </div>
      </div>
    </>
  )
}

export default Modal