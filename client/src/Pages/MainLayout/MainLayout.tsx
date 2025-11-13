import { Outlet } from "react-router-dom";
import { SideBar } from "../../components/sideBar/sideBar";
import { Header } from "../../components/Header/Header";
import "./MainLayout.scss";

export function MainLayout() {
  return (
    <div className="main-layout">
      <Header />
      <div className="content">
        <SideBar />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
