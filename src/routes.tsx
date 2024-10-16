// src/routes.tsx
import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProgramDetail from './components/Error/ProgramDetail';
import ProgramCreate from './components/Programs/ProgramCreate';
import ProgramEdit from './components/Programs/ProgramEdit';
import DashboardPage from './pages/DashboardPage';
import ProgramsPage from './pages/ProgramsPage';

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>loading....</div>}>
      <Routes>
        <Route path='/dashboard' index element={<DashboardPage />} />
        <Route path='/' element={<Navigate to={'/dashboard'} />} />
        <Route path='/programs' element={<ProgramsPage />} />
        <Route path='/program/:slug' element={<ProgramDetail />} />
        <Route path='/program/new' element={<ProgramCreate />} />

        <Route path='/program/:slug/edit' element={<ProgramEdit />} />
        <Route path='*' element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
