import { locations, getLocation } from "../data/mockData";
import Icon from "./Icon";

export default function CampusSchematic({
  selectedId,
  onSelect,
  route,
  compact = false,
}) {
  const start = route && getLocation(route.from);
  const end = route && getLocation(route.to);
  return (
    <div className={`campus-map ${compact ? "compact-map" : ""}`}>
      <svg
        className="map-ground"
        viewBox="0 0 1000 670"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="map-grid"
            width="44"
            height="44"
            patternUnits="userSpaceOnUse"
          >
            <path d="M44 0H0V44" fill="none" stroke="#dce6dd" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1000" height="670" fill="#edf1e7" />
        <rect width="1000" height="670" fill="url(#map-grid)" />
        <path
          d="M760-50c-130 160 180 180 90 330S700 450 850 720"
          stroke="#cbded9"
          strokeWidth="100"
          fill="none"
        />
        <path
          d="M760-50c-130 160 180 180 90 330S700 450 850 720"
          stroke="#d5e6df"
          strokeWidth="80"
          fill="none"
        />
        <path
          d="M-40 90 350 105 650 75 1070 112M76 0 100 230 70 500 110 720M-10 607 400 590 740 630 1020 590"
          fill="none"
          stroke="#d4d9cf"
          strokeWidth="35"
        />
        <path
          d="M-40 90 350 105 650 75 1070 112M76 0 100 230 70 500 110 720M-10 607 400 590 740 630 1020 590"
          fill="none"
          stroke="#faf9f1"
          strokeWidth="23"
        />
        <path
          d="M230 165 430 228 490 362 720 328 830 165M490 362 510 515 260 555M280 389 490 362M430 228 440 110"
          stroke="#d4d8c6"
          strokeWidth="16"
          fill="none"
          strokeLinejoin="round"
        />
        <path
          d="M230 165 430 228 490 362 720 328 830 165M490 362 510 515 260 555M280 389 490 362M430 228 440 110"
          stroke="#fffdf4"
          strokeWidth="10"
          fill="none"
          strokeLinejoin="round"
        />
        <g fill="#d4dfca" stroke="#c9d6c0" strokeWidth="2">
          <rect x="365" y="175" width="118" height="65" rx="6" />
          <rect x="655" y="302" width="120" height="68" rx="6" />
          <rect x="442" y="334" width="86" height="66" rx="5" />
          <rect x="218" y="360" width="104" height="53" rx="6" />
          <rect x="453" y="480" width="115" height="64" rx="5" />
        </g>
        <g fill="#d0dac9">
          <rect x="190" y="121" width="96" height="78" rx="8" />
          <rect x="780" y="125" width="100" height="74" rx="8" />
          <rect x="207" y="517" width="100" height="72" rx="8" />
        </g>
        <g stroke="#f5f6ee" strokeWidth="3">
          <path d="M204 132v55m16-55v55m16-55v55m16-55v55m16-55v55M794 137v50m17-50v50m17-50v50m17-50v50m17-50v50M221 528v49m17-49v49m17-49v49m17-49v49m17-49v49" />
        </g>
        <g fill="#c3d6b8">
          <circle cx="158" cy="318" r="23" />
          <circle cx="195" cy="290" r="19" />
          <circle cx="326" cy="475" r="27" />
          <circle cx="605" cy="194" r="33" />
          <circle cx="568" cy="225" r="22" />
          <circle cx="640" cy="458" r="27" />
          <circle cx="680" cy="494" r="21" />
          <circle cx="352" cy="332" r="20" />
          <circle cx="935" cy="433" r="29" />
        </g>
        {start && end && (
          <path
            d={`M${start.x * 10} ${start.y * 6.7} L${start.x * 10} 362 L490 362 L${end.x * 10} 362 L${end.x * 10} ${end.y * 6.7}`}
            fill="none"
            stroke="#2a7798"
            strokeWidth="5"
            strokeDasharray="8 5"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <span className="map-road road-top">CAMPUS DRIVE</span>
      <span className="map-road road-bottom">UNIVERSITY PARKWAY</span>
      <span className="map-green-label">CAMPUS GREEN</span>
      {locations.map((location) => (
        <button
          key={location.id}
          className={`map-marker ${location.kind === "Parking" ? "parking-marker" : ""} ${selectedId === location.id ? "selected-marker" : ""} ${route && ![route.from, route.to].includes(location.id) ? "muted-marker" : ""}`}
          style={{ left: `${location.x}%`, top: `${location.y}%` }}
          aria-label={`Select ${location.name}`}
          aria-pressed={selectedId === location.id}
          onClick={() => onSelect?.(location.id)}
          disabled={!onSelect}
        >
          <span className="marker-icon">
            <Icon
              name={
                location.kind === "Parking"
                  ? "parking"
                  : location.id === "library"
                    ? "building"
                    : "cap"
              }
              size={compact ? 17 : 20}
            />
          </span>
          <span className="marker-label">{location.shortName}</span>
        </button>
      ))}
      <div className="map-compass">
        <span>N</span>
        <svg width="22" height="30" viewBox="0 0 22 30" aria-hidden="true">
          <path d="m11 0 8 26-8-6-8 6Z" fill="#25493d" />
          <path d="M11 0v20l8 6Z" fill="#b4c2af" />
        </svg>
      </div>
      <div className="map-key">
        <span>
          <i className="key-dot key-blue" />
          Academic
        </span>
        <span>
          <i className="key-dot key-green" />
          Parking
        </span>
      </div>
      <span className="map-disclaimer">Schematic map · Not to scale</span>
    </div>
  );
}
