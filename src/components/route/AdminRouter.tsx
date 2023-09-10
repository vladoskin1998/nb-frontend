import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminHeader from '../admin-components/header/AdminHeader';
import { Suspense } from 'react';
const Users = lazy(() => import('../admin-components/users/Users'));
const Services = lazy(() => import('../admin-components/services/Services'));
const Posts = lazy(() => import('../admin-components/posts/Posts'));
const Messeges = lazy(() => import('../admin-components/messeges/Messeges'));
const HelpCenter = lazy(() => import('../admin-components/help-center/HelpCenter'));
const Advertisement = lazy(() => import('../admin-components/advertisement/Advertisement'));
const Activities = lazy(() => import('../admin-components/activities/Activities'));
const AdminPanel = lazy(() => import('../admin-components/admin-panel/AdminPanel'));

const AdminRouter = () => {
  return (
    <div>
        <AdminHeader />
        <Routes >
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
