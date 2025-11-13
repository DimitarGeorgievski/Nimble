import { useEffect, useState } from "react";
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
import { useLocation, useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Dashboard");
  const items = [
    {
      name: "Home",
      path: "dashboard",
      active: false,
      icon: <LayoutDashboard size={14} />,
    },
    {
      name: "Orders",
      path: "orders",
      active: true,
      icon: <ShoppingCart size={14} />,
    },
    { name: "Menu", path: "menu", active: true, icon: <Utensils size={14} /> },
    {
      name: "Reservations",
      path: "reservations",
      active: true,
      icon: <Calendar size={14} />,
    },
    { name: "Staff", path: "staff", active: true, icon: <Users size={14} /> },
    {
      name: "Reports",
      path: "reports",
      active: false,
      icon: <BarChart size={14} />,
    },
    {
      name: "Settings",
      path: "settings",
      active: false,
      icon: <Settings size={14} />,
    },
  ];

  useEffect(() => {
    const current = items.find((i) => location.pathname.includes(i.path));
    if (current) setActiveTab(current.name);
  }, [location.pathname]);

  return (
    <ul className="list-wrapper">
      {items.map((item) => (
        <li
          key={item.name}
          className={`items ${activeTab === item.name ? "active" : ""}`}
          onClick={() => {
            setActiveTab(item.name);
            navigate(`/${item.path}`);
          }}
        >
          <div className="item-wrapper">
            <span className="icon">{item.icon}</span>
            <span>{item.name}</span>
          </div>
          {!item.active && <span className="soon-span">Soon</span>}
        </li>
      ))}
    </ul>
  );
}
