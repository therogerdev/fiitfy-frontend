import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import './App.css';
import ProgramList from './components/Programs/ProgramList';
import { Button } from './components/ui/button';

// Create a client
const queryClient = new QueryClient();

function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <ProgramList />
        <Button>Click me</Button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
