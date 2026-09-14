import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const Epoch = dynamicPage(() => import('ui/pages/Epoch'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/epochs/[number]" query={ props.query }>
      <Epoch/>
    </PageNextJs>
  );
};

export default Page;

export { celo as getServerSideProps } from 'nextjs/getServerSideProps/main';
