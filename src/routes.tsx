// src/routes.tsx
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProgramDetail from './components/Error/ProgramDetail';
import ProgramCreate from './components/Programs/ProgramCreate';
import ProgramEdit from './components/Programs/ProgramEdit';
import DashboardPage from './pages/DashboardPage';
import ProgramsPage from './pages/ProgramsPage';

// Import appLink from your links.ts
import { appLink } from './config/links';
import Spinner from './components/ui/spinner';
import Login from './pages/LoginPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner size="md" containerHeight={400} />}>
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
          path="/"
          element={<Navigate to={appLink.dashboard.href} />}
        />
        <Route
          path={appLink.programs.href}
          element={
            <ProtectedRoute>
              <ProgramsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path={appLink.programDetail(':slug', '').href}
          element={
            <ProtectedRoute>
              <ProgramDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={appLink.addProgram().href}
          element={
            <ProtectedRoute>
              <ProgramCreate />
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
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
