import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai'; // Import Jotai Provider
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import ErrorBoundary from './components/Error/ErrorBoundary';
import AppRoutes from './routes';
import AppLayout from './components/ui/app-layout';
// Create a client for React Query
const queryClient = new QueryClient();

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
