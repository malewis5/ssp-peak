import styles from '@/styles/Home.module.css';
import { Table } from '@/components/table';
import { Button } from '@mui/material';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';

const routes = [
  'people',
  'films',
  'starships',
  'vehicles',
  'species',
  'planets',
];

export default function Home(props: any) {
  return (
    <>
      <main className={styles.main}>
        <Table route={props.route} page={props.page} />
        <ul>
          {routes.map((item: string) => {
            return (
              <li key={item}>
                <Link href={`/table/${item}?page=0`}>
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { route, page } = context.query;
  return {
    props: { route: route, page: page },
  };
};
