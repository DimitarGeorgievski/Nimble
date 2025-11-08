import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingCart,
  Utensils,
  Calendar,
  Users,
  BarChart,
  Settings,
} from "lucide-react";
import "./sideBar.scss";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("Dashboard");
  const items = [
    { name: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Orders", icon: <ShoppingCart size={18} /> },
    { name: "Menu", icon: <Utensils size={18} /> },
    { name: "Reservations", icon: <Calendar size={18} /> },
    { name: "Staff", icon: <Users size={18} /> },
    { name: "Reports", icon: <BarChart size={18} /> },
    { name: "Settings", icon: <Settings size={18} /> },
  ];
  return (
    <ul className="list-wrapper">
      {items.map((item) => (
        <li
          key={item.name}
          className={`items ${activeTab === item.name ? "active" : ""}`}
          onClick={() => {
            setActiveTab(item.name);
            navigate(`/${item.name.toLowerCase()}`)
          }}
        >
          <span className="icon">{item.icon}</span>
          <span>{item.name}</span>
        </li>
      ))}
    </ul>
  );
}
