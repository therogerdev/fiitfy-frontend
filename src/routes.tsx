// src/routes.tsx
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProgramEdit from './components/Programs/ProgramEdit';
import DashboardPage from './pages/DashboardPage';
import ProgramsPage from './pages/ProgramsPage';

// Import appLink from your links.ts
import { ProtectedRoute } from './auth/ProtectedRoute';
import ProgramAdd from './components/Programs/ProgramCreate';
import Spinner from './components/ui/spinner';
import { appLink } from './config/links';
import Login from './pages/LoginPage';
import ProgramDetailPage from './pages/ProgramDetailPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import AthleteAreaPage from './pages/AthleteAreaPage';
import ClassPage from './pages/ClassPage';
import ClassDetail from './components/Class/ClassDetail';
import ClassCreate from './components/Class/ClassCreate';

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner size='md' containerHeight={400} />}>
      <Routes>
        {/* Protected Routes */}
        <Route
          path={appLink.dashboard.href}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path='/'
          element={<Navigate to={appLink.dashboard.href} />}
        />

        <Route
          path={appLink.programs.href}
          element={
            <ProtectedRoute>
              <ProgramsPage />
            </ProtectedRoute>
          }
        >
          <Route
            path={appLink.createPrograms.href}
            element={<ProgramAdd />}
          />
        </Route>
        <Route
          path={appLink.programDetail(':slug', '').href}
          element={
            <ProtectedRoute>
              <ProgramDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path={appLink.programEdit(':slug').href}
          element={
            <ProtectedRoute>
              <ProgramEdit />
            </ProtectedRoute>
          }
        />

        {/* Public Routes */}
        <Route path={appLink.classes.href} element={<ClassPage />}>
          <Route
            path={appLink.classDetail(':id', '').href}
            element={<ClassDetail />}
          />
          <Route
            path={appLink.createClass.href}
            element={<ClassCreate />}
          />
        </Route>
        <Route path={appLink.login.href} element={<Login />} />
        <Route path='*' element={<div>404 Not Found</div>} />
        <Route
          path={appLink.forgotPassword.href}
          element={<RecoverPasswordPage />}
        />
        <Route
          path={appLink.athletes.href}
          element={<AthleteAreaPage />}
        />
        <Route
          path={appLink.athlete(':id').href}
          element={<div>change it on routes file</div>}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
