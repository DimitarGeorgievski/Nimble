import { Helmet } from "react-helmet-async";
import "./Dashboard.scss";

export function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h1>Welcome to Dashboard</h1>
    </div>
  );
}
