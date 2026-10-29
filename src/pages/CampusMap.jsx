import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { locations, getLocation } from "../data/mockData";
import CampusSchematic from "../components/CampusSchematic";
import Icon from "../components/Icon";

export default function CampusMap() {
  const [params] = useSearchParams();
  const [selectedId, setSelectedId] = useState(
    getLocation(params.get("location"))?.id || "building-4",
  );
  const selected = getLocation(selectedId);
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">GET TO KNOW YOUR CAMPUS</span>
          <h1>
            Find your way<span className="greeting-dot">.</span>
          </h1>
          <p>A little perspective on where you’re headed.</p>
        </div>
        <Link className="button primary" to="/directions">
          <Icon name="walk" size={19} />
          Walking Directions
        </Link>
      </div>
      <div className="notice">
        <Icon name="info" size={18} />
        <span>
          Interactive schematic of the UWF demo campus. Locations and paths are
          illustrative, not geographically accurate.
        </span>
      </div>
      <div className="map-workspace">
        <section className="card map-main">
          <div className="map-toolbar">
            <strong>
              <Icon name="map" size={19} />
              UWF campus overview
            </strong>
            <span className="small-demo">DEMO MAP</span>
          </div>
          <CampusSchematic selectedId={selectedId} onSelect={setSelectedId} />
        </section>
        <aside className="map-details">
          <div className="card location-details">
            <span
              className={`icon-tile ${selected.kind === "Parking" ? "pale-green" : "pale-blue"}`}
            >
              <Icon
                name={selected.kind === "Parking" ? "parking" : "building"}
                size={27}
              />
            </span>
            <span className="eyebrow">SELECTED LOCATION</span>
            <h2>{selected.name}</h2>
            <p>
              {selected.kind} · {selected.area}
            </p>
            {selected.kind === "Parking" ? (
              <>
                <span className={`badge ${selected.status.toLowerCase()}`}>
                  <span className="status-dot" />
                  {selected.status} · Demo estimate
                </span>
                <p className="detail-copy">
                  {selected.spaces} example spaces available. See lot details
                  before you plan your next step.
                </p>
                <Link
                  className="button secondary full-width"
                  to={`/parking/${selected.id}`}
                >
                  View Parking
                  <Icon name="arrow" size={17} />
                </Link>
              </>
            ) : (
              <p className="detail-copy">
                An example campus destination. Choose walking directions to
                explore a simulated route here.
              </p>
            )}
            <Link
              className="button primary full-width"
              to={`/directions?to=${selected.id}`}
            >
              <Icon name="walk" size={18} />
              Get Directions
            </Link>
          </div>
          <div className="card location-list">
            <h3>Explore locations</h3>
            {locations.map((location) => (
              <button
                key={location.id}
                className={location.id === selectedId ? "active-location" : ""}
                onClick={() => setSelectedId(location.id)}
              >
                <Icon
                  name={location.kind === "Parking" ? "parking" : "pin"}
                  size={18}
                />
                <span>{location.name}</span>
                <Icon name="chevron" size={14} />
              </button>
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
