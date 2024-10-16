import {
  QueryClientProvider
} from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai'; // Import Jotai Provider
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import AppLayout from './components/layouts/app-layout';
import { queryClient } from './config/queryClient';
import AppRoutes from './routes';



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ErrorBoundary>
          <Router>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </Router>
        </ErrorBoundary>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
