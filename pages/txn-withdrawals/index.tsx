import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';
const rollupFeature = config.features.rollup;

const Withdrawals = dynamicPage(() => {
  if (rollupFeature.isEnabled && rollupFeature.type === 'arbitrum') {
    return import('ui/pages/ArbitrumL2TxnWithdrawals');
  }

  throw new Error('Txn withdrawals feature is not enabled.');
});

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/txn-withdrawals">
      <Withdrawals/>
    </PageNextJs>
  );
};

export default Page;

export { txnWithdrawals as getServerSideProps } from 'nextjs/getServerSideProps/main';
