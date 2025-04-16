import React, { useState } from "react";
import "../auth.css";
import signLogin from "../../../assets/auth/sign-login.svg";
import { NavLink, useNavigate } from "react-router-dom";
import InputAuth from "../../ui/atoms/InputAuth/InputAuth.jsx";
import { Button, Input, Modal } from "antd";
import googleIcon from "../../../assets/auth/googleicon.svg";
import appleIcon from "../../../assets/auth/appleIcon.svg";
import { useTranslation } from "react-i18next";
import useAuthStore from "@/store/auth/authStore";

const SignViews = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [modalOpen, setModalOpen] = useState(false);

  const registerUser = useAuthStore((state) => state.registerUser);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async () => {
    if (data.password !== data.confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const payload = {
      email: data.email.trim(),
      password: data.password,
      navigate,
    };

    await registerUser(payload);
  };

  return (
    <div id="auth">
      <div className="auth py-10">
        <div className="auth-img__block">
          <img src={signLogin} alt="signLogin" />
        </div>
        <div className="auth-form__block">
          <div className="form-title">
            <h1>{t("auth.sign.h1")}</h1>
            <p>
              {t("auth.sign.p")}
              <NavLink to="/login"> {t("header.login")}</NavLink>
            </p>
          </div>
          <div className="auth-form">
            <InputAuth
              label={t("auth.email")}
              name="email"
              value={data.email}
              onChange={handleInputChange}
              required
            />
            <InputAuth
              type="password"
              label={t("auth.password")}
              name="password"
              value={data.password}
              onChange={handleInputChange}
              required
            />
            <InputAuth
              type="password"
              label={t("auth.confirmPassword")}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleInputChange}
              required
              error={
                data.confirmPassword && data.confirmPassword !== data.password
              }
            />
          </div>

          <div className="auth-btn">
            <div className="auth-text__block">
              <p>{t("auth.sign.bySignIngInYouAgreeToOur")}</p>
              <p>
                <span>{t("auth.sign.termsofUse")}</span> {t("auth.sign.and")}
                <span> {t("auth.sign.privacyPolicy")}</span>.
              </p>
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
              onClick={handleSignUp}
            >
              {t("auth.login.pNav")}
            </Button>
            <div className="auth-line_block">
              <div className="divider-line"></div>
              <span className="divider-text">
                {t("auth.sign.orSignUpWith")}
              </span>
              <div className="divider-line"></div>
            </div>
            <div className="auth-btns__block">
              <Button
                style={{ backgroundColor: "#F0F0F0", fontWeight: 500 }}
                size="large"
                color="default"
                variant="solid"
              >
                <img src={googleIcon} alt="" />
              </Button>
              <Button
                style={{ backgroundColor: "#F0F0F0", fontWeight: 500 }}
                size="large"
                color="default"
                variant="solid"
              >
                <img src={appleIcon} alt="" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно */}
      <Modal
        title={t("auth.modal.verifyIdentity")}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        centered
        className="custom-modal"
      >
        <p>{t("auth.modal.codeSentMessage")}</p>
        <Input.OTP className="inputOtP" variant="filled" length={4} />
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <p>
            {t("auth.modal.requestAgainIn")} <strong>01:59</strong>
          </p>
          <Button type="link" block style={{ padding: "0", color: "green" }}>
            {t("auth.modal.requestAgain")}
          </Button>
        </div>
        <Button
          type="primary"
          block
          style={{
            backgroundColor: "#28C656",
            borderColor: "#28C656",
            borderRadius: "16px",
          }}
          size="large"
        >
          {t("auth.modal.signUp")}
        </Button>
      </Modal>
    </div>
  );
};

export default SignViews;
