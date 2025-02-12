import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import MainLayout from './Layouts/MainLayout';
import SubLayout from './Layouts/SubLayout';

import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import AppForm from './pages/AppForm';
import Courses from './pages/Courses';
import CourseDetails from './pages/info';
import Checkout from './pages/Checkout';
import FreeTest from './pages/FreeTest';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main layout for general pages */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseName" element={<CourseDetails />} />
        </Route>

        {/* Checkout page with a different layout */}
        <Route path="/" element={<SubLayout />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/bookTest" element={<FreeTest />} />
          <Route path="/ApplicationForm" element={<AppForm />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
