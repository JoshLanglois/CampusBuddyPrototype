import { Link } from "react-router-dom";
import { conditions, getLocation } from "../data/mockData";
import { useApp } from "../state";
import Icon from "../components/Icon";

export default function Traffic() {
  const { reports } = useApp();
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">A HEADS-UP FOR THE ROAD AHEAD</span>
          <h1>
            Campus conditions<span className="greeting-dot">.</span>
          </h1>
          <p>Know what’s happening before you get going.</p>
        </div>
        <Link className="button primary" to="/reports?new=1">
          <Icon name="plus" size={18} />
          Report Incident
        </Link>
      </div>
      <div className="conditions-summary card">
        <span className="icon-tile pale-amber">
          <Icon name="traffic" size={29} />
        </span>
        <div>
          <h2>A little extra time goes a long way.</h2>
          <p>
            Moderate entrance traffic, one example construction area, and one
            walkway closure.
          </p>
        </div>
        <span className="badge amber">Demo conditions</span>
      </div>
      <div className="section-heading">
        <h2>Campus overview</h2>
        <span>Simulated data · No live updates</span>
      </div>
      <div className="conditions-grid">
        {conditions.map((item) => (
          <article className="card condition-card" key={item.id}>
            <div className="condition-card-top">
              <span
                className={`icon-tile ${item.status === "Clear" ? "pale-green" : item.status === "Closure" ? "pale-red" : "pale-amber"}`}
              >
                <Icon name={item.icon} size={25} />
              </span>
              <span
                className={`badge ${item.status === "Clear" ? "available" : item.status === "Closure" ? "full" : "amber"}`}
              >
                {item.status}
              </span>
            </div>
            <span className="eyebrow">{item.type.toUpperCase()}</span>
            <h2>{item.location}</h2>
            <p>{item.description}</p>
            <small>Predefined demonstration condition</small>
          </article>
        ))}
      </div>
      {reports.length > 0 && (
        <>
          <div className="section-heading">
            <h2>Student demonstration reports</h2>
            <Link className="text-link" to="/reports">
              View reports
              <Icon name="arrow" size={17} />
            </Link>
          </div>
          <div className="conditions-grid">
            {reports.map((item) => (
              <article className="card condition-card" key={item.id}>
                <div className="condition-card-top">
                  <span className="icon-tile pale-amber">
                    <Icon name="flag" />
                  </span>
                  <span className="badge amber">Demo / Unverified</span>
                </div>
                <span className="eyebrow">{item.type.toUpperCase()}</span>
                <h2>{getLocation(item.locationId)?.name}</h2>
                <p className="user-description">{item.description}</p>
                <small>{new Date(item.submittedAt).toLocaleString()}</small>
              </article>
            ))}
          </div>
        </>
      )}
      <div className="inline-note parking-footnote">
        <Icon name="info" size={18} />
        These alerts and reports are part of an academic prototype. They are not
        verified campus advisories.
      </div>
    </>
  );
}
