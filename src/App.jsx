import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import AdminLayout from './Components/AdminLayout';
import AdminLogin from './Components/AdminLogin';
import ProtectedAdminRoute from './Components/ProtectedAdminRoute';
import SubcategoryDetail from './Components/SubcategoryDetail';
import TopicDetail from './Components/TopicDetail';
import CourseDetailPage from './Components/CourseDetailPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Show login form first */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* Actual admin dashboard (protected) */}
        <Route path="/admin/dashboard" element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        } />

        <Route path="/subcategory/:id" element={<SubcategoryDetail />} />
        <Route path="/topic/:topicId" element={<TopicDetail />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
      </Routes>
    </>
  );
}

export default App;
