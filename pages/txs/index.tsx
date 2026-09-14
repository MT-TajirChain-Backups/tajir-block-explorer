import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';

const Transactions = dynamicPage(() => {
  if (config.features.opSuperchain.isEnabled) {
    return import('ui/optimismSuperchain/txs/OpSuperchainTxs');
  }

  if (config.features.zetachain.isEnabled) {
    return import('ui/pages/TransactionsZetaChain');
  }

  return import('ui/pages/Transactions');
});

const Page: NextPage = () => {

  return (
    <PageNextJs pathname="/txs">
      <Transactions/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps/main';
