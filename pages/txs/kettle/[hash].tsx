import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const KettleTxs = dynamicPage(() => import('ui/pages/KettleTxs'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/txs/kettle/[hash]" query={ props.query }>
      <KettleTxs/>
    </PageNextJs>
  );
};

export default Page;

export { suave as getServerSideProps } from 'nextjs/getServerSideProps/main';
