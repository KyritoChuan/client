import React from "react";
import { Helmet } from "react-helmet";
import MainBanner from "../components/Web/MainBanner";
import HomeCourses from "../components/Web/HomeCourses";
import HowCoursesWork from "../components/Web/HowCoursesWork";
import ReviewCourses from "../components/Web/ReviewCourses";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Camilo Vallejos Provoste</title>
        <meta
          name="description"
          content="Home | Web sobre programación"
          data-react-helmet="true"
        />
      </Helmet>
      <MainBanner />
      <HowCoursesWork />
    </>
  );
}
