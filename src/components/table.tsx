import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { columns } from './columns';
import { v4 as uuidv4 } from 'uuid';

export const fetchData = async (
  page: number
): Promise<GridValidRowModel | undefined> => {
  page += 1; // SWAPI starts at 1 not 0.
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people?page=${page}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Table = () => {
  const [page, setPage] = useState(0);

  const { isLoading, data, isFetching } = useQuery(
    ['data', page],
    () => fetchData(page),
    {
      keepPreviousData: true,
      staleTime: 10 * (60 * 1000), // 10 mins
      cacheTime: 15 * (60 * 1000), // 15 mins
    }
  );

  return (
    <DataGrid
      getRowId={() => uuidv4()}
      rowCount={82}
      paginationMode="server"
      pageSize={10}
      rowsPerPageOptions={[10]}
      onPageChange={(newPage) => {
        setPage(newPage);
        fetchData(newPage);
      }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
          quickFilterProps: { debounceMs: 500 },
        },
      }}
      density="compact"
      loading={isLoading || isFetching}
      rows={isLoading ? [] : data?.results}
      columns={columns}
      autoHeight
    />
  );
};
