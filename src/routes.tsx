// src/routes.tsx
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProgramCreate from './components/Programs/ProgramCreate';
import ProgramEdit from './components/Programs/ProgramEdit';
import DashboardPage from './pages/DashboardPage';
import ProgramsPage from './pages/ProgramsPage';

// Import appLink from your links.ts
import { ProtectedRoute } from './auth/ProtectedRoute';
import Spinner from './components/ui/spinner';
import { appLink } from './config/links';
import Login from './pages/LoginPage';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import ProgramDetailPage from './pages/ProgramDetailPage';

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
            element={<ProgramCreate />}
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
        <Route path={appLink.login.href} element={<Login />} />
        <Route path='*' element={<div>404 Not Found</div>} />
        <Route
          path={appLink.forgotPassword.href}
          element={<RecoverPasswordPage />}
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
