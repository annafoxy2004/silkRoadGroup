import React from "react";
import { Button } from "antd";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavLoginBtn = () => {
  const { t } = useTranslation();

  return (
    <Link to="/login" className="nav-login">
      <Button
        style={{
          color: "white",
          fontWeight: 500,
          borderRadius: "40px",
          paddingBottom: "15px",
          paddingTop: "15px",
          paddingLeft: "35px",
          paddingRight: "35px",
          backgroundColor: "#28C656",
          transition: "background-color 0.2s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = "#20A647")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "#28C656")
        }
        size="large"
      >
        {t("header.login")}
      </Button>
    </Link>
  );
};

export default NavLoginBtn;
