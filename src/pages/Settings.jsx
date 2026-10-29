import { useState } from "react";
import { useApp } from "../state";
import Icon from "../components/Icon";
import { campus } from "../data/mockData";

export default function Settings() {
  const { profile, update, resetDemo } = useApp();
  const [confirmReset, setConfirmReset] = useState(false);
  const [reset, setReset] = useState(false);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">YOUR CAMPUS COMPANION</span>
          <h1>
            A little about you<span className="greeting-dot">.</span>
          </h1>
          <p>Your local profile and prototype settings.</p>
        </div>
      </div>
      <div className="settings-grid">
        <section className="card profile-card">
          <div className="profile-card-header">
            <span className="avatar large-avatar">
              {profile.name
                .split(" ")
                .map((part) => part[0])
                .slice(0, 2)
                .join("")}
            </span>
            <div>
              <h2>{profile.name}</h2>
              <span className="badge available">Demo student</span>
            </div>
          </div>
          <dl className="profile-fields">
            <div>
              <dt>Student display name</dt>
              <dd>{profile.name}</dd>
            </div>
            <div>
              <dt>Email address</dt>
              <dd>{profile.email}</dd>
            </div>
            <div>
              <dt>Selected campus</dt>
              <dd>
                {campus}
                <small>Pensacola, Florida · Single-campus prototype</small>
              </dd>
            </div>
          </dl>
          <button
            className="button secondary full-width"
            onClick={() => update({ signedIn: false })}
          >
            <Icon name="logout" size={19} />
            Log Out
          </button>
          <p className="profile-note">
            Your local schedule and reports remain saved in this browser.
            Signing back in with the same email restores them.
          </p>
        </section>
        <div className="settings-aside">
          <section className="card settings-about">
            <span className="icon-tile pale-blue">
              <Icon name="info" size={25} />
            </span>
            <h2>A prototype with a purpose.</h2>
            <p>
              Campus Buddy is an academic demonstration of a simpler campus day,
              built around the University of West Florida.
            </p>
            <p>
              Maps, routes, course locations, traffic, and parking availability
              are illustrative. Authentication is simulated. No passwords are
              stored.
            </p>
            <span className="small-demo">CAMPUS BUDDY · VERSION 1.0</span>
          </section>
          <section className="card reset-card">
            <h2>Start fresh</h2>
            <p>
              Restore the three sample classes and preloaded reports. This
              removes your added classes, today’s selections, and submitted
              reports.
            </p>
            {confirmReset ? (
              <div className="reset-confirm">
                <p>
                  <strong>Reset this browser’s demonstration data?</strong>
                </p>
                <button
                  className="button danger small"
                  onClick={() => {
                    resetDemo();
                    setConfirmReset(false);
                    setReset(true);
                  }}
                >
                  Reset Demo Data
                </button>
                <button
                  className="button secondary small"
                  onClick={() => setConfirmReset(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="button secondary small"
                onClick={() => {
                  setConfirmReset(true);
                  setReset(false);
                }}
              >
                Reset demonstration data
              </button>
            )}
            {reset && (
              <p className="success-text" role="status">
                <Icon name="check" size={16} />
                Demo data restored.
              </p>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
