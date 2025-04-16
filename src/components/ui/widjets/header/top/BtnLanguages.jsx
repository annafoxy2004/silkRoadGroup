import { DownOutlined, GlobalOutlined, UpOutlined } from "@ant-design/icons";
import { Select } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const BtnLanguages = () => {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleChange = (value) => {
    i18n.changeLanguage(value);
    setOpen(false);
  };

  const isAuthPage =
    location.pathname.includes("/signup") || location.pathname.includes("/login");

  return (
    <div style={{ display: "flex", gap:"7px" }}>
      <GlobalOutlined style={{ fontSize: 25 }} />
      <Select
        value={i18n.language}
        open={open}
        onDropdownVisibleChange={setOpen}
        onChange={handleChange}
        suffixIcon={open ? <UpOutlined /> : <DownOutlined />}
        style={{
          width: "110px",
        }}
        variant={isAuthPage? "borderless":"outlined"}
        defaultValue={i18n.language}
        options={[
          { value: "ru", label: t("ru") },
          { value: "en", label: t("en") },
          { value: "ky", label: t("ky") },
        ]}
      />
    </div>
  );
};

export default BtnLanguages;
