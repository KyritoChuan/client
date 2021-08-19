import React from "react";
import LogoWhite from "../../../../assets/img/png/logo-white.png";
import SocialLink from "../../SocialLinks";

import "./MyInfo.scss";

export default function MyInfo() {
  return (
    <div className="my-info">
      <img src={LogoWhite} alt="Camilo Vallejos Provoste" />
      <h4>Para mayor información, les dejo mi red de contacto y repositorio</h4>
      <SocialLink />
    </div>
  );
}
