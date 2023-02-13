import { DataGrid, GridValidRowModel } from '@mui/x-data-grid';
import axios from 'axios';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

export const fetchData = async (
  page: number,
  route: string
): Promise<GridValidRowModel | undefined> => {
  page += 1; // SWAPI starts at 1 not 0.
  try {
    const response = await axios.get(
      `https://swapi.dev/api/${route}?page=${page}`,
      {}
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const Table = (props: { route: string }) => {
  const [page, setPage] = useState(0);
  const [rowCount, setRowCount] = useState(100);

  const { isLoading, data, isFetching } = useQuery(
    ['data', page, props.route],
    () =>
      fetchData(page, props.route).then((res) => {
        setRowCount(res?.count);
        return res;
      })
  );

  const createColumns = (data: any | undefined) => {
    const columnNames = Object.keys(data.results[0]);
    return columnNames.map((col) => {
      return {
        field: col,
        headerName: col,
        flex: 1,
      };
    });
  };

  return (
    <>
      <h1 style={{ textTransform: 'capitalize' }}>Star Wars {props.route}</h1>
      <DataGrid
        getRowId={() => uuidv4()}
        rowCount={rowCount}
        paginationMode="server"
        pageSize={10}
        rowsPerPageOptions={[10]}
        onPageChange={(newPage) => {
          setPage(newPage);
          fetchData(newPage, props.route);
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
