import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

const ButtonLink = ({
  to,
  children,
  imgSrc,
  bg = "dark",
  className = "",
  title,
  size = "sm",
  onClick
}) => {
  const bgClasses = {
    light: "bg-[#E5FFED] text-[#20A647]",
    dark: "bg-[#28C656] hover:bg-[#20A647] hover:border text-white",
    white: "bg-white hover:bg-gray-100 text-[#20A647] border",
  };

  const sizeClasses = {
    xs: "w-32 sm:w-48",
    sm: "w-36 sm:w-52 py-3",
    md: "w-full sm:w-80",
    lg:"w-full py-5 text-[14px]"
  };

  const baseClasses = classNames(
    "flex items-center justify-center rounded-xl transition-all font-medium",
    bgClasses[bg],
    sizeClasses[size],
    className,
    size === "xs"
      ? "gap-2 sm:gap-3 py-2 px-2 text-[11px] sm:text-sm"
      : "gap-2 px-10 py-2 text-[11px] sm:text-sm"
  );

  return (
    <Link to={to} className={baseClasses} onClick={onClick}>
      {imgSrc &&
        (typeof imgSrc === "string" ? (
          <img src={imgSrc} alt="icon" className="w-5 h-5" />
        ) : (
          imgSrc
        ))}
      {children}
      {title}
    </Link>
  );
};

export default ButtonLink;
