import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';

const InternalTxs = dynamicPage(() => {
  if (config.features.opSuperchain.isEnabled) {
    return import('ui/optimismSuperchain/internalTxs/OpSuperchainInternalTxs');
  }

  return import('ui/pages/InternalTxs');
});

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/internal-txs">
      <InternalTxs/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps/main';
