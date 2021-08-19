import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop";
import MenuSlider from "../components/Admin/MenuSlider";
import AdminSignIn from "../pages/Admin/SignIn";

import "./LayoutAdmin.scss";

//Otra forma de hacer destructuring en functión de componente es por parametro, un ejemplo de esto.
export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  const { Header, Content, Footer } = Layout;
  //const { user, isLoading } = useAuth();
  const authUser = useSelector((state) => state.authUsers);
  //if (!user && !isLoading) {

  debugger;
  if (!authUser.user && !authUser.isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }
  //Inline Style
  //if (user && !isLoading) {
  if (authUser.user && !authUser.isLoading) {
    return (
      <Layout>
        <MenuSlider menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">
            Camilo Vallejos Provoste
          </Footer>
        </Layout>
      </Layout>
    );
  }

  return null;
}

//Aquí no se usa render, si no component por que lo unico que se necesita renderizar es un componente individual a la vez sin hijos.
function LoadRoutes({ routes }) {
  //Otra forma de hacer destructuring en functión de componente es por parametro, un ejemplo de esto.
  //const { routes } = props;
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
