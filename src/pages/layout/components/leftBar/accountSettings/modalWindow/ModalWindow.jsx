import './style.scss'
function ModalWindow({children, toggleModal}) {
  return (
    <div className="modal-window">
      <div className="modal-window__background" onClick={toggleModal}></div>
      <div className="modal-window__body">{children}</div>
    </div>
  );
}

export default ModalWindow;
