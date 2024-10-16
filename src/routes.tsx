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

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <Routes>
        <Route path={appLink.dashboard.href} index element={<DashboardPage />} />
        <Route path='/' element={<Navigate to={appLink.dashboard.href} />} />
        <Route path={appLink.programs.href} element={<ProgramsPage />} />
        <Route path={appLink.programDetail(':slug', '').href} element={<ProgramDetail />} />
        <Route path={appLink.addProgram().href} element={<ProgramCreate />} />
        <Route path={appLink.programEdit(':slug').href} element={<ProgramEdit />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
