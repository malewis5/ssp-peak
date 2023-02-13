import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Table } from '@/components/table';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import { Button } from '@mui/material';

// Create a client
const queryClient = new QueryClient();

const routes = [
  'people',
  'films',
  'starships',
  'vehicles',
  'species',
  'planets',
];

export default function Home() {
  const [route, setRoute] = useState('people');
  return (
    <>
      <Head>
        <title>SSP with React Query</title>
        <meta name="description" content="Created by Peak Activity" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <main className={styles.main}>
          <Table route={route} />
          <ul>
            {routes.map((item: string) => {
              return (
                <li onClick={() => setRoute(item)} key={item}>
                  <Button>{item}</Button>
                </li>
              );
            })}
          </ul>
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
