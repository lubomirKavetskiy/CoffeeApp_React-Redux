import React from 'react';

const Modal = ({ handleCloseModal, children }) => (
  <div className="modal">
    <section className="modal-content">
      {children}
      <button onClick={handleCloseModal}>close</button>
    </section>
  </div>
)

export default Modal;
