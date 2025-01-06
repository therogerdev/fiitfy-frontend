import { Input } from "../ui/input";

export function SearchLayout() {
    return (
      <div>
        <Input
          type='search'
          placeholder='Search...'
          className='md:w-[100px] lg:w-[300px] hidden md:block'
        />
      </div>
    );
  }
