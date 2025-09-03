import { type RefObject } from "react";
import Login from "./Login";

interface ModalProps {
  dialogRef: RefObject<HTMLDialogElement | null>;
  closeModal: () => void;
}

const Modal = ({ dialogRef, closeModal }: ModalProps) => {
  return (
    <>
      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          
          <div className="absolute inset-0 bg-gradient-to-r from-teal-300 to-teal-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-8">
            <div className="max-w-md mx-auto">
              
              <div className="modal-action">
                
                <Login closeModal={closeModal} />
                <button className="absolute flex justify-center items-center top-7 right-8 w-5 h-5 rounded bg-zinc-500 text-yellow-300 cursor-pointer text-center" onClick={closeModal}>
                   X
                  </button>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;

