import React from "react";
import { Row, Col, Card } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  KeyOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./HowCoursesWork.scss";

export default function HowCoursesWork() {
  return (
    <Row className="how-courses-work">
      <Col lg={24} className="how-courses-work__title">
        <h2>Una breve introducción</h2>
        <h3>
          Mi nombre es Camilo Vallejos, soy desarrollador de software y ejerzo
          como tal desde el año 2018. <br />
          Comencé como desarrollador Full-Stack en .NET y, debido al interés de
          seguir reforzando conocimientos, comencé a aprender más en cursos
          sobre esta tecnología. <br />
          Luego, paulatinamente fui interesandome por aprender frameworks de
          Javascript hasta que decidí concentrarme en reactJS. <br />
          Al aprender React, aprendí también Redux en su conjunto. <br />
          No me di cuenta cuando ya estaba empezando a hacer API con NodeJS.
          <br />
          <br />
          En la actualidad, me encuentro trabajando con un full-Stack de JS.
        </h3>
      </Col>

      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col md={8}>
            <CardInfo
              icon={<ClockCircleOutlined />}
              title="Experiencia"
              description="Más de 3 años ejerciendo como desarrollador de software. (Julio 2018 - Actualidad)."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<MessageOutlined />}
              title="Contacto"
              description="Pueden contactarme a través de mi email o linkedin."
            />
          </Col>
          <Col md={8}>
            <CardInfo
              icon={<CheckCircleOutlined />}
              title="Disponibilidad"
              description="Siempre estoy abierto a escuchar ofertas laborales."
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function CardInfo(props) {
  const { icon, title, description } = props;
  const { Meta } = Card;

  return (
    <Card className="how-courses-work__card">
      {icon}
      <Meta title={title} description={description} />
    </Card>
  );
}
