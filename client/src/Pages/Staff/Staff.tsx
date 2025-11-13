import { useEffect, useState } from "react";
import "./Staff.scss";
import api from "../../services/api";
import { Spinner } from "../../components/Spinner/Spinner";
import { Helmet } from "react-helmet-async";

export function Staff() {
  const [staff, setStaff] = useState([]);
  const [activeTab, setActiveTab] = useState("Staff");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const tabList = ["Staff", "Shifts", "Roles"];

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await api.get("/staff");
        setStaff(res.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);
  console.log("staff", staff);
  if (loading) return <Spinner />;
  if (error) return <div>Error Loading data</div>;
  return (
    <div className="staff-wrapper">
      <Helmet>
        <title>Team</title>
      </Helmet>
      <div className="header-wrapper">
        <div className="header-counter">
          <h4>Team</h4>
          <span>{staff.length}</span>
        </div>
      </div>
      <ul className="staff-menu">
        {tabList.map((tab) => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`staff-tabs ${activeTab === tab ? "active-tab" : ""}`}
          >
            {tab}
          </li>
        ))}
      </ul>
    </div>
  );
}
