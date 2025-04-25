import React, { useState } from "react";
import styles from "./InputField.module.scss";
import VissibilityOffIcon from "../../assets/svg/eye.svg";
import VissibilityOnIcon from "../../assets/svg/eye-off.svg";

interface InputFieldProps {
  label?: string;
  type: string;
  placeholder: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  name?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  value,
  onChange,
  error,
  name,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={styles["input-field"]}>
      {label && <div className={styles["label"]}>{label}</div>}
      <div
        className={`${styles["input-container"]} ${
          error ? styles["error-border"] : ""
        }`}
      >
        <input
          type={showPassword ? "text" : type}
          name={name} // atau kamu bisa kasih prop name kalau mau lebih fleksibel
          className={`${styles["input"]}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={["email", "text"].includes(type) ? "on" : "off"}
        />
        {type === "password" && (
          <img
            src={showPassword ? VissibilityOnIcon : VissibilityOffIcon}
            className={styles["icon-right"]}
            onClick={() => setShowPassword((prev) => !prev)}
            alt="icon-eye"
          />
        )}
      </div>
      {error && <div className={styles["error"]}>{error}</div>}
    </div>
  );
};

export default InputField;
