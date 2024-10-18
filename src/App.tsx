import {
  QueryClientProvider
} from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai'; // Import Jotai Provider
import { BrowserRouter as Router, useLocation } from 'react-router-dom';

import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import AppLayout from './components/layouts/app-layout';
import { queryClient } from './config/queryClient';
import AppRoutes from './routes';

function AppWrapper() {
  const location = useLocation();

  // Check if the current route is either /login or /settings
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/settings' || location.pathname === '/recover-password';

  return (
    <>
      {/* Conditionally render AppLayout if not on /login or /settings */}
      {isAuthRoute ? (
        <AppRoutes />
      ) : (
        <AppLayout>
          <AppRoutes />
        </AppLayout>
      )}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ErrorBoundary>
          <Router>
            {/* Move useLocation logic inside AppWrapper */}
            <AppWrapper />
          </Router>
        </ErrorBoundary>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
