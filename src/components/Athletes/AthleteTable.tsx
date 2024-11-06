import { apiClient } from '@/config/axios.config';
import { Athlete, AthleteResponse } from '@/types';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Table } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { EndpointType } from '@/types/api';
import { ScrollArea } from '@radix-ui/react-scroll-area';

interface AthleteTableProps {
  searchQuery: string;
  currentPage: number;
  rowsPerPage: number;
}

const fetchAthletes = async (
  searchQuery: string,
  currentPage: number,
  rowsPerPage: number
) => {
  const response = await apiClient.get(`${EndpointType.Athlete}/list`, {
    params: {
      search: searchQuery,
      page: currentPage,
      limit: rowsPerPage,
    },
  });
  return response.data;
};

const AthleteTable: React.FC<AthleteTableProps> = ({
  searchQuery,
  currentPage,
  rowsPerPage,
}) => {
  const {
    data: athletes,
    isLoading,
    error,
  } = useQuery<AthleteResponse>({
    queryKey: ['athletes', searchQuery, currentPage, rowsPerPage],
    queryFn: () =>
      fetchAthletes(searchQuery, currentPage, rowsPerPage),
  });

  if (isLoading) {
    return <div className='w-full h-10'>loading...</div>;
  }

  if (error) {
    return <div>Error loading athletes</div>;
  }

  return (
  <ScrollArea className='max-h-48'>
      <Table>
      <AthleteTableHeader />
      <tbody className='bg-white'>
        {athletes?.data.map((athlete: Athlete) => (
          <tr key={athlete.id} className='border-t'>
            <td className='px-4 py-2'>
              <div className='flex items-center'>
                <img
                  src={
                    athlete.profileImageUrl ||
                    '/https://hwchamber.co.uk/wp-content/uploads/2022/04/avatar-placeholder.gif'
                  }
                  alt={athlete.firstName}
                  className='w-8 h-8 mr-2 rounded-full'
                />
                <div>
                  <div className='font-medium'>{`${athlete.firstName} ${athlete.lastName}`}</div>
                  <div className='text-sm text-gray-500'>
                    {athlete.email}
                  </div>
                </div>
              </div>
            </td>
            <td className='px-4 py-2'>{athlete.gender || 'N/A'}</td>
            <td className='px-4 py-2'>{athlete.gender || 'N/A'}</td>
            <td className='px-4 py-2'>
              <Badge>Active</Badge>
            </td>
            <td className='px-4 py-2'>
              {/* Action Buttons (Edit, Delete, etc.) */}
              <div className='flex space-x-2'>
                <Button size={"sm"} variant={"outline"}>Edit</Button>
                <Button variant={"destructive"} size={"sm"}>Delete</Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </ScrollArea>
  );
};

export default AthleteTable;

const AthleteTableHeader: React.FC = () => {
  return (
    <thead>
      <tr className='bg-white border-b '>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Name
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Phone
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Phone
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Status
        </th>
        <th className='px-4 py-4 text-sm font-semibold text-left text-primary'>
          Actions
        </th>
      </tr>
    </thead>
  );
};
