import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import AdminHeader from '../admin-components/header/AdminHeader';
import { AdminPanel } from '../admin-components/admin-panel/AdminPanel';
// import { Users } from '../admin-components/users/Users';
// import { Services } from '../admin-components/services/Services';
// import { Posts } from '../admin-components/posts/Posts';
// import { HelpCenter } from '../admin-components/help-center/HelpCenter';
// import { Messeges } from '../admin-components/messeges/Messeges';
// import { Advertisement } from '../admin-components/advertisement/Advertisement';
// import {Activities} from '../admin-components/activities/Activities';
// import { Activities } from '../admin-components/activities/Activities';
const Users = lazy(() => import('../admin-components/users/Users').then(({ Users }) => ({ default: Users })));
const Services = lazy(() => import('../admin-components/services/Services').then(({ Services }) => ({ default: Services })));
const Posts = lazy(() => import('../admin-components/posts/Posts').then(({ Posts }) => ({ default: Posts })));
const Messeges = lazy(() => import('../admin-components/messeges/Messeges').then(({ Messeges }) => ({ default: Messeges })));
const HelpCenter = lazy(() => import('../admin-components/help-center/HelpCenter').then(({ HelpCenter }) => ({ default: HelpCenter })));
const Advertisement = lazy(() => import('../admin-components/advertisement/Advertisement').then(({ Advertisement }) => ({ default: Advertisement })));
const Activities = lazy(() => import('../admin-components/activities/Activities').then(({ Activities }) => ({ default: Activities })));


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
        <Route path="activities/*" element={<ProtectedRoute element={<Activities />} />} />
        <Route path="adminpanel" element={<ProtectedRoute element={<AdminPanel />} />} />
        <Route path="*" element={<ProtectedRoute element={<AdminPanel />} />} />
      </Routes>
    </div>
  );
};

export default AdminRouter;
