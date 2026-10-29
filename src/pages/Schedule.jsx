import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../state";
import { buildings, getLocation, weekdays, formatTime } from "../data/mockData";
import Icon from "../components/Icon";

export default function Schedule() {
  const { classes, selectedIds, update, toggleClass, removeClass } = useApp();
  const [adding, setAdding] = useState(false);
  const [days, setDays] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  function addClass(event) {
    event.preventDefault();
    const values = new FormData(event.currentTarget);
    if (!values.get("name").trim()) return setError("Enter a class name.");
    if (!days.length) return setError("Choose at least one meeting day.");
    if (values.get("endTime") && values.get("endTime") <= values.get("time"))
      return setError("End time must be later than start time.");
    const item = {
      id: crypto.randomUUID(),
      name: values.get("name").trim(),
      locationId: values.get("locationId"),
      days,
      time: values.get("time"),
      endTime: values.get("endTime"),
      color: ["blue", "green", "purple"][classes.length % 3],
    };
    update((previous) => ({
      ...previous,
      classes: [...previous.classes, item],
    }));
    setDays([]);
    setAdding(false);
    setError("");
    setMessage(`${item.name} added to your schedule.`);
  }
  return (
    <>
      <div className="page-heading">
        <div>
          <span className="eyebrow">MAKE ROOM FOR A GREAT DAY</span>
          <h1>
            Your schedule<span className="greeting-dot">.</span>
          </h1>
          <p>Your classes and your next steps, all together.</p>
        </div>
        <button
          className="button primary"
          onClick={() => {
            setAdding(!adding);
            setError("");
          }}
        >
          {adding ? (
            "Cancel"
          ) : (
            <>
              <Icon name="plus" size={18} />
              Add Class
            </>
          )}
        </button>
      </div>
      <div className="notice">
        <Icon name="info" size={19} />
        <span>
          Sample course locations and meeting times are illustrative. Select the
          classes you’re attending today to plan your trip.
        </span>
      </div>
      {message && (
        <div className="success-notice" role="status">
          <Icon name="check" size={18} />
          {message}
        </div>
      )}
      {adding && (
        <section className="card form-card">
          <h2>Add a class</h2>
          <form onSubmit={addClass} className="form-grid">
            <label>
              Class name
              <input
                name="name"
                placeholder="e.g. Software Engineering"
                maxLength={100}
                required
                autoFocus
              />
            </label>
            <label>
              Building or location
              <select name="locationId" required>
                {buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </select>
            </label>
            <fieldset className="days-field">
              <legend>Meeting days</legend>
              <div className="day-options">
                {weekdays.map((day) => (
                  <label
                    className={`day-option ${days.includes(day) ? "chosen" : ""}`}
                    key={day}
                  >
                    <input
                      type="checkbox"
                      checked={days.includes(day)}
                      onChange={() =>
                        setDays((previous) =>
                          previous.includes(day)
                            ? previous.filter((item) => item !== day)
                            : [...previous, day],
                        )
                      }
                    />
                    {day}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="time-fields">
              <label>
                Start time
                <input name="time" type="time" required />
              </label>
              <label>
                End time <span className="optional">(optional)</span>
                <input name="endTime" type="time" />
              </label>
            </div>
            {error && (
              <p className="form-error full-row" role="alert">
                {error}
              </p>
            )}
            <div className="full-row">
              <button className="button primary" type="submit">
                <Icon name="plus" size={18} />
                Save Class
              </button>
            </div>
          </form>
        </section>
      )}
      <div className="section-heading">
        <h2>
          All classes <span className="count-chip">{classes.length}</span>
        </h2>
        <span>{selectedIds.length} selected for today</span>
      </div>
      <div className="schedule-list">
        {[...classes]
          .sort((a, b) => a.time.localeCompare(b.time))
          .map((item) => (
            <article
              className={`schedule-card card course-${item.color} ${selectedIds.includes(item.id) ? "attending" : ""}`}
              key={item.id}
            >
              <div className="schedule-time">
                <strong>{formatTime(item.time).split(" ")[0]}</strong>
                <span>{formatTime(item.time).split(" ")[1]}</span>
                <small>
                  {item.endTime
                    ? `until ${formatTime(item.endTime)}`
                    : "Start time"}
                </small>
              </div>
              <div className="schedule-class">
                <span className="course-code">{item.code || "YOUR CLASS"}</span>
                <h2>{item.name}</h2>
                <Link
                  className="location-link"
                  to={`/map?location=${item.locationId}`}
                >
                  <Icon name="pin" size={16} />
                  {getLocation(item.locationId)?.name}
                </Link>
                <div className="meeting-days">
                  {weekdays.map((day) => (
                    <span
                      className={item.days.includes(day) ? "meeting" : ""}
                      key={day}
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div className="schedule-actions">
                <label className="attend-toggle">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item.id)}
                    onChange={() => toggleClass(item.id)}
                  />
                  <span>Attending today</span>
                </label>
                <Link
                  className="button secondary small"
                  to={`/directions?to=${item.locationId}`}
                >
                  <Icon name="walk" size={18} />
                  Get Directions
                </Link>
              </div>
              <button
                className="icon-button delete-class"
                aria-label={`Remove ${item.name}`}
                onClick={() => {
                  removeClass(item.id);
                  setMessage(`${item.name} removed.`);
                }}
              >
                <Icon name="trash" size={18} />
              </button>
            </article>
          ))}
      </div>
      {!classes.length && (
        <div className="card empty-state">
          <span className="icon-tile pale-blue">
            <Icon name="calendar" size={30} />
          </span>
          <h2>A fresh start for your schedule.</h2>
          <p>Add a class to see its location and plan your walk.</p>
          <button className="button primary" onClick={() => setAdding(true)}>
            Add your first class
            <Icon name="plus" size={18} />
          </button>
        </div>
      )}
      {selectedIds.length > 0 && (
        <div className="selection-summary card">
          <span className="icon-tile pale-green">
            <Icon name="check" />
          </span>
          <div>
            <strong>Your campus day is taking shape.</strong>
            <p>
              {selectedIds.length}{" "}
              {selectedIds.length === 1 ? "class" : "classes"} selected for
              today. These selections reset on a new day.
            </p>
          </div>
          <Link className="text-link" to="/">
            View dashboard
            <Icon name="arrow" size={18} />
          </Link>
        </div>
      )}
    </>
  );
}
