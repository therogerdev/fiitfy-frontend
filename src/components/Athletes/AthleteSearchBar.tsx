import { Input } from '../ui/input';

const AthleteSearchBar = () => {
  return (
    <div className='mt-0'>
      <Input
        type='text'
        placeholder='Search by name, phone or email'
        className='flex-grow h-12'
      />
    </div>
  );
};

export default AthleteSearchBar;
