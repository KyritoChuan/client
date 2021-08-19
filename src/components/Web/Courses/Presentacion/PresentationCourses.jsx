import React from "react";
import AcademyLogo from "../../../../assets/img/png/academy-logo.png";

import "./PresentationCourses.scss";

export default function PresentationCourses() {
  return (
    <div className="presentation-course">
      <img src={AcademyLogo} alt="Cursos hechos por Camilo" />
      <p>
        Aquí se encuentran registrados los cursos que he hecho en este ultimo
        tiempo. De esta manera puedo representar mi avance como desarrollador
        web y plasmar el conocimiento que entregan estos excelentes profesores.
      </p>
      <p>Recomiendo echar un vistazo a quienes les interese.</p>
    </div>
  );
}
