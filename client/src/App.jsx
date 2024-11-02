import { Route, Routes, Navigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import AccountPage from "./pages/AccountPage";
import { useContext } from "react";
import { UserContextProvider, UserContext } from "./UserContext";
import axios from "axios";
import PackageForm from "./components/PackageForm";
import CreateStaffAccount from "./components/staff/CreateStaffAccount";
import TrailsPage from "./pages/TrailsPage";
import { UserLocationProvider } from "./context/UserLocationContext";
import { Toaster } from "react-hot-toast";
import TravelAgencySignUp from "./pages/TravelAgencySignUp";
import BusinessDetails from "./pages/BusinessDetails";
import TrailDetail from "./components/trails/TrailDetails";
import AddPackageTrails from "./pages/AddPackageTrails";
import AdminTrailDetails from "./components/trails/AdminTrailDetails";
import CustomerPackageDetails from "./pages/CustomerPackageDetails";

// Set default axios settings
axios.defaults.baseURL = 'http://127.0.0.1:4000';
axios.defaults.withCredentials = true;

// A Higher-Order Component for protecting routes
function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <UserContextProvider>
      <UserLocationProvider>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/trails" element={<TrailsPage />} />
          <Route path="/trails/:id" element={<TrailDetail />} />
          <Route path="/trails/adminPackage/:id" element={<AdminTrailDetails />} />
          <Route path="/travelAgencySignUp" element={<TravelAgencySignUp />} />
          <Route path="/travelAgencySignUp/businessDetails" element={<BusinessDetails />} />
          <Route path="/bookings/packages/:packageId" element={<CustomerPackageDetails />}/>

            {/* Protect the user-profile route */}
            <Route path="/user-profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute> } />   
            <Route path="/account/:subpage?/:action?" element={
                <ProtectedRoute>
                  <AccountPage />
                </ProtectedRoute> } />
            <Route path="/account/events/add-event" element={
              <ProtectedRoute>
                <PackageForm />
              </ProtectedRoute> } />
            <Route path="/account/events/adminTrails" element={
              <ProtectedRoute>
                <AddPackageTrails />
              </ProtectedRoute> } />
            <Route path="/account/staff/add-staff" element={
              <ProtectedRoute>
                <CreateStaffAccount />
              </ProtectedRoute> } />
          </Route>
        </Routes>
      </UserLocationProvider>
    </UserContextProvider>
  );
}

export default App;
