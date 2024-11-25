import { Input } from "../ui/input";

interface AthleteSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AthleteSearchBar: React.FC<AthleteSearchBarProps> = ({
  searchQuery,
  setSearchQuery,
}) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="mt-0">
      <Input
        type="search"
        placeholder="Search by name, phone or email"
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex-grow h-12 bg-white border-t rounded-none"
      />
    </div>
  );
};

export default AthleteSearchBar;
