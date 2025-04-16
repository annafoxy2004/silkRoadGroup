import React, { useState } from "react";
import "./InputAuth.css";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

const InputAuth = ({
  type = "text",
  label = "Label",
  name,
  value = "", // Значение по умолчанию пустая строка
  onChange, // Обработчик изменения от родителя
  required = false,
  autoComplete = "off",
  error = false,
  ...props
}) => {
  const [isActive, setIsActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(value !== "");
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const labelStyle = {
    position: "absolute",
    left: "15px",
    color: "#1C1B1F",
    pointerEvents: "none",
    transform: isActive ? "translateY(-50%) scale(1)" : "translateY(1rem)",
    transition: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "#fcfdff",
    padding: "3px",
  };

  const inputStyle = {
    border: `solid 1.8px ${error ? "#FF4D4F" : isActive ? "#79747E" : "#9e9e9e"}`,
    borderRadius: "1rem",
    background: "none",
    padding: type === "password" ? "1rem 2.5rem 1rem 1rem" : "1rem",
    fontSize: "1rem",
    color: "#444444",
    transition: "border 200ms cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    width: "100%",
  };
  

  const iconVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 1, y: 1 },
    visible: { opacity: 1, rotate: 0, scale: 1, y: 0 },
  };

  return (
    <div className="input-group">
      <input
        type={type === "password" && showPassword ? "text" : type}
        name={name}
        value={value} // Используем внешнее значение
        onChange={onChange} // Используем внешний обработчик
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        autoComplete={autoComplete}
        style={inputStyle}
        {...props}
      />
      <label htmlFor={name} style={labelStyle}>
        {label}
      </label>
      {type === "password" && (
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
        >
          <motion.div
            initial={false}
            animate={showPassword ? "visible" : "hidden"}
            variants={iconVariants}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute" }}
          >
            <EyeOutlined style={{ fontSize: "25px", color: "#313131" }} />
          </motion.div>
          <motion.div
            initial={false}
            animate={showPassword ? "hidden" : "visible"}
            variants={iconVariants}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ position: "absolute" }}
          >
            <EyeInvisibleOutlined
              style={{ fontSize: "25px", color: "#313131" }}
            />
          </motion.div>
        </button>
      )}
    </div>
  );
};

export default InputAuth;
