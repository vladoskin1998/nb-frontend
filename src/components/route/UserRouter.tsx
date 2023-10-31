import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { UserHeader } from '../user-components/header/UserHeader';
import { FooterNav } from '../user-components/footer-navigate/FooterNav';
import { Messeges } from '../user-components/messeges/Messeges';
import { NewsFeeds } from '../user-components/newsfeed/NewsFeeds';
import { PublicationPostComments } from '../general-components/publication-lists/PublicationPostComments';


const UserRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="messeges/*" element={<ProtectedRoute element={<Messeges />} />} />
        <Route path="comments" element={<ProtectedRoute element={<PublicationPostComments />} />} />
        <Route path="posts" element={<ProtectedRoute element={<NewsFeeds />} />} />
        <Route path="*" element={<ProtectedRoute element={<NewsFeeds />} />} />
      </Routes>
    </div>
  );
};

export default UserRouter;
