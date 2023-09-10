import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminHeader from '../admin-components/header/AdminHeader';

import Users from '../admin-components/users/Users';
import Services from '../admin-components/services/Services';
import Posts from '../admin-components/posts/Posts';
import Messeges from '../admin-components/messeges/Messeges';
import HelpCenter from '../admin-components/help-center/HelpCenter';
import Advertisement from '../admin-components/advertisement/Advertisement';
import Activities from '../admin-components/activities/Activities';
import AdminPanel from '../admin-components/admin-panel/AdminPanel';

const AdminRouter = () => {
  return (
    <div>
      <AdminHeader />
      <Routes>
        <Route path="users" element={<ProtectedRoute element={<Users />} />} />
        <Route path="services/*" element={<ProtectedRoute element={<Services />} />} />
        <Route path="posts" element={<ProtectedRoute element={<Posts />} />} />
        <Route path="messeges" element={<ProtectedRoute element={<Messeges />} />} />
        <Route path="helpcenter" element={<ProtectedRoute element={<HelpCenter />} />} />
        <Route path="advertisement" element={<ProtectedRoute element={<Advertisement />} />} />
        <Route path="activities" element={<ProtectedRoute element={<Activities />} />} />
        <Route path="adminpanel" element={<ProtectedRoute element={<AdminPanel />} />} />
        <Route path="*" element={<ProtectedRoute element={<AdminPanel />} />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
