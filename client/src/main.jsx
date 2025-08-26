import { StrictMode} from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import App from './App.jsx';

// === Student Components ===
import SignupForm from './components/Student/SignUp-Login/jsx/SignUpForm.jsx';
import LoginPage from './components/Student/SignUp-Login/jsx/LoginForm.jsx';
import ForgetPassword from './components/Student/SignUp-Login/jsx/ForgetPassword.jsx';
import EmailVerificationOTP from './components/Student/SignUp-Login/jsx/EmailVerificationOTP.jsx';
import PasswordOTP from './components/Student/SignUp-Login/jsx/PasswordOTP.jsx';
import NewPassword from './components/Student/SignUp-Login/jsx/NewPassword.jsx';
import StudentHome from './components/Student/Home/jsx/StudentHome.jsx';
import CourseListPage from './components/Student/Course/jsx/CourseListPage.jsx';
import CourseDetailsPage from './components/Student/CourseDetails/CourseDetailsPage.jsx';
import ProtectedRouteStudent from './components/Student/SignUp-Login/jsx/ProtectedRouteStudent.jsx';


// === Teacher Components ===
import LoginPageTeacher from './components/Teacher/SignUp-Login/jsx/LoginForm.jsx';
import SignupFormTeacher from './components/Teacher/SignUp-Login/jsx/SignUpForm.jsx';
import ForgetPasswordTeacher from './components/Teacher/SignUp-Login/jsx/ForgetPassword.jsx';
import EmailVerificationOTPTeacher from './components/Teacher/SignUp-Login/jsx/EmailVerificationOTP.jsx';
import PasswordOTPTeacher from './components/Teacher/SignUp-Login/jsx/PasswordOTP.jsx';
import NewPasswordTeacher from './components/Teacher/SignUp-Login/jsx/NewPassword.jsx';
import TeacherHome from './components/Teacher/TeacherHome/jsx/TeacherHome.jsx';
import CourseDetails from './components/Teacher/TeacherHome/jsx/CourseDetails.jsx';
import CourseForm from './components/Teacher/TeacherHome/jsx/CourseForm.jsx';
import ProtectedRouteTeacher from './components/Teacher/SignUp-Login/jsx/ProtectedRouteTeacher.jsx';

//===Home page===
import HomePage from './components/Front-Page/jsx/HomePage.jsx';
import AboutUsPage from './components/Front-Page/jsx/AboutUs.jsx';
import WhyUsPage from './components/Front-Page/jsx/WhyUs.jsx';
import OurGoalPage from './components/Front-Page/jsx/OurGoal.jsx';
import ContactUsPage from './components/Front-Page/jsx/Contact.jsx';

//===Admin Components===
import AdminLogin from './components/Admin/jsx/AdminLogin.jsx';
import AdminHome from './components/Admin/jsx/AdminHome.jsx';
import ProtectedRouteAdmin from './components/Admin/jsx/ProtectedRouteAdmin.jsx';



// === Grouped Student Routes ===
const studentRoutes = [
  { path: "/students/home", element: <ProtectedRouteStudent><StudentHome /></ProtectedRouteStudent> },
  { path: "/students/courses", element: <ProtectedRouteStudent><CourseListPage /></ProtectedRouteStudent> },
  { path: "/students/course-details", element: <ProtectedRouteStudent><CourseDetailsPage /></ProtectedRouteStudent> },
  { path: "/students/signup", element: <SignupForm /> },
  { path: "/students/login", element: <LoginPage /> },
  { path: "/students/forget-password", element: <ForgetPassword /> },
  { path: "/students/email-verification", element: <EmailVerificationOTP /> },
  { path: "/students/password-otp", element: <PasswordOTP /> },
  { path: "/students/reset-password", element: <NewPassword /> },
];

// === Grouped Teacher Routes ===
const teacherRoutes = [
  { path: "/teachers/login", element: <LoginPageTeacher /> },
  { path: "/teachers/signup", element: <SignupFormTeacher /> },
  { path: "/teachers/forget-password", element: <ForgetPasswordTeacher /> },
  { path: "/teachers/email-verification", element: <EmailVerificationOTPTeacher /> },
  { path: "/teachers/password-otp", element: <PasswordOTPTeacher /> },
  { path: "/teachers/reset-password", element: <NewPasswordTeacher /> },
  { path: "/teachers/home", element: <ProtectedRouteTeacher><TeacherHome /></ProtectedRouteTeacher> },
  { path: "/teachers/course-details", element: <ProtectedRouteTeacher><CourseDetails /></ProtectedRouteTeacher> },
  { path: "/teachers/add-course", element: <ProtectedRouteTeacher><CourseForm /></ProtectedRouteTeacher> },
];

// ===Nav menus ===
const navMenus = [
  { path: "/home", element: <HomePage /> },
  { path: "/about-us", element: <AboutUsPage /> },
  { path: "/why-us", element: <WhyUsPage /> },
  { path: "/our-goal", element: <OurGoalPage /> },
  { path: "/contact-us", element: <ContactUsPage /> },
]

//===Admin routes===
const adminRoutes=[
  {path:"/admins/login",element: <AdminLogin />},
  {path:"/admins/home",element: <ProtectedRouteAdmin><AdminHome /></ProtectedRouteAdmin>},
]


// === Final Router Setup ===
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      ...studentRoutes,
      ...teacherRoutes,
      ...navMenus,
      ...adminRoutes,
    ],
  },
]);

// === Render App ===
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
      <RouterProvider router={router} />
        <div style={{ position: 'fixed', top: 50, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          <ToastContainer position="top-center" closeOnClick draggable={false} pauseOnHover autoClose={3000} />
        </div>
    </>
  </StrictMode>
);