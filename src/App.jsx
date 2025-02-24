import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import SubLayout from './Layouts/SubLayout';
import LoginLayout from './Layouts/LoginLayout';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AppForm from './pages/AppForm';
import Courses from './pages/Courses';
import CourseDetails from './pages/info';
import Checkout from './pages/Checkout';
import FreeTest from './pages/FreeTest';
import Login from './pages/dashboard/Login';
import HomePage from './pages/dashboard/HomePage';
import DashLayout from './Layouts/DashLayout';
import Settings from './pages/dashboard/Settings';
import AddNewAdmin from './pages/dashboard/AddNewAdmin';
import EditAdmin from './pages/dashboard/EditAdmin';
import Requests from './pages/dashboard/Requests';
import TimePicker from './pages/dashboard/Time';
import StudentsBooking from './pages/dashboard/StudentsBooking';

function App() {

  return (
    <Router>
      <Routes>
        {/* Main layout for general pages */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="courses" element={<Courses />} />
          <Route path="courses/:courseName" element={<CourseDetails />} />
        </Route>

        {/* Checkout page with a different layout */}
        <Route path="/" element={<SubLayout />}>
          <Route path="checkout" element={<Checkout />} />
          <Route path="bookTest" element={<FreeTest />} />
          <Route path="ApplicationForm" element={<AppForm />} />
        </Route>

        {/* Dashboard layout */}
        <Route path="/dash" element={<DashLayout />}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/AddNew" element={<AddNewAdmin />} />
          <Route path="settings/UpdateAdmin" element={<EditAdmin />} />
          <Route path="requests" element={<Requests />} />
          <Route path="time" element={<TimePicker />} />
          <Route path="booking" element={<StudentsBooking />} />
        </Route>

        <Route path="/dash/login" element={<LoginLayout />}>
          <Route index element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;