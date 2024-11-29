import * as React from 'react';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { apiClient } from '@/config/axios.config';
import { Athlete, AthleteResponse } from '@/types';
import { EndpointType } from '@/types/api';

const fetchCoaches = async (): Promise<AthleteResponse> => {
  const response = await apiClient.get(`/${EndpointType.Athlete}/list?page=1&limit=10&isCoach=true`);
  return response.data
};

const CoachSelect: React.FC<{ onSelectCoach: (coach: Athlete) => void }> = ({ onSelectCoach }) => {
  const [open, setOpen] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState<Athlete | null>(null);

  const { data: coaches, isLoading, isError } = useQuery({
    queryKey: ['coaches'],
    queryFn: fetchCoaches,
  });

  if (isLoading) {
    return <div>Loading coaches...</div>;
  }

  if (isError) {
    return <div>Error loading coaches. Please try again later.</div>;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {selectedCoach ? selectedCoach.firstName + ' ' + selectedCoach.lastName : 'Select coach...'}
          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 ">
        <Command className='w-full '>
          <CommandInput placeholder="Search coach..." className="h-9" />
          <CommandList>
            <CommandEmpty>No coach found.</CommandEmpty>
            <CommandGroup>
              {coaches?.data?.map((coach) => (
                <CommandItem
                  key={coach.id}
                  value={coach.id}
                  onSelect={() => {
                    setSelectedCoach(coach);
                    onSelectCoach(coach);
                    setOpen(false);
                  }}
                >
                  {coach.firstName} {coach.lastName}
                  <CheckIcon
                    className={cn(
                      'ml-auto h-4 w-4',
                      selectedCoach?.id === coach.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CoachSelect;
