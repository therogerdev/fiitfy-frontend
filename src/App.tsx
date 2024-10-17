import { QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai'; // Import Jotai Provider
import {
  BrowserRouter as Router,
  useLocation,
} from 'react-router-dom';

import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import AppLayout from './components/layouts/app-layout';
import { queryClient } from './config/queryClient';
import AppRoutes from './routes';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/login' && <AppLayout />}
      <AppRoutes />
    </>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ErrorBoundary>
          <Router>
            <AppContent />
          </Router>
        </ErrorBoundary>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
