import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const Cluster = dynamicPage(() => import('ui/pages/Cluster'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/name-services/clusters/[name]" query={ props.query }>
      <Cluster/>
    </PageNextJs>
  );
};

export default Page;

export { nameServiceClusters as getServerSideProps } from 'nextjs/getServerSideProps/main';
