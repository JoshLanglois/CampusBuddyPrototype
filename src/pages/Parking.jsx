import { Link, useParams } from "react-router-dom";
import { parkingLots, getLocation } from "../data/mockData";
import Icon from "../components/Icon";
import CampusSchematic from "../components/CampusSchematic";

export default function Parking() {
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">LESS CIRCLING. MORE GETTING THERE.</span>
          <h1>
            A spot for your day<span className="greeting-dot">.</span>
          </h1>
          <p>Check your options before you head to campus.</p>
        </div>
        <Link className="button secondary" to="/map">
          <Icon name="map" size={19} />
          View on Map
        </Link>
      </div>
      <div className="notice">
        <Icon name="info" size={19} />
        <span>
          All parking availability and space counts are simulated demo
          estimates. They do not represent live parking or actual lot
          capacities.
        </span>
      </div>
      <div className="parking-summary">
        <div>
          <span className="icon-tile pale-green">
            <Icon name="parking" size={28} />
          </span>
          <div>
            <span className="eyebrow">YOUR BEST BET IN THIS DEMO</span>
            <h2>Head north. Find your space.</h2>
            <p>Parking Lot A has the most example spaces available.</p>
          </div>
        </div>
        <Link className="button primary" to="/parking/lot-a">
          Explore Lot A<Icon name="arrow" size={18} />
        </Link>
      </div>
      <div className="section-heading">
        <h2>Campus parking</h2>
        <span>3 example lots · UWF</span>
      </div>
      <div className="parking-grid">
        {parkingLots.map((lot) => (
          <article className="card parking-card" key={lot.id}>
            <div
              className={`parking-card-art parking-art-${lot.status.toLowerCase()}`}
            >
              <span className="lot-art-letter">P</span>
              <span className="lot-art-road" />
              <span className={`badge ${lot.status.toLowerCase()}`}>
                <span className="status-dot" />
                {lot.status}
              </span>
            </div>
            <div className="parking-card-content">
              <span className="eyebrow">{lot.area.toUpperCase()}</span>
              <h2>{lot.name}</h2>
              <div className="space-count">
                <strong>{lot.spaces}</strong>
                <span>of {lot.capacity} example spaces free</span>
              </div>
              <div className={`availability-bar ${lot.status.toLowerCase()}`}>
                <span
                  style={{ width: `${(lot.spaces / lot.capacity) * 100}%` }}
                />
              </div>
              <small className="estimate-label">
                Demo estimate · Not live data
              </small>
              <div className="nearby-line">
                <Icon name="building" size={17} />
                <span>
                  Near{" "}
                  {lot.nearby
                    .map((id) => getLocation(id).shortName)
                    .join(" & ")}
                </span>
              </div>
              <div className="parking-card-actions">
                <Link className="button secondary" to={`/parking/${lot.id}`}>
                  View Details
                </Link>
                <Link
                  className="button primary"
                  to={`/directions?to=${lot.id}`}
                >
                  <Icon name="walk" size={18} />
                  Directions
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="inline-note parking-footnote">
        <Icon name="info" size={17} />
        This prototype does not check permits or parking restrictions. Refer to
        official UWF resources for real parking information.
      </div>
    </>
  );
}

export function ParkingDetail() {
  const { lotId } = useParams();
  const lot = parkingLots.find((item) => item.id === lotId);
  if (!lot)
    return (
      <div className="empty-state">
        <h1>We couldn’t find that demo lot.</h1>
        <Link className="button primary" to="/parking">
          Back to Parking
        </Link>
      </div>
    );
  return (
    <>
      <Link className="text-link back-link" to="/parking">
        <Icon name="back" size={17} />
        All parking lots
      </Link>
      <div className="page-heading">
        <div>
          <span className="eyebrow">{lot.area.toUpperCase()}</span>
          <h1>
            {lot.name}
            <span className="greeting-dot">.</span>
          </h1>
          <p>A closer look at your campus arrival.</p>
        </div>
        <span className={`badge large-badge ${lot.status.toLowerCase()}`}>
          <span className="status-dot" />
          {lot.status} · Demo estimate
        </span>
      </div>
      <div className="detail-grid">
        <section className="card lot-detail-card">
          <span className="icon-tile pale-green">
            <Icon name="parking" size={28} />
          </span>
          <h2>Room to start your day</h2>
          <div className="big-space-count">
            {lot.spaces}
            <span>example spaces available</span>
          </div>
          <div className={`availability-bar ${lot.status.toLowerCase()}`}>
            <span style={{ width: `${(lot.spaces / lot.capacity) * 100}%` }} />
          </div>
          <p>{lot.info}</p>
          <h3>Nearby example buildings</h3>
          <div className="nearby-buildings">
            {lot.nearby.map((id) => (
              <Link key={id} to={`/map?location=${id}`}>
                <Icon name="building" size={19} />
                {getLocation(id).name}
                <Icon name="chevron" size={16} />
              </Link>
            ))}
          </div>
          <Link
            className="button primary full-width"
            to={`/directions?to=${lot.id}`}
          >
            <Icon name="walk" size={19} />
            Get Directions
          </Link>
          <Link
            className="button secondary full-width"
            to={`/map?location=${lot.id}`}
          >
            <Icon name="map" size={19} />
            View on Map
          </Link>
        </section>
        <section className="card lot-map">
          <CampusSchematic selectedId={lot.id} />
          <div className="inline-note">
            <Icon name="info" size={17} />
            Illustrative campus layout. Availability is simulated.
          </div>
        </section>
      </div>
    </>
  );
}
