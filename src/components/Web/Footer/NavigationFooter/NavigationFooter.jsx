import React from "react";
import { Row, Col } from "antd";
import {
  AppstoreOutlined,
  BookOutlined,
  CodeOutlined,
  DatabaseOutlined,
  FormatPainterOutlined,
  HddOutlined,
  HighlightOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Col md={24}>
        <h3>Habilidades</h3>
      </Col>
      <Col md={12}>
        <RenderListLeft />
      </Col>
      <Col md={12}>
        <RenderListRight />
      </Col>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="#">
          <CodeOutlined type="code" /> Desarrollo Web
        </a>
      </li>
      <li>
        <a href="#">
          <DatabaseOutlined type="database" /> Base de datos SQL y noSQL
        </a>
      </li>
    </ul>
  );
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
          <HddOutlined /> Stack .NET y MERN
        </a>
      </li>
      <li>
        <a href="#">
          <FormatPainterOutlined /> SASS (SCSS)
        </a>
      </li>
      <li>
        <a href="#">
          <AppstoreOutlined /> Servicios Web <br /> (SOAP y REST)
        </a>
      </li>
    </ul>
  );
}
