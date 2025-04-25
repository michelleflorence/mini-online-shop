import React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.type";

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  children,
  onClick,
  type,
}) => (
  <button
    className={`${styles["button"]} ${styles["color-" + color]}`}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

export default Button;
