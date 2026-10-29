import { useSearchParams, Link } from "react-router-dom";
import { useState } from "react";
import { locations, getLocation, findRoute } from "../data/mockData";
import CampusSchematic from "../components/CampusSchematic";
import Icon from "../components/Icon";

export default function Directions() {
  const [params, setParams] = useSearchParams();
  const destination = getLocation(params.get("to"))?.id || "building-4";
  const origin =
    getLocation(params.get("from"))?.id ||
    (destination === "lot-a"
      ? "building-4"
      : destination === "lot-b"
        ? "science"
        : destination === "lot-c"
          ? "academic"
          : "lot-a");
  const [from, setFrom] = useState(origin);
  const [to, setTo] = useState(destination);
  const [requested, setRequested] = useState(
    params.get("show") === "1" ? { from: origin, to: destination } : null,
  );
  const route = requested && findRoute(requested.from, requested.to);
  function submit(event) {
    event.preventDefault();
    setRequested({ from, to });
    setParams({ from, to, show: "1" }, { replace: true });
  }
  function changeFrom(value) {
    setFrom(value);
    setRequested(null);
  }
  function changeTo(value) {
    setTo(value);
    setRequested(null);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">ONE STEP CLOSER</span>
          <h1>
            Let’s walk there<span className="greeting-dot">.</span>
          </h1>
          <p>A preview of your journey across campus.</p>
        </div>
        <Link className="button secondary" to="/map">
          <Icon name="map" size={19} />
          Back to Map
        </Link>
      </div>
      <div className="notice">
        <Icon name="info" size={18} />
        <span>
          Simulated walking directions. Routes, distances, and times are
          illustrative estimates for this demo, not real-world navigation.
        </span>
      </div>
      <div className="directions-grid">
        <section className="card route-planner">
          <h2>Walking directions</h2>
          <p className="section-subtitle">Where are you headed?</p>
          <form onSubmit={submit} className="form-stack">
            <label>
              <span className="route-input-label">
                <i className="origin-dot" />
                Starting Location
              </span>
              <select
                value={from}
                onChange={(event) => changeFrom(event.target.value)}
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              className="swap-button"
              aria-label="Swap starting location and destination"
              onClick={() => {
                setFrom(to);
                setTo(from);
                setRequested(null);
              }}
            >
              <Icon name="swap" size={19} />
            </button>
            <label>
              <span className="route-input-label">
                <Icon name="pin" size={16} />
                Destination
              </span>
              <select
                value={to}
                onChange={(event) => changeTo(event.target.value)}
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit" className="button primary full-width">
              <Icon name="walk" size={19} />
              Get Directions
            </button>
          </form>
          {requested && (
            <div className="route-result" role="status">
              {requested.from === requested.to ? (
                <div className="route-message">
                  <Icon name="check" />
                  <h3>You’re already there.</h3>
                  <p>
                    Choose a different destination to preview a walking route.
                  </p>
                </div>
              ) : route ? (
                <>
                  <div className="route-stats">
                    <span>
                      <Icon name="walk" size={27} />
                      <strong>
                        {route.minutes}
                        <small>min walk</small>
                      </strong>
                    </span>
                    <span>
                      <strong>
                        {route.distance}
                        <small>example distance</small>
                      </strong>
                    </span>
                  </div>
                  <p className="route-endpoints">
                    <strong>{getLocation(route.from).name}</strong>
                    <Icon name="arrow" size={16} />
                    <strong>{getLocation(route.to).name}</strong>
                  </p>
                  <h3>Your example route</h3>
                  <ol className="route-steps">
                    {route.steps.map((step, index) => (
                      <li key={step}>
                        <span>{index + 1}</span>
                        <p>{step}</p>
                      </li>
                    ))}
                  </ol>
                  <div className="inline-note">
                    <Icon name="info" size={16} />
                    Illustrative steps only. Do not use for actual navigation.
                  </div>
                </>
              ) : (
                <div className="route-message">
                  <Icon name="map" size={29} />
                  <h3>This route isn’t in the demo yet.</h3>
                  <p>
                    Try Parking Lot A to any building, Lot B to Science &
                    Engineering or Pace Library, or Lot C to the Academic
                    Building or University Commons. Reverse routes work, too.
                  </p>
                  <button
                    className="text-link"
                    onClick={() => {
                      setFrom("lot-a");
                      setTo("science");
                      setRequested(null);
                    }}
                  >
                    Try Lot A → Science & Engineering
                    <Icon name="arrow" size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
        <section className="card route-map">
          <div className="map-toolbar">
            <strong>
              <Icon name="map" size={19} />
              {route ? "Your example route" : "A look at the campus"}
            </strong>
            <span className="small-demo">SCHEMATIC</span>
          </div>
          <CampusSchematic route={route} selectedId={to} />
          <div className="route-map-caption">
            <span className="icon-tile pale-green">
              <Icon name="leaf" size={23} />
            </span>
            <div>
              <strong>A few steps. A fresh perspective.</strong>
              <p>
                {route
                  ? "The dashed line illustrates connectivity, not a measured path."
                  : "Choose your start and destination to explore a supported demo route."}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
