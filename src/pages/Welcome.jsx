import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Brand } from "../components/Layout";
import Icon from "../components/Icon";
import CampusSchematic from "../components/CampusSchematic";
import { useApp } from "../state";

export default function Welcome() {
  const { signIn } = useApp();
  function demo() {
    signIn(
      { name: "Alex Morgan", email: "alex.student@example.com", demo: true },
      { demo: true },
    );
  }
  return (
    <div className="welcome-page">
      <header className="welcome-header">
        <Brand />
        <span className="demo-label">UWF · Academic prototype</span>
      </header>
      <main className="welcome-main">
        <div className="welcome-copy">
          <span className="eyebrow">
            <span className="status-dot" /> A BETTER WAY TO CAMPUS
          </span>
          <h1>
            Less searching.
            <br />
            More <span>getting there.</span>
          </h1>
          <p className="welcome-tagline">Navigate campus smarter.</p>
          <p className="welcome-description">
            Your classes, your parking spot, your next step. Meet the campus
            companion that makes your day a little easier.
          </p>
          <div className="welcome-actions">
            <Link className="button primary" to="/register">
              Create Account
              <Icon name="arrow" size={19} />
            </Link>
            <Link className="button secondary" to="/login">
              Sign In
            </Link>
          </div>
          <button className="demo-entry" onClick={demo}>
            Continue as Demo Student <Icon name="arrow" size={18} />
          </button>
          <div className="welcome-campus">
            <span className="campus-monogram">UWF</span>
            <div>
              <strong>University of West Florida</strong>
              <span>One campus. A more connected day.</span>
            </div>
          </div>
        </div>
        <div className="welcome-visual">
          <CampusSchematic compact />
          <div className="floating-card">
            <span className="icon-tile pale-green">
              <Icon name="check" />
            </span>
            <div>
              <strong>You’ve got places to be.</strong>
              <p>Let’s make getting there easy.</p>
            </div>
          </div>
          <div className="welcome-map-tag">
            <Icon name="walk" size={18} /> Your next class is just a few steps
            away.
          </div>
        </div>
      </main>
      <footer className="welcome-footer">
        An academic demonstration for UWF. All locations, routes, and
        availability are illustrative. No live navigation or real
        authentication.
      </footer>
    </div>
  );
}

export function Auth({ register = false }) {
  const { signIn, profile } = useApp();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function submit(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    const email = values.get("email").trim();
    const password = values.get("password");
    if (!password.trim()) return setError("Enter a non-empty demo password.");
    if (register && !values.get("name").trim())
      return setError("Enter your display name.");
    if (register && password !== values.get("confirm"))
      return setError("Your passwords do not match.");
    const name = register
      ? values.get("name").trim()
      : profile?.email === email
        ? profile.name
        : email
            .split("@")[0]
            .replace(/[._-]/g, " ")
            .replace(/\b\w/g, (letter) => letter.toUpperCase());
    signIn({ name, email, demo: true }, { register });
    navigate("/");
  }
  return (
    <div className="auth-page">
      <Link to="/welcome" className="brand-link">
        <Brand />
      </Link>
      <main className="auth-card">
        <Link className="text-link muted" to="/welcome">
          <Icon name="back" size={16} /> Back to welcome
        </Link>
        <span className="icon-tile pale-green auth-icon">
          <Icon name="cap" size={30} />
        </span>
        <span className="eyebrow">YOUR NEXT CHAPTER STARTS HERE</span>
        <h1>{register ? "Find your campus rhythm." : "Welcome back."}</h1>
        <p>
          {register
            ? "Create your local demonstration profile."
            : "Sign in and make your next move."}
        </p>
        <div className="notice">
          <Icon name="info" size={18} />
          <span>
            Demo authentication only. Use a made-up email and password.
            Passwords are never saved or verified.
          </span>
        </div>
        <form onSubmit={submit} className="form-stack">
          {register && (
            <label>
              Student name
              <input
                name="name"
                placeholder="Alex Morgan"
                required
                maxLength={70}
                autoComplete="name"
              />
            </label>
          )}
          <label>
            Email address
            <input
              name="email"
              type="email"
              placeholder="alex@example.com"
              required
              autoComplete="email"
              maxLength={150}
            />
          </label>
          <label>
            Demo password
            <input
              name="password"
              type="password"
              placeholder="Enter any demo password"
              required
              autoComplete="off"
            />
          </label>
          {register && (
            <label>
              Confirm password
              <input
                name="confirm"
                type="password"
                placeholder="Enter your demo password again"
                required
                autoComplete="off"
              />
            </label>
          )}
          {error && (
            <p role="alert" className="form-error">
              {error}
            </p>
          )}
          <button className="button primary full-width" type="submit">
            {register ? "Create Account" : "Sign In"}
            <Icon name="arrow" size={18} />
          </button>
        </form>
        <button
          className="button secondary full-width"
          onClick={() => {
            signIn(
              {
                name: "Alex Morgan",
                email: "alex.student@example.com",
                demo: true,
              },
              { demo: true },
            );
            navigate("/");
          }}
        >
          Continue as Demo Student
        </button>
        <p className="auth-switch">
          {register ? "Already have a demo profile?" : "New around here?"}{" "}
          <Link to={register ? "/login" : "/register"}>
            {register ? "Sign In" : "Create Account"}
          </Link>
        </p>
      </main>
      <p className="auth-footer">
        Campus Buddy · University of West Florida demo
      </p>
    </div>
  );
}
