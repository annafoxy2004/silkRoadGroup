import React, { useState, useEffect } from "react";
import "../auth.css";
import signLogin from "../../../assets/auth/sign-login.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import googleIcon from "../../../assets/auth/googleicon.svg";
import appleIcon from "../../../assets/auth/appleIcon.svg";
import { useTranslation } from "react-i18next";
import InputAuth from "../../ui/atoms/InputAuth/InputAuth.jsx";
import useAuthStore from "@/store/auth/authStore";

const LoginViews = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Состояние формы
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  const { loginUser, loading, error } = useAuthStore();

  // Обработка изменений в полях ввода
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlelogin = async () => {
    const payload = {
      email: data.email.trim(),
      password: data.password,
      navigate,
    };

    await registerUser(payload);
  };

  // Обработка "Забыли пароль"
  const handleForgotPassword = () => {
    setModalOpen(true);
  };

  return (
    <div id="auth">
      <div className="auth py-10">
        <div className="auth-img__block">
          <img src={signLogin} alt="signLogin" />
        </div>
        <div className="auth-form__block">
          <div className="form-title">
            <span>{t("auth.login.span")}</span>
            <h1>{t("auth.login.h1")}</h1>
            <p>
              {t("auth.login.p")}
              <NavLink to="/signup"> {t("auth.login.pNav")} </NavLink>
            </p>
          </div>
          <div className="auth-form">
            <InputAuth
              label={t("auth.email")}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <InputAuth
              type="password"
              label={t("auth.password")}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          {/* {error && (
            <p style={{ color: "red" }}>
              {typeof error === "object"
                ? error.detail || JSON.stringify(error)
                : error}
            </p>
          )} */}
          {/* {message && <p style={{ color: "green" }}>{message}</p>} */}
          <div className="auth-btn">
            <div className="auth-btn__block">
              <span
                // onClick={handleForgotPassword}
                style={{ cursor: "pointer" }}
              >
                {t("auth.login.forgotYourPassword")}
              </span>
            </div>
            <Button
              style={{
                color: "white",
                backgroundColor: "#28C656",
                fontWeight: 500,
              }}
              size="large"
              color="default"
              variant="solid"
              onClick={() =>
                loginUser({
                  email: formData.email,
                  password: formData.password,
                  navigate,
                })
              }
              loading={loading}
            >
              {t("header.login")}
            </Button>

            <div className="auth-line_block">
              <div className="divider-line"></div>
              <span className="divider-text">
                {t("auth.login.orLoginWith")}
              </span>
              <div className="divider-line"></div>
            </div>
            <div className="auth-btns__block">
              <Button
                style={{ backgroundColor: "#F0F0F0", fontWeight: 500 }}
                size="large"
                color="default"
                variant="solid"
                onClick={() => {}}
              >
                <img src={googleIcon} alt="" />
              </Button>
              <Button
                style={{ backgroundColor: "#F0F0F0", fontWeight: 500 }}
                size="large"
                color="default"
                variant="solid"
                onClick={() => {}}
              >
                <img src={appleIcon} alt="" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно для восстановления пароля */}
      <Modal
        title={t("auth.modal.passwordRecovery")}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        className="custom-modal"
      >
        <p>{t("auth.modal.passwordRecoveryTitle")}</p>
        <InputAuth
          label={t("auth.email")}
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#28C656",
            borderColor: "#28C656",
            borderRadius: "16px",
          }}
        >
          {t("auth.modal.receiveTheCode")}
        </Button>
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <p>
            {t("auth.modal.doYouAlreadyHaveAnAccount")}
            <NavLink to="/login"> {t("header.login")}</NavLink>
          </p>
          <p>
            {t("auth.modal.dontHaveAnAccount")}
            <NavLink to="/sign">{t("auth.login.pNav")}</NavLink>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default LoginViews;
