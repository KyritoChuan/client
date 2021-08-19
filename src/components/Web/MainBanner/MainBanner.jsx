import { Row, Col } from "antd";
import React from "react";

import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark">
        <Row>
          <Col lg={4} />
          <Col lg={16}>
            <h2>
              Camilo Vallejos <br />
              portafolio web
            </h2>
            <h3>
              Este portafolio consiste en una parte pública explicativa sobre mi
              trabajo <br />
              y cursos realizados durante el ultimo tiempo. La otra parte es una
              estructura <br />
              de administración con mantenedores.
            </h3>
          </Col>
          <Col lg={4} />
        </Row>
      </div>
    </div>
  );
}
