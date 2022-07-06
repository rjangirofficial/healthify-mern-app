import React from 'react'
import { BrowserRouter, Routes, Route ,Navigate } from 'react-router-dom'
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import AdminBlogUpdate from './components/AdminBlogUpdate'
import Home from './components/Home';
import Blogs from './components/Blogs';
import PageNotFound from './components/PageNotFound';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/dashboard/edit/:id' element={<AdminBlogUpdate />} />
          <Route path='/blogs/:id' element={<Blogs />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='/admin/dashboard/edit' element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
