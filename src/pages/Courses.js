import React, { useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import { getCoursesApi } from "../api/course";
import PresentationCourses from "../components/Web/Courses/Presentacion/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList/CoursesList";
import { Helmet } from "react-helmet";

export default function Courses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    getCoursesApi()
      .then((response) => {
        if (response.data.code !== 200) {
          notification["warning"]({
            message: response.data.message,
          });
        } else {
          setCourses(response.data.courses);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor, intentelo más tarde.",
        });
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Cursos de Programación</title>
        <meta
          name="description"
          content="Cursos | Web sobre programación de Camilo Vallejos Provoste"
          data-react-helmet="true"
        />
      </Helmet>
      <Row>
        <Col md={4} />
        <Col md={16}>
          <PresentationCourses />
          {!courses ? (
            <Spin
              tip="Cargando Cursos"
              style={{ textAlign: "center", width: "100%", padding: "20px" }}
            />
          ) : (
            <CoursesList courses={courses} />
          )}
        </Col>
        <Col md={4} />
      </Row>
    </>
  );
}
