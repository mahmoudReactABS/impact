import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import MainLayout from './Layouts/MainLayout';
import SubLayout from './Layouts/SubLayout';

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
          <Route path="/dash/login" element={<Login />} />
        </Route>

        {/* Dashboard layout */}
        <Route path="/dash" element={<DashLayout />}>
          <Route index element={<HomePage />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;