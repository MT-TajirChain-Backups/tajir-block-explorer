import React from 'react';

import type { NextPageWithLayout } from 'nextjs/types';

import dynamicPage from 'nextjs/dynamicPage';
import type { Props } from 'nextjs/getServerSideProps/handlers';
import PageNextJs from 'nextjs/PageNextJs';

import config from 'configs/app';
import LayoutSearchResults from 'ui/shared/layout/LayoutSearchResults';

const SearchResults = dynamicPage(() => {
  if (config.features.opSuperchain.isEnabled) {
    return import('ui/optimismSuperchain/searchResults/SearchResults');
  }

  return import('ui/pages/SearchResults');
});

const Page: NextPageWithLayout<Props> = (props: Props) => {
  return (
    <PageNextJs pathname="/search-results" query={ props.query }>
      <SearchResults/>
    </PageNextJs>
  );
};

Page.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <LayoutSearchResults>
      { page }
    </LayoutSearchResults>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps/main';
