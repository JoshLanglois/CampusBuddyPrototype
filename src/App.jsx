import { Navigate, Route, Routes } from "react-router-dom";
import { AppProvider, useApp } from "./state";
import Layout from "./components/Layout";
import Welcome, { Auth } from "./pages/Welcome";
import Home from "./pages/Home";
import Schedule from "./pages/Schedule";
import CampusMap from "./pages/CampusMap";
import Parking, { ParkingDetail } from "./pages/Parking";
import Directions from "./pages/Directions";
import Traffic from "./pages/Traffic";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { Link } from "react-router-dom";

function AppRoutes() {
  const { signedIn } = useApp();
  return (
    <Routes>
      <Route
        path="/welcome"
        element={signedIn ? <Navigate to="/" replace /> : <Welcome />}
      />
      <Route
        path="/login"
        element={signedIn ? <Navigate to="/" replace /> : <Auth />}
      />
      <Route
        path="/register"
        element={signedIn ? <Navigate to="/" replace /> : <Auth register />}
      />
      <Route
        element={signedIn ? <Layout /> : <Navigate to="/welcome" replace />}
      >
        <Route index element={<Home />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="map" element={<CampusMap />} />
        <Route path="parking" element={<Parking />} />
        <Route path="parking/:lotId" element={<ParkingDetail />} />
        <Route path="directions" element={<Directions />} />
        <Route path="conditions" element={<Traffic />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route
          path="*"
          element={
            <div className="empty-state">
              <h1>Let’s get you back on track.</h1>
              <p>This page isn’t part of the campus demo.</p>
              <Link className="button primary" to="/">
                Back to Home
              </Link>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
