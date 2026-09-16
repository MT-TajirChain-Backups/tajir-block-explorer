import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const UserOp = dynamicPage(() => import('ui/pages/UserOp'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/op/[hash]" query={ props.query }>
      <UserOp/>
    </PageNextJs>
  );
};

export default Page;

export { userOps as getServerSideProps } from 'nextjs/getServerSideProps/main';
