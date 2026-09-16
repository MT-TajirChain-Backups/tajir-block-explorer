import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const TacOperation = dynamicPage(() => import('ui/pages/TacOperation'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/operation/[id]" query={ props.query }>
      <TacOperation/>
    </PageNextJs>
  );
};

export default Page;

export { tac as getServerSideProps } from 'nextjs/getServerSideProps/main';
