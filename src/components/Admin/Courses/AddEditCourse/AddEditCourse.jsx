import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, notification } from "antd";
import { getAccessTokenApi } from "../../../../api/auth";
import { addCourseApi, updateCourseApi } from "../../../../api/course";
import { isVisibleModal } from "../../../../actions/modalActions";

import "./AddEditCourse.scss";
import {
  DollarOutlined,
  GiftOutlined,
  KeyOutlined,
  LinkOutlined,
} from "@ant-design/icons";

export default function AddEditCourse(props) {
  const { setReloadCourses, course } = props;
  const [courseData, setCourseData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    //course && setCourseData(course) pregunta respuesta simple sin un IF con &&
    course ? setCourseData(course) : setCourseData({});
  }, [course]);

  const addCourse = (e) => {
    if (!courseData.idCourse) {
      notification["error"]({
        message: "El id del curso es obligatorio",
      });
    } else {
      const accessToken = getAccessTokenApi();

      addCourseApi(accessToken, courseData)
        .then((response) => {
          const typeNotification =
            response.data.code === 200 ? "success" : "warning";
          notification[typeNotification]({
            message: response.data.message,
          });
          dispatch(isVisibleModal(false));
          setReloadCourses(true);
          setCourseData({});
        })
        .catch(() => {
          notification["error"]({
            message: "Error en el servidor, intentelo más tarde",
          });
        });
    }
  };

  const updateCourse = () => {
    const accessToken = getAccessTokenApi();

    debugger;
    updateCourseApi(accessToken, course._id, courseData)
      .then((response) => {
        const typeNotification =
          response.data.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.data.message,
        });
        dispatch(isVisibleModal(false));
        setReloadCourses(true);
        setCourseData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error en el servidor, intentelo más tarde",
        });
      });
  };

  return (
    <div className="add-edit-course">
      <AddEditForm
        course={course}
        addCourse={addCourse}
        updateCourse={updateCourse}
        setReloadCourses={setReloadCourses}
        courseData={courseData}
        setCourseData={setCourseData}
      />
    </div>
  );
}

function AddEditForm(props) {
  const {
    course,
    addCourse,
    updateCourse,
    setReloadCourses,
    courseData,
    setCourseData,
  } = props;

  return (
    <Form
      className="form-add-edit"
      onFinish={course ? updateCourse : addCourse}
    >
      <Form.Item>
        <Input
          prefix={<KeyOutlined />}
          placeholder="ID del Curso"
          value={courseData.idCourse}
          onChange={(e) => {
            setCourseData({ ...courseData, idCourse: e.target.value });
          }}
          disabled={course ? true : false}
        />
      </Form.Item>

      <Form.Item>
        <Input
          prefix={<LinkOutlined />}
          placeholder="Url del Curso"
          value={courseData.link}
          onChange={(e) => {
            setCourseData({ ...courseData, link: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<GiftOutlined />}
          placeholder="Cupón de Descuento"
          value={courseData.coupon}
          onChange={(e) => {
            setCourseData({ ...courseData, coupon: e.target.value });
          }}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<DollarOutlined />}
          placeholder="Precio del Curso"
          value={courseData.price}
          onChange={(e) => {
            setCourseData({ ...courseData, price: e.target.value });
          }}
        />
      </Form.Item>
      <Button type="primary" htmlType="submit" className="btn-submit">
        {course ? "Actualizar Curso" : "Crear Curso"}
      </Button>
    </Form>
  );
}
