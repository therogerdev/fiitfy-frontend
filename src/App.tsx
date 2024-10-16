import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai'; // Import Jotai Provider
import './App.css';
import Counter from './components/Counter';
import ErrorBoundary from './components/Error/ErrorBoundary';
import ProgramList from './components/Programs/ProgramList';
import { Button } from '@ui/button';

// Create a client for React Query
const queryClient = new QueryClient();



function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ErrorBoundary>
          <div>
            <Counter />
            <ProgramList />
            <Button>Click me</Button>
          </div>
        </ErrorBoundary>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
