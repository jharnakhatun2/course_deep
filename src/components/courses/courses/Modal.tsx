import { useRef, type FC } from "react";

interface ModalProp {
  promoVideo?: string;
  onClose: () => void;
}

const Modal: FC<ModalProp> = ({ promoVideo, onClose }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const embedUrl = promoVideo
    ? promoVideo.replace("youtu.be/", "www.youtube.com/embed/").split("?")[0]
    : "";

  const handleClose = () => {
    if (iframeRef.current) iframeRef.current.src = ""; 
    onClose(); 
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      open
      onClick={handleOverlayClick}
    >
      <div className="modal-box max-w-5xl p-0 overflow-hidden bg-black rounded-lg">
        {embedUrl ? (
          <div className="h-[60vh] w-full">
            <iframe
              ref={iframeRef}
              src={`${embedUrl}?autoplay=1`}
              title="Promo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded"
            ></iframe>
          </div>
        ) : (
          <div className="text-center text-white p-6">
            No promo video available.
          </div>
        )}
      </div>
    </dialog>
  );
};

export default Modal;
