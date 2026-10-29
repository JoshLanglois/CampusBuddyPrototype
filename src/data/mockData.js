export const campus = "University of West Florida";

// All locations and routes are illustrative, not verified UWF geography.
export const buildings = [
  {
    id: "building-4",
    name: "Building 4",
    shortName: "Building 4",
    area: "Central campus",
    kind: "Academic building",
    x: 43,
    y: 34,
  },
  {
    id: "science",
    name: "Science & Engineering Building",
    shortName: "Science & Engineering",
    area: "East campus",
    kind: "Academic building",
    x: 72,
    y: 49,
  },
  {
    id: "academic",
    name: "Example Academic Building",
    shortName: "Academic Building",
    area: "South campus",
    kind: "Academic building",
    x: 51,
    y: 77,
  },
  {
    id: "library",
    name: "John C. Pace Library",
    shortName: "Pace Library",
    area: "Central campus",
    kind: "Library",
    x: 49,
    y: 54,
  },
  {
    id: "commons",
    name: "University Commons",
    shortName: "University Commons",
    area: "West campus",
    kind: "Student center",
    x: 28,
    y: 58,
  },
];

export const parkingLots = [
  {
    id: "lot-a",
    name: "Parking Lot A",
    shortName: "Lot A",
    area: "North campus",
    kind: "Parking",
    status: "Available",
    spaces: 42,
    capacity: 120,
    nearby: ["building-4", "library"],
    info: "A convenient starting point for the central campus walkway. Permit requirements are illustrative; check official university information before parking.",
    x: 24,
    y: 25,
  },
  {
    id: "lot-b",
    name: "Parking Lot B",
    shortName: "Lot B",
    area: "Central campus",
    kind: "Parking",
    status: "Limited",
    spaces: 8,
    capacity: 90,
    nearby: ["science", "library"],
    info: "Close to the academic core. Allow extra time to find a space in this simulated busy lot.",
    x: 83,
    y: 25,
  },
  {
    id: "lot-c",
    name: "Parking Lot C",
    shortName: "Lot C",
    area: "South campus",
    kind: "Parking",
    status: "Full",
    spaces: 0,
    capacity: 75,
    nearby: ["academic", "commons"],
    info: "No spaces available in this demonstration. Try Lot A for a simulated alternative.",
    x: 26,
    y: 83,
  },
];

export const locations = [...buildings, ...parkingLots];
export const getLocation = (id) =>
  locations.find((location) => location.id === id);
export const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const sampleClasses = [
  {
    id: "class-se",
    name: "Software Engineering",
    code: "CEN 3031",
    locationId: "building-4",
    days: ["Mon", "Wed"],
    time: "10:00",
    endTime: "11:15",
    color: "blue",
  },
  {
    id: "class-cs",
    name: "Computer Science",
    code: "COP 3530",
    locationId: "science",
    days: ["Tue", "Thu"],
    time: "13:00",
    endTime: "14:15",
    color: "green",
  },
  {
    id: "class-math",
    name: "Mathematics",
    code: "MAC 2311",
    locationId: "academic",
    days: ["Fri"],
    time: "09:00",
    endTime: "09:50",
    color: "purple",
  },
];

export const conditions = [
  {
    id: "condition-1",
    type: "Traffic",
    location: "Main campus entrance",
    description:
      "A little busier than usual. Allow a few extra minutes for your arrival.",
    status: "Moderate",
    icon: "traffic",
  },
  {
    id: "condition-2",
    type: "Construction",
    location: "Near Building 4",
    description:
      "Example road work near the academic buildings. Use the central campus walkway.",
    status: "Caution",
    icon: "construction",
  },
  {
    id: "condition-3",
    type: "Walkway closure",
    location: "South campus path",
    description:
      "A section of the walkway is temporarily closed in this demo. Follow the alternate path.",
    status: "Closure",
    icon: "warning",
  },
  {
    id: "condition-4",
    type: "Traffic",
    location: "North campus / Lot A",
    description: "Traffic is moving smoothly near the north parking area.",
    status: "Clear",
    icon: "traffic",
  },
];

export const initialReports = [
  {
    id: "report-1",
    type: "Construction",
    locationId: "building-4",
    description:
      "Work near the entrance to Building 4. The central path is open.",
    submittedAt: "2026-10-28T13:10:00-05:00",
    sample: true,
  },
  {
    id: "report-2",
    type: "Closed Walkway",
    locationId: "academic",
    description:
      "The south walkway is closed in this demo. Use the marked alternate path.",
    submittedAt: "2026-10-28T12:45:00-05:00",
    sample: true,
  },
  {
    id: "report-3",
    type: "Traffic Problem",
    locationId: "lot-b",
    description: "A short line of cars is waiting to enter Lot B.",
    submittedAt: "2026-10-28T12:20:00-05:00",
    sample: true,
  },
];

// A deliberately small set of supported demo routes; reverse routes are also supported.
export const walkingRoutes = [
  {
    from: "lot-a",
    to: "building-4",
    minutes: 4,
    distance: "0.2 mi",
    steps: [
      "Exit Parking Lot A toward the north campus walkway.",
      "Follow the path east toward Building 4.",
      "Use the marked central entrance to Building 4.",
    ],
  },
  {
    from: "lot-a",
    to: "science",
    minutes: 7,
    distance: "0.3 mi",
    steps: [
      "Leave Parking Lot A using the main pedestrian exit.",
      "Follow the central campus path past Building 4.",
      "Continue east past the library.",
      "Arrive at the Science & Engineering Building entrance.",
    ],
  },
  {
    from: "lot-a",
    to: "library",
    minutes: 5,
    distance: "0.2 mi",
    steps: [
      "Exit Parking Lot A toward the central walkway.",
      "Continue south past Building 4.",
      "Follow the path to the Pace Library entrance.",
    ],
  },
  {
    from: "lot-a",
    to: "academic",
    minutes: 9,
    distance: "0.4 mi",
    steps: [
      "Take the main pedestrian exit from Parking Lot A.",
      "Continue along the central path toward the library.",
      "Follow the alternate path around the example south walkway closure.",
      "Arrive at the Example Academic Building.",
    ],
  },
  {
    from: "lot-a",
    to: "commons",
    minutes: 5,
    distance: "0.2 mi",
    steps: [
      "Exit Parking Lot A at the south pedestrian gate.",
      "Follow the west campus path.",
      "Enter University Commons from the central courtyard.",
    ],
  },
  {
    from: "lot-b",
    to: "science",
    minutes: 3,
    distance: "0.1 mi",
    steps: [
      "Leave Parking Lot B via the south pedestrian exit.",
      "Follow the east campus walkway.",
      "Arrive at the Science & Engineering Building.",
    ],
  },
  {
    from: "lot-b",
    to: "library",
    minutes: 6,
    distance: "0.3 mi",
    steps: [
      "Take the south walkway out of Parking Lot B.",
      "Pass the Science & Engineering Building.",
      "Turn west toward the Pace Library entrance.",
    ],
  },
  {
    from: "lot-c",
    to: "academic",
    minutes: 4,
    distance: "0.2 mi",
    steps: [
      "Leave Parking Lot C using the east exit.",
      "Use the alternate walkway around the example closure.",
      "Arrive at the Example Academic Building.",
    ],
  },
  {
    from: "lot-c",
    to: "commons",
    minutes: 4,
    distance: "0.2 mi",
    steps: [
      "Exit Parking Lot C toward the north.",
      "Continue along the west campus path.",
      "Arrive at University Commons.",
    ],
  },
  {
    from: "library",
    to: "building-4",
    minutes: 3,
    distance: "0.1 mi",
    steps: [
      "Exit the library toward the north campus path.",
      "Continue north along the central walkway.",
      "Arrive at Building 4.",
    ],
  },
  {
    from: "library",
    to: "science",
    minutes: 4,
    distance: "0.2 mi",
    steps: [
      "Leave the library through the east entrance.",
      "Follow the east campus walkway.",
      "Arrive at the Science & Engineering Building.",
    ],
  },
];

export function findRoute(from, to) {
  const direct = walkingRoutes.find(
    (route) => route.from === from && route.to === to,
  );
  if (direct) return direct;
  const reverse = walkingRoutes.find(
    (route) => route.to === from && route.from === to,
  );
  if (!reverse) return null;
  const start = getLocation(from).name;
  const destination = getLocation(to).name;
  return {
    from,
    to,
    minutes: reverse.minutes,
    distance: reverse.distance,
    steps: [
      `Leave ${start} using the pedestrian exit.`,
      `Follow the illustrated campus path from ${start} toward ${destination}.`,
      `Arrive at ${destination}.`,
    ],
  };
}

export function formatTime(value) {
  const [hours, minutes] = value.split(":").map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`;
}

export function todayKey() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

export function nextClass(classes, selectedIds = []) {
  const now = new Date();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const candidates = classes.flatMap((item) => {
    const [hour, minute] = item.time.split(":").map(Number);
    const start = hour * 60 + minute;
    for (let offset = 0; offset < 8; offset++) {
      const targetDay = weekdays[(((now.getDay() + 6) % 7) + offset) % 7];
      const attends =
        item.days.includes(targetDay) ||
        (offset === 0 && selectedIds.includes(item.id));
      if (attends && (offset > 0 || start >= minutes))
        return [
          {
            ...item,
            offset,
            startsIn: offset * 1440 + start - minutes,
            day: offset === 0 ? "Today" : offset === 1 ? "Tomorrow" : targetDay,
          },
        ];
    }
    return [];
  });
  return candidates.sort((a, b) => a.startsIn - b.startsIn)[0] || null;
}
