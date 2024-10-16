import { useAtom } from 'jotai';
import { countAtom } from '../state/atom';
import { Button } from './ui/button';

const Counter = () => {
  const [count, setCount] = useAtom(countAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={() => setCount((c) => c + 1)}>
        Increment
      </Button>
    </div>
  );
};

export default Counter;
