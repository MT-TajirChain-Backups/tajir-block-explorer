import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';
const rollupFeature = config.features.rollup;
const beaconChainFeature = config.features.beaconChain;

const Deposits = dynamicPage(() => {
  if (rollupFeature.isEnabled && rollupFeature.type === 'optimistic') {
    return import('ui/pages/OptimisticL2Deposits');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'arbitrum') {
    return import('ui/pages/ArbitrumL2Deposits');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'shibarium') {
    return import('ui/pages/ShibariumDeposits');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'zkEvm') {
    return import('ui/pages/ZkEvmL2Deposits');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'aggLayer') {
    return import('ui/pages/ZkEvmL2Deposits');
  }

  if (rollupFeature.isEnabled && rollupFeature.type === 'scroll') {
    return import('ui/pages/ScrollL2Deposits');
  }

  if (beaconChainFeature.isEnabled) {
    return import('ui/pages/BeaconChainDeposits');
  }

  throw new Error('Deposits feature is not enabled.');
});

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/deposits">
      <Deposits/>
    </PageNextJs>
  );
};

export default Page;

export { deposits as getServerSideProps } from 'nextjs/getServerSideProps/main';
