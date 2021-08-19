import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMenuApi } from "../../../api/menu";
import { modifyMenuList } from "../../../actions/menuActions";
import { reloadMenus } from "../../../actions/reloadActions";
import MenuWebList from "../../../components/Admin/MenuWeb/MenuWebList";

export default function MenuWeb() {
  const dispatch = useDispatch();
  const reloadMenuWeb = useSelector((store) => store.reloads.reloadMenus);

  useEffect(() => {
    getMenuApi().then((response) => {
      dispatch(modifyMenuList(response.data.menu));
    });
    dispatch(reloadMenus(false));
  }, [reloadMenuWeb]); //

  return (
    <div className="menu-web">
      <MenuWebList />
    </div>
  );
}
