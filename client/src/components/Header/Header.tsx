import { UserRound, Plus, Search, Menu } from "lucide-react";
import "./Header.scss";

export function Header() {
  return (
    <div className="header-wrapper">
      <div className="hamburger-icon">
        <Menu size={18} strokeWidth={1.5} />
      </div>
      <img src="/Nimble_logoV2.png" alt="" />
      <div className="search">
        <div className="search-input">
          <Search size={14} color="#bfbfbf" strokeWidth={1.5} />
          <input type="text" placeholder="Search clients or stuff" />
        </div>
        <button className="create-button">
          <span
            style={{
              backgroundColor: "#eeca7b",
              borderRadius: "50%",
              padding: "1px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Plus size={12} color="#fff" strokeWidth={1.5} />
          </span>
          <span
            style={{
              fontSize: "14px",
              color: "#eeca7b",
              fontWeight: "bold"
            }}
          >
            Create
          </span>
        </button>
      </div>
      <div className="avatar">
        <UserRound size={24} color="#fff" strokeWidth={1.5} />
      </div>
    </div>
  );
}
