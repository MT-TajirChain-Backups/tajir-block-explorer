import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';
const rollupFeature = config.features.rollup;
const beaconChainFeature = config.features.beaconChain;

const Withdrawals = dynamicPage(() => {
  if (rollupFeature.isEnabled && rollupFeature.type === 'optimistic') {
    return import('ui/pages/OptimisticL2Withdrawals');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'arbitrum') {
    return import('ui/pages/ArbitrumL2Withdrawals');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'shibarium') {
    return import('ui/pages/ShibariumWithdrawals');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'zkEvm') {
    return import('ui/pages/ZkEvmL2Withdrawals');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'aggLayer') {
    return import('ui/pages/ZkEvmL2Withdrawals');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'scroll') {
    return import('ui/pages/ScrollL2Withdrawals');
  }

  if (beaconChainFeature.isEnabled) {
    return import('ui/pages/BeaconChainWithdrawals');
  }

  throw new Error('Withdrawals feature is not enabled.');
});

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/withdrawals">
      <Withdrawals/>
    </PageNextJs>
  );
};

export default Page;

export { withdrawals as getServerSideProps } from 'nextjs/getServerSideProps/main';
