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

export const fetchDataCount = async (
  route: string
): Promise<any | undefined> => {
  try {
    const response = await axios.get(`https://swapi.dev/api/${route}?page=1`);
    console.log(response.data.count);
    return response.data.count;
  } catch (error) {
    console.log(error);
  }
};

export const Table = (props: any) => {
  const router = useRouter();

  const {
    isLoading: isDataLoading,
    data,
    isFetching: isDataFetching,
  } = useQuery(['data', props.page, props.route], () =>
    fetchData(props.page, props.route).then((res) => {
      return res;
    })
  );

  const {
    isLoading: isCountLoading,
    data: countData,
    isFetching: isCountFetching,
  } = useQuery(['count', props.route], () => {
    return fetchDataCount(props.route);
  });

  const createColumns = (data: any | undefined) => {
    if (!data) return [];
    const columnNames = Object.keys(data.results[0]);
    return columnNames.map((col) => {
      return {
        field: col,
        headerName: col,
        flex: 1,
      };
    });
  };

  const isLoading = isCountLoading || isDataLoading;
  const isFetching = isCountFetching || isDataFetching;

  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>Star Wars {props.route}</h1>
      <DataGrid
        style={{ minHeight: '454px' }}
        getRowId={() => uuidv4()}
        rowCount={countData}
        paginationMode="server"
        pageSize={10}
        page={props.page}
        rowsPerPageOptions={[10]}
        onPageChange={(newPage) => {
          props.setPage(newPage);
          router.replace({
            query: { ...router.query, page: newPage },
          });
        }}
        density="compact"
        loading={isLoading || isFetching}
        rows={isLoading ? [] : data?.results}
        columns={isLoading ? [] : createColumns(data)}
        autoHeight
      />
    </>
  );
};
