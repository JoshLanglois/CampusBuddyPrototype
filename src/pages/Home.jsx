import { Link } from "react-router-dom";
import { useApp } from "../state";
import {
  nextClass,
  formatTime,
  getLocation,
  initialReports,
  parkingLots,
} from "../data/mockData";
import Icon from "../components/Icon";
import CampusSchematic from "../components/CampusSchematic";

export default function Home() {
  const { profile, classes, selectedIds, reports } = useApp();
  const next = nextClass(classes, selectedIds);
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  return (
    <>
      <div className="page-heading home-heading">
        <div>
          <span className="eyebrow">A LITTLE PLANNING. A BETTER DAY.</span>
          <h1>
            {greeting}, {profile.name.split(" ")[0]}
            <span className="greeting-dot">.</span>
          </h1>
          <p>Let’s get you where you need to be.</p>
        </div>
        <div className="date-block">
          <span className="icon-tile">
            <Icon name="calendar" size={21} />
          </span>
          <div>
            <small>YOUR CAMPUS DAY</small>
            <span>{date}</span>
          </div>
        </div>
      </div>
      <div className="dashboard-top">
        <section className="next-class-card">
          <div className="next-card-top">
            <span className="card-eyebrow">
              <Icon name="cap" size={19} /> YOUR NEXT CLASS
            </span>
            {next && <span className="next-day">{next.day}</span>}
          </div>
          {next ? (
            <>
              <div className="next-card-body">
                <div>
                  <span className="course-code">
                    {next.code || "ON YOUR SCHEDULE"}
                  </span>
                  <h2>{next.name}</h2>
                  <p>
                    <Icon name="pin" size={17} />{" "}
                    {getLocation(next.locationId)?.name}
                  </p>
                </div>
                <span className="class-illustration" aria-hidden="true">
                  <Icon name="building" size={81} />
                  <span />
                  <span />
                </span>
              </div>
              <div className="next-card-bottom">
                <div className="class-time">
                  <Icon name="clock" size={20} />
                  <strong>{formatTime(next.time)}</strong>
                  {next.endTime && <span>– {formatTime(next.endTime)}</span>}
                </div>
                <Link
                  className="button light"
                  to={`/directions?to=${next.locationId}`}
                >
                  View Directions
                  <Icon name="arrow" size={17} />
                </Link>
              </div>
            </>
          ) : (
            <div className="next-empty">
              <h2>Your day, your schedule.</h2>
              <p>Add your first class to start planning your campus day.</p>
              <Link className="button light" to="/schedule">
                Add a class
                <Icon name="plus" size={18} />
              </Link>
            </div>
          )}
          <div className="next-card-shape" />
        </section>
        <section className="campus-pulse card">
          <div className="section-card-heading">
            <h2>Campus at a glance</h2>
            <span className="small-demo">DEMO</span>
          </div>
          <Link to="/conditions" className="pulse-row">
            <span className="icon-tile pale-amber">
              <Icon name="traffic" size={21} />
            </span>
            <div>
              <small>Campus traffic</small>
              <strong>Moving a little slower</strong>
            </div>
            <span className="badge amber">Moderate</span>
          </Link>
          <Link to="/parking" className="pulse-row">
            <span className="icon-tile pale-green">
              <Icon name="parking" size={21} />
            </span>
            <div>
              <small>Parking nearby</small>
              <strong>Spaces at North Campus</strong>
            </div>
            <Icon name="chevron" size={17} />
          </Link>
          <Link to="/reports" className="pulse-row">
            <span className="icon-tile pale-blue">
              <Icon name="flag" size={21} />
            </span>
            <div>
              <small>Community reports</small>
              <strong>
                {reports.length + initialReports.length} active demo reports
              </strong>
            </div>
            <Icon name="chevron" size={17} />
          </Link>
        </section>
      </div>
      <section className="quick-section">
        <div className="section-heading">
          <h2>What’s your next move?</h2>
          <span>A shortcut to your day</span>
        </div>
        <div className="quick-actions">
          {[
            [
              "/parking",
              "parking",
              "Find Parking",
              "A spot to start your day",
              "pale-green",
            ],
            [
              "/map",
              "map",
              "Campus Map",
              "Get to know your campus",
              "pale-blue",
            ],
            [
              "/schedule",
              "calendar",
              "View Schedule",
              "Your classes, in one place",
              "pale-purple",
            ],
            [
              "/reports?new=1",
              "flag",
              "Report Incident",
              "Give your campus a heads-up",
              "pale-amber",
            ],
          ].map(([path, icon, title, copy, color]) => (
            <Link className="quick-action card" to={path} key={path}>
              <span className={`icon-tile ${color}`}>
                <Icon name={icon} size={25} />
              </span>
              <Icon className="quick-arrow" name="arrow" size={19} />
              <strong>{title}</strong>
              <span>{copy}</span>
            </Link>
          ))}
        </div>
      </section>
      <div className="dashboard-bottom">
        <section className="map-preview card">
          <div className="section-card-heading">
            <div>
              <span className="eyebrow">FIND YOUR WAY</span>
              <h2>A campus of possibilities.</h2>
            </div>
            <Link className="text-link" to="/map">
              Explore map
              <Icon name="arrow" size={17} />
            </Link>
          </div>
          <CampusSchematic compact />
          <Link
            className="map-preview-link"
            to="/map"
            aria-label="Open interactive campus map"
          />
          <div className="map-preview-caption">
            <span className="status-dot" />
            University of West Florida <span>Illustrative campus layout</span>
          </div>
        </section>
        <section className="parking-preview card">
          <div className="section-card-heading">
            <h2>A place to park</h2>
            <Link className="text-link" to="/parking">
              View all
              <Icon name="arrow" size={16} />
            </Link>
          </div>
          <p className="section-subtitle">A quick look before you head in.</p>
          <div>
            {parkingLots.map((lot) => (
              <Link
                to={`/parking/${lot.id}`}
                key={lot.id}
                className="parking-mini"
              >
                <span className={`parking-letter ${lot.status.toLowerCase()}`}>
                  {lot.name.slice(-1)}
                </span>
                <div>
                  <strong>{lot.name}</strong>
                  <small>{lot.area}</small>
                </div>
                <span className={`badge ${lot.status.toLowerCase()}`}>
                  <span className="status-dot" />
                  {lot.status}
                </span>
              </Link>
            ))}
          </div>
          <div className="inline-note">
            <Icon name="info" size={15} />
            Simulated availability. Not live parking data.
          </div>
        </section>
      </div>
      <div className="dashboard-note">
        <Icon name="leaf" size={18} />
        <span>
          A calmer commute starts with a little planning. You’ve got this.
        </span>
        <span>GO ARGOS.</span>
      </div>
    </>
  );
}
