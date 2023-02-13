import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { Table } from '@/components/table';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Create a client
const queryClient = new QueryClient();

export default function Home() {
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
          <h1>Star Wars Characters</h1>
          <Table />
        </main>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}
