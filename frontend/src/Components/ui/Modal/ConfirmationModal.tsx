import React from "react";

import "./ConfirmationModal.css";

interface ConfirmationModalProps {
  showModal: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
  isDelete: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  showModal,
  onClose,
  onConfirm,
  message,
  isDelete,
}) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p className="modal-message">{message}</p>
        <div className="modal-buttons">
          <button onClick={onClose} className="modal-cancel">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDelete}
            className={`modal-confirm ${
              isDelete ? "modal-confirm-disabled" : "modal-confirm-enabled"
            }`}
          >
            {isDelete ? (
              "loading..."
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
