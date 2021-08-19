import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import AvatarPersona from "../../../assets/img/png/monkey-avatar.png";

import "./ReviewCourses.scss";

export default function ReviewCourses() {
  return (
    <Row className="reviews-courses">
      <Col lg={4} />
      <Col lg={16} className="reviews-courses__title">
        <h2>
          Forma parte de los +25 mil estudiantes que están aprendiendo con mis
          cursos
        </h2>
      </Col>
      <Col lg={4} />

      <Col lg={4} />
      <Col lg={16}>
        <Row className="row-cards">
          <Col lg={8}>
            <CardReview
              name="Alonso Campos"
              subtitle="Alumno Udemy"
              avatar={AvatarPersona}
              review="Un curso excelente, el profesor explica detalladamente."
            />
          </Col>
          <Col lg={8}>
            <CardReview
              name="Alonso Campos"
              subtitle="Alumno Udemy"
              avatar={AvatarPersona}
              review="Un curso excelente, el profesor explica detalladamente."
            />
          </Col>
          <Col lg={8}>
            <CardReview
              name="Alonso Campos"
              subtitle="Alumno Udemy"
              avatar={AvatarPersona}
              review="Un curso excelente, el profesor explica detalladamente."
            />
          </Col>
        </Row>
        <Row className="row-cards">
          <Col lg={8}>
            <CardReview
              name="Alonso Campos"
              subtitle="Alumno Udemy"
              avatar={AvatarPersona}
              review="Un curso excelente, el profesor explica detalladamente."
            />
          </Col>
          <Col lg={8}>
            <CardReview
              name="Alonso Campos"
              subtitle="Alumno Udemy"
              avatar={AvatarPersona}
              review="Un curso excelente, el profesor explica detalladamente."
            />
          </Col>
          <Col lg={8}>
            <CardReview
              name="Alonso Campos"
              subtitle="Alumno Udemy"
              avatar={AvatarPersona}
              review="Un curso excelente, el profesor explica detalladamente."
            />
          </Col>
        </Row>
      </Col>
      <Col lg={4} />
    </Row>
  );
}

function CardReview(props) {
  const { name, subtitle, avatar, review } = props;
  const { Meta } = Card;

  return (
    <Card className="reviews-courses__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      />
    </Card>
  );
}
