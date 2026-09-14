import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const MarketplaceEssentialDapp = dynamicPage(() => import('ui/pages/MarketplaceEssentialDapp'));

const Page: NextPage<Props> = (props: Props) => (
  <PageNextJs pathname="/essential-dapps/[id]" query={ props.query }>
    <MarketplaceEssentialDapp/>
  </PageNextJs>
);

export default Page;

export { marketplaceEssentialDapp as getServerSideProps } from 'nextjs/getServerSideProps/main';
