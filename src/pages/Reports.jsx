import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { initialReports, locations, getLocation } from "../data/mockData";
import { useApp } from "../state";
import Icon from "../components/Icon";

export default function Reports() {
  const { reports, update } = useApp();
  const [params, setParams] = useSearchParams();
  const adding = params.get("new") === "1";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const allReports = [...reports, ...initialReports];
  function submit(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (!values.get("description").trim())
      return setError("Add a short description of what you noticed.");
    const report = {
      id: crypto.randomUUID(),
      type: values.get("type"),
      locationId: values.get("locationId"),
      description: values.get("description").trim(),
      submittedAt: new Date().toISOString(),
    };
    update((previous) => ({
      ...previous,
      reports: [report, ...previous.reports],
    }));
    setParams({});
    setSubmitted(true);
    setError("");
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">A MORE CONNECTED CAMPUS</span>
          <h1>
            Look out for each other<span className="greeting-dot">.</span>
          </h1>
          <p>A little heads-up can make someone’s day easier.</p>
        </div>
        <button
          className="button primary"
          onClick={() => {
            setParams(adding ? {} : { new: "1" });
            setSubmitted(false);
          }}
        >
          {adding ? (
            "Cancel"
          ) : (
            <>
              <Icon name="plus" size={18} />
              Report Incident
            </>
          )}
        </button>
      </div>
      <div className="notice">
        <Icon name="info" size={19} />
        <span>
          Demonstration reporting only. Reports stay in this browser and are not
          sent to UWF or emergency services. All reports are unverified.
        </span>
      </div>
      {submitted && (
        <div className="report-confirmation card" role="status">
          <span className="icon-tile pale-green">
            <Icon name="check" size={26} />
          </span>
          <div>
            <h2>Thanks for the heads-up.</h2>
            <p>
              Your demonstration report is saved below and on Campus Conditions.
            </p>
            <div className="confirmation-links">
              <Link className="text-link" to="/">
                Return to dashboard
                <Icon name="arrow" size={16} />
              </Link>
              <Link className="text-link" to="/conditions">
                View campus conditions
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
      {adding && (
        <section className="card form-card">
          <span className="eyebrow">SHARE WHAT YOU NOTICED</span>
          <h2>Report an incident</h2>
          <p className="section-subtitle">
            A brief description helps other students plan ahead.
          </p>
          <form onSubmit={submit} className="form-grid">
            <label>
              Report type
              <select name="type" required defaultValue="">
                <option value="" disabled>
                  Select a report type
                </option>
                {[
                  "Construction",
                  "Closed Walkway",
                  "Road Closure",
                  "Traffic Problem",
                ].map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </label>
            <label>
              Campus location
              <select name="locationId" required defaultValue="">
                <option value="" disabled>
                  Select a campus location
                </option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="full-row">
              Short description
              <textarea
                name="description"
                rows={4}
                placeholder="What should fellow students know?"
                maxLength={500}
                required
              />
            </label>
            {error && (
              <p className="form-error full-row" role="alert">
                {error}
              </p>
            )}
            <div className="full-row form-bottom">
              <span>Saved locally · Demo / Unverified</span>
              <button className="button primary" type="submit">
                Submit Report
                <Icon name="arrow" size={18} />
              </button>
            </div>
          </form>
        </section>
      )}
      <div className="section-heading">
        <h2>
          Active reports <span className="count-chip">{allReports.length}</span>
        </h2>
        <Link to="/conditions" className="text-link">
          Campus conditions
          <Icon name="arrow" size={17} />
        </Link>
      </div>
      <div className="report-list">
        {allReports.map((report) => (
          <article className="card report-card" key={report.id}>
            <span className="icon-tile pale-amber">
              <Icon
                name={
                  report.type === "Construction"
                    ? "construction"
                    : report.type === "Traffic Problem"
                      ? "traffic"
                      : "warning"
                }
                size={25}
              />
            </span>
            <div className="report-content">
              <div className="report-heading">
                <h2>{report.type}</h2>
                <span className="badge amber">Demo / Unverified</span>
              </div>
              <span className="report-location">
                <Icon name="pin" size={15} />
                {getLocation(report.locationId)?.name}
              </span>
              <p className="user-description">{report.description}</p>
              <small>
                {report.sample ? "Preloaded sample · " : "Submitted locally · "}
                {new Date(report.submittedAt).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </small>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
