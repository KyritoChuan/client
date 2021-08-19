import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { List, Button, Modal as ModalAntd, notification } from "antd";
import { ReactSortable } from "react-sortablejs";
import Modal from "../../../Modal";
import {
  isVisibleModal,
  modalContent,
  modalTitle,
} from "../../../../actions/modalActions";
import { getAccessTokenApi } from "../../../../api/auth";
import {
  deleteCourseApi,
  getCourseDataUdemyApi,
  updateCourseApi,
} from "../../../../api/course";

import "./CoursesList.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddEditCourse from "../AddEditCourse/AddEditCourse";

const { confirm } = ModalAntd;

export default function CoursesList(props) {
  const { courses, setReloadCourses } = props;
  const [listCourses, setListCourses] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const listCoursesArray = [];

    courses.forEach((course) => {
      listCoursesArray.push({
        content: (
          <Course
            course={course}
            deleteCourse={deleteCourse}
            editCourseModal={editCourseModal}
            key={course._id}
          />
        ),
      });
    });
    setListCourses(listCoursesArray);
  }, [courses]);

  const onSort = (customEvent, sortable, object) => {
    debugger;
    let initialRank = 0;
    const { list } = object.dragging.props;
    const accessToken = getAccessTokenApi();
    list.forEach((item) => {
      debugger;
      const { _id } = item.content.props.course;
      const order = initialRank;
      initialRank = initialRank + 1;
      updateCourseApi(accessToken, _id, { order });
    });
  };

  const addCourseModal = () => {
    dispatch(modalTitle("Creando Nuevo Curso"));
    dispatch(isVisibleModal(true));
    dispatch(
      modalContent(<AddEditCourse setReloadCourses={setReloadCourses} />)
    );
  };

  const editCourseModal = (course) => {
    dispatch(modalTitle("Actualizando Curso"));
    dispatch(isVisibleModal(true));
    dispatch(
      modalContent(
        <AddEditCourse setReloadCourses={setReloadCourses} course={course} />
      )
    );
  };

  const deleteCourse = (course) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando Curso",
      content: `¿Estas seguro de que quieres eliminar el curso ${course.idCourse}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteCourseApi(accessToken, course._id)
          .then((response) => {
            debugger;
            const typeNotification =
              response.data.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.data.message,
            });
            setReloadCourses(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor, intentelo más tarde2222",
            });
          });
      },
    });
    console.log(course);
  };

  return (
    <div className="courses-list">
      <div className="courses-list__header">
        <Button type="primary" onClick={addCourseModal}>
          Nuevo Curso
        </Button>
      </div>

      <div className="courses-list__items">
        {listCourses.length === 0 && (
          <h2 style={{ textAlign: "center", margin: 0 }}>
            No tienes cursos creados
          </h2>
        )}
        <ReactSortable
          list={listCourses}
          setList={setListCourses}
          onSort={onSort}
        >
          {listCourses.map((item) => item.content)}
        </ReactSortable>
      </div>

      <Modal />
    </div>
  );
}

function Course(props) {
  const { course, deleteCourse, editCourseModal } = props;
  const [courseData, setCourseData] = useState(null);

  useEffect(async () => {
    const response = await getCourseDataUdemyApi(course.idCourse);
    if (response.code !== 200) {
      notification["warning"]({
        message: `El curso con el id ${course.idCourse} no se ha encontrado`,
      });
      return;
    }
    setCourseData(response.data);
  }, [course]);

  if (!courseData) {
    return null;
  }

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => editCourseModal(course)}>
          <EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteCourse(course)}>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <img
        src={courseData.image_480x270}
        alt={courseData.title}
        style={{ width: "100px", marginRight: "20px" }}
      />
      <List.Item.Meta
        title={`${courseData.title} | ID: ${course.idCourse}`}
        description={courseData.headline}
      />
    </List.Item>
  );
}
