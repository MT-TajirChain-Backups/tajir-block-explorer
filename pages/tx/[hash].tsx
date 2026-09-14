import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const Transaction = dynamicPage(() => {
  return import('ui/pages/Transaction');
});

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/tx/[hash]" query={ props.query }>
      <Transaction/>
    </PageNextJs>
  );
};

export default Page;

export { tx as getServerSideProps } from 'nextjs/getServerSideProps/main';
