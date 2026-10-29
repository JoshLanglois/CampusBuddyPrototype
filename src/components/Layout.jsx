import { NavLink, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Icon from "./Icon";
import { useApp } from "../state";

const sections = [
  ["/", "home", "Home"],
  ["/schedule", "calendar", "Schedule"],
  ["/map", "map", "Campus Map"],
  ["/parking", "parking", "Parking"],
  ["/reports", "flag", "Reports"],
];

export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark">
        <Icon name="pin" size={29} />
        <Icon className="brand-cap" name="cap" size={14} />
      </span>
      <span>
        Campus<span className="brand-light">Buddy</span>
        <small>YOUR CAMPUS, CONNECTED</small>
      </span>
    </span>
  );
}

export default function Layout() {
  const { profile, storageError } = useApp();
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <aside className="sidebar">
        <Link className="brand-link" to="/" aria-label="Campus Buddy home">
          <Brand />
        </Link>
        <div className="campus-selector">
          <span className="campus-monogram">UWF</span>
          <div>
            <strong>University of West Florida</strong>
            <small>Pensacola, Florida</small>
          </div>
          <span className="campus-dot" />
        </div>
        <span className="nav-caption">YOUR CAMPUS</span>
        <nav className="side-nav" aria-label="Main navigation">
          {sections.map(([path, icon, label]) => (
            <NavLink key={path} to={path} end={path === "/"}>
              <Icon name={icon} />
              <span>{label}</span>
              <Icon name="chevron" size={15} />
            </NavLink>
          ))}
          <NavLink to="/conditions">
            <Icon name="traffic" />
            <span>Campus Conditions</span>
            <span className="nav-count">3</span>
          </NavLink>
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <span className="icon-tile pale-green">
              <Icon name="leaf" />
            </span>
            <strong>
              A little less stress.
              <br />A better campus day.
            </strong>
            <p>Your next step starts here.</p>
          </div>
          <NavLink className="settings-link" to="/settings">
            <Icon name="settings" size={20} />
            Settings & profile
          </NavLink>
          <div className="sidebar-footer">
            <span className="status-dot" /> Academic prototype <span>v1.0</span>
          </div>
        </div>
      </aside>
      <div className="main-shell">
        <header className="topbar">
          <div className="desktop-breadcrumb">
            Your campus companion <span>/</span> <strong>UWF</strong>
          </div>
          <Link className="mobile-brand brand-link" to="/">
            <Brand />
          </Link>
          <div className="topbar-right">
            <span className="demo-label">
              <span className="status-dot" />
              Demo mode
            </span>
            <Link
              className="profile-link"
              to="/settings"
              aria-label="Open settings and profile"
            >
              <span className="avatar">
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <span>
                {profile.name.split(" ")[0]}
                <Icon name="chevron" size={14} />
              </span>
            </Link>
          </div>
        </header>
        <main id="main" className="main-content">
          {storageError && (
            <div className="notice warning-notice" role="alert">
              Browser storage is unavailable or full. Changes will last for this
              session only.
            </div>
          )}
          <Outlet />
        </main>
        <footer className="app-footer">
          <span>Made for the journey. Built for students.</span>
          <span>UWF campus demo · All navigation data is illustrative.</span>
        </footer>
      </div>
      <nav className="bottom-nav" aria-label="Mobile navigation">
        {sections.map(([path, icon, label]) => (
          <NavLink key={path} to={path} end={path === "/"}>
            <Icon name={icon} size={22} />
            <span>{label === "Campus Map" ? "Map" : label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
