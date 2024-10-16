import { Button } from './components/ui/button';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import './App.css';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='App'>
        <Button>Click me</Button>
      </div>
    </QueryClientProvider>
  );
}

export default App;
