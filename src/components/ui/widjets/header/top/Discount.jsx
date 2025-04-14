import { useState } from "react";
import {
  DownOutlined,
  UpOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Button, Select } from "antd";
import "../header.scss";
import { useTranslation } from "react-i18next";
import BtnLanguages from "./BtnLanguages";
import TwentyOneMinuteTimer from "./TwentyOneMinuteTimer";

export default function Discount() {
  const { t, i18n } = useTranslation();

  return (
    <div className="discoint-message">
      <div className="discoint-message__body">
        <div className="empty-block"></div>
        <div className="message-block">
          <span>{t("header.discount")}</span>
          <div>
            <TwentyOneMinuteTimer />
          </div>
        </div>
        <div className="button-block">
          <BtnLanguages />
          <Button
            style={{ color: "white", padding: 2 }}
            size="large"
            color="default"
            variant="link"
            icon={<EnvironmentOutlined className="iconStyle" />}
          >
            {t("header.location")}
          </Button>
        </div>
      </div>
    </div>
  );
}
