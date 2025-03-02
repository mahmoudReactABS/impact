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
import StudentsBooking from './pages/dashboard/StudentsBooking';
import CoursesPlans from './pages/dashboard/CoursesPlans';
import EditCourse from './Components/dashboard/EditCourse';
import AddCourse from './Components/dashboard/AddCourse';

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <AuthProvider>
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
            <Route index element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="settings" element={<ProtectedRoute element={<Settings />} />} />
            <Route path="settings/AddNew" element={<ProtectedRoute element={<AddNewAdmin />} />} />
            <Route path="settings/UpdateAdmin" element={<ProtectedRoute element={<EditAdmin />} />} />
            <Route path="requests" element={<ProtectedRoute element={<Requests />} />} />
            <Route path="booking" element={<ProtectedRoute element={<StudentsBooking />} />} />
            <Route path="courses" element={<ProtectedRoute element={<CoursesPlans />} />} />
            <Route path="courses/editcourse" element={<ProtectedRoute element={<EditCourse />} />} />
            <Route path="courses/addcourse" element={<ProtectedRoute element={<AddCourse />} />} />
          </Route>

          <Route path="/dash/login" element={<LoginLayout />}>
            <Route index element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;