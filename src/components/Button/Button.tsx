import React from "react";
import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.type";

const Button: React.FC<ButtonProps> = ({
  color = "primary",
  children,
  onClick,
}) => (
  <button
    className={`${styles["button"]} ${styles["color-" + color]}`}
    type="button"
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
