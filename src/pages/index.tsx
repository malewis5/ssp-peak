import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useState } from 'react';
import { Button } from '@mui/material';

import Link from 'next/link';

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

      <main className={styles.main}>
        <ul>
          {routes.map((item: string) => {
            return (
              <li onClick={() => setRoute(item)} key={item}>
                <Link href={`/table/${item}`}>
                  <Button>{item}</Button>
                </Link>
              </li>
            );
          })}
        </ul>
      </main>
    </>
  );
}
