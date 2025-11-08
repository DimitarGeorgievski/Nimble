import { Helmet } from "react-helmet-async";
import { Header } from "../../components/Header/Header";
import { SideBar } from "../../components/sideBar/sideBar";
import "./Dashboard.scss"

export function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <div>
        <Header />
      </div>
      <SideBar />
    </div>
  );
}
