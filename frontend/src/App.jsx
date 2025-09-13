import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import useAuth from './context/useAuth';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import AdminDashboard from './pages/admin/AdminDashboard';
import StudentDashboard from './pages/student/StudentDashboard';
import TutorDashboard from './pages/tutor/TutorDashboard';
import Home from './pages/Home';
import Spinner from './components/Spinner';
import PendingTutors from './pages/admin/PendingTutors';
import Courses from './pages/admin/Courses';
import AddCourse from './pages/tutor/AddCourse';
import ViewEarnings from './pages/tutor/ViewEarnings';
import EngagedStudents from './pages/tutor/EngagedStudents';
import Ratings from './pages/tutor/Ratings';
import TutorVerification from './pages/tutor/TutorVerification';
import TutorCourses from './pages/tutor/TutorCourses';
import EditCourse from './pages/tutor/EditCourse';
import StudentVerificationForm from './pages/student/StudentVerificationForm';
import EditStudentProfile from './pages/student/EditProfile';
import StudentCourseDetail from './pages/student/StudentCourseDetail';
import PurchasedCourses from './pages/student/PurchasedCourses';
import EditTutorProfile from './pages/tutor/EditTutorProfile';
import ScheduleClass from './pages/tutor/ScheduleClass';
import TutorClasses from './pages/tutor/TutorClasses';
import Reports from './pages/admin/Reports';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTutors from './pages/admin/AdminTutors';
import MonthlyRevenueReport from './pages/admin/MonthlyRevenueReport';
import CourseList from './pages/CourseList';
//import ClassRoom from './pages/tutor/ClassRoom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />;

  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role))
    return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route path="/tutor/students" element={<EngagedStudents />} />
          <Route path="/tutor/ratings" element={<Ratings />} />

          <Route path="/tutor/edit-course/:id" element={<EditCourse />} />

          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/pending-tutors"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <PendingTutors />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/all-courses"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Courses />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <Reports />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/students"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminStudents />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/tutors"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <AdminTutors />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/reports/monthly-revenue"
            element={
              <PrivateRoute allowedRoles={['admin']}>
                <MonthlyRevenueReport />
              </PrivateRoute>
            }
          />
          <Route
            path="/student"
            element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/verify"
            element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentVerificationForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/edit-profile"
            element={
              <PrivateRoute allowedRoles={['student']}>
                <EditStudentProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/courses/:id"
            element={
              <PrivateRoute allowedRoles={['student']}>
                <StudentCourseDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/student/purchased"
            element={
              <PrivateRoute allowedRoles={['student']}>
                <PurchasedCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <TutorDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor/verify"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <TutorVerification />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor/add-course"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <AddCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor/my-courses"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <TutorCourses />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor/edit-course/:id"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <EditCourse />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor/earnings"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <ViewEarnings />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor/engaged-students"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <EngagedStudents />
              </PrivateRoute>
            }
          />
          <Route
            path="/tutor/edit-profile"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <EditTutorProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="/tutor/schedule-class"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <ScheduleClass />
              </PrivateRoute>
            }
          />

          <Route
            path="/tutor/my-classes"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <TutorClasses />
              </PrivateRoute>
            }
          />

          {/* <Route
            path="/tutor/class-room/:id"
            element={
              <PrivateRoute allowedRoles={['tutor']}>
                <ClassRoom />
              </PrivateRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
