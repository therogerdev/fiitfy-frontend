import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai'; // Import Jotai Provider
import './App.css';
import ProgramList from './components/Programs/ProgramList';
import { Button } from './components/ui/button';
import Counter from './components/Counter';

// Create a client for React Query
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <div className='App'>
          <Counter />
          <ProgramList />
          <Button>Click me</Button>
        </div>
      </JotaiProvider>
    </QueryClientProvider>
  );
}

export default App;
