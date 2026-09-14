import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import PageNextJs from 'nextjs/PageNextJs';

const MudWorlds = dynamicPage(() => import('ui/pages/MudWorlds'));

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/mud-worlds">
      <MudWorlds/>
    </PageNextJs>
  );
};

export default Page;

export { mud as getServerSideProps } from 'nextjs/getServerSideProps/main';
