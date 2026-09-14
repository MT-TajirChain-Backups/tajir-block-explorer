import type { NextPage } from 'next';
import React from 'react';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

const NameDomain = dynamicPage(() => import('ui/pages/NameDomain'));

const Page: NextPage<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/name-services/domains/[name]" query={ props.query }>
      <NameDomain/>
    </PageNextJs>
  );
};

export default Page;

export { nameServiceEns as getServerSideProps } from 'nextjs/getServerSideProps/main';
