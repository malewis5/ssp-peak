import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

export const fetchData = async (
  page: string,
  route: string
): Promise<GridValidRowModel | undefined> => {
  let pageInt = parseInt(page);
  pageInt += 1; // SWAPI starts at 1 not 0.
  try {
    const response = await axios.get(
      `https://swapi.dev/api/${route}?page=${pageInt}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataCount = async (data: any): Promise<any | undefined> => {
  try {
    return data.count;
  } catch (error) {
    console.log(error);
  }
};

export const Table = (props: any) => {
  const router = useRouter();

  const { isLoading, data, isFetching } = useQuery(
    ['data', props.page, props.route],
    () =>
      fetchData(props.page, props.route).then((res) => {
        return res;
      }),
    {
      cacheTime: 60 * 1000 * 15,
      staleTime: 60 * 100 * 10,
      keepPreviousData: true,
    }
  );

  const createColumns = (data: any | undefined) => {
    if (!data) return [];
    const columnNames = Object.keys(data.results[0]);
    return columnNames.map((col) => {
      return {
        field: col,
        headerName: col,
        flex: 0,
        sortable: false,
      };
    });
  };

  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>Star Wars {props.route}</h1>
      <DataGrid
        disableColumnMenu
        style={{ minHeight: '454px' }}
        getRowId={() => uuidv4()}
        rowCount={data?.count}
        paginationMode="server"
        pageSize={10}
        page={parseInt(props.page)}
        onPageChange={(newPage) => {
          router.replace({
            query: { ...router.query, page: newPage },
          });
        }}
        density="compact"
        loading={isLoading || isFetching}
        rows={data?.results ?? []}
        columns={createColumns(data)}
        autoHeight
      />
    </>
  );
};
