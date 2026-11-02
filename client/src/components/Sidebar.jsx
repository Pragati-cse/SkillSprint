import { NavLink } from "react-router-dom";

const links = [
  { to: "/", icon: "▦", label: "Dashboard", end: true },
  { to: "/skills", icon: "◈", label: "My Skills" },
  { to: "/topics", icon: "▤", label: "Learning Topics" },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">S</div>
        <div>
          <h2>SkillSprint</h2>
          <p>Learn with purpose</p>
        </div>
      </div>

      <p className="nav-heading">WORKSPACE</p>

      <nav className="nav-list">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-note">
        <div className="note-icon">✦</div>
        <h3>Small steps, big growth.</h3>
        <p>Consistent learning builds lasting skills.</p>
      </div>

      <div className="sidebar-footer">
        <div className="avatar">S</div>
        <div>
          <strong>Skill Learner</strong>
          <p>Personal workspace</p>
        </div>
      </div>
    </aside>
  );
}