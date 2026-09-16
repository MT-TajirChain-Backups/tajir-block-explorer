import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const OpSuperchainTx = dynamicPage(() => import('ui/optimismSuperchain/tx/OpSuperchainTx'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/chain/[chain_slug]/tx/[hash]" query={ props.query }>
      <OpSuperchainTx/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps/multichain';
