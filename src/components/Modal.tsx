import React, { ReactNode } from "react";

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  children,
  onClose,
  showCloseButton = true,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px",
        }}
      >
        {showCloseButton && (
          <button
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            X
          </button>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
