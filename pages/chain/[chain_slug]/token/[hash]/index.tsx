import type { NextPage } from 'next';
import React from 'react';

import type { Route } from 'nextjs-routes';
import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const OpSuperchainToken = dynamicPage(() => import('ui/optimismSuperchain/token/OpSuperchainToken'));

const pathname: Route['pathname'] = '/token/[hash]';

const Page: NextPage<Props<typeof pathname>> = (props: Props<typeof pathname>) => {
  return (
    <PageNextJs pathname={ pathname } query={ props.query } apiData={ props.apiData }>
      <OpSuperchainToken/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps/multichain';
