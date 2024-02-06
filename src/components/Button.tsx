import React from "react";

interface ButtonProps {
  children: string;
  onClick: () => void;
  color?: "primary" | "secondary" | "danger";
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  color = "secondary",
}) => {
  return (
    <button
      className={`btn btn-${color}`}
      style={{
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "8px",
        marginBottom: "8px",
        display: "block",
      }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
