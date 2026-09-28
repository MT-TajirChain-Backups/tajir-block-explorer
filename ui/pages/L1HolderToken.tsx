import { Box, Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useCallback } from 'react';

import type { TabItemRegular } from 'toolkit/components/AdaptiveTabs/types';

import config from 'configs/app';
import { getL1AddressExplorerUrl, getL1TokenExplorerUrl } from 'lib/api/l1Blockscout';
import getQueryParamString from 'lib/router/getQueryParamString';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import RoutedTabs from 'toolkit/components/RoutedTabs/RoutedTabs';
import L1ExternalExplorers from 'ui/l1Holders/L1ExternalExplorers';
import L1TokenDetails from 'ui/l1Holders/L1TokenDetails';
import L1TokenHolders, { L1TokenHoldersMobile } from 'ui/l1Holders/L1TokenHolders';
import L1TokenTransfers from 'ui/l1Holders/L1TokenTransfers';
import {
  useL1TokenCountersQuery,
  useL1TokenHoldersQuery,
  useL1TokenQuery,
  useL1TokenTransfersQuery,
} from 'ui/l1Holders/useL1TokenQueries';
import TextAd from 'ui/shared/ad/TextAd';
import DataFetchAlert from 'ui/shared/DataFetchAlert';
import DataListDisplay from 'ui/shared/DataListDisplay';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import PageTitle from 'ui/shared/Page/PageTitle';

export type L1TokenTabs = 'token_transfers' | 'holders' | 'contract';

const l1HoldersFeature = config.features.l1Holders;

const L1HolderToken = () => {
  const router = useRouter();
  const hash = getQueryParamString(router.query.hash)?.toLowerCase();
  const tab = getQueryParamString(router.query.tab) || 'token_transfers';

  const configuredToken = l1HoldersFeature.isEnabled ?
    l1HoldersFeature.tokens.find((token) => token.address === hash) :
    undefined;

  const tokenQuery = useL1TokenQuery(hash);
  const countersQuery = useL1TokenCountersQuery(hash, Boolean(hash));
  const holdersQuery = useL1TokenHoldersQuery(hash, tab === 'holders');
  const transfersQuery = useL1TokenTransfersQuery(hash, tab === 'token_transfers' || !tab);

  const handleTabChange = useCallback((nextTab: L1TokenTabs) => {
    router.push(
      { pathname: '/l1-holders/[hash]', query: { hash: hash || '', tab: nextTab } },
      undefined,
      { shallow: true },
    );
  }, [ hash, router ]);

  if (!configuredToken) {
    return <DataFetchAlert/>;
  }

  const title = tokenQuery.data?.name || configuredToken.name || 'L1 token';
  const symbol = tokenQuery.data?.symbol || configuredToken.symbol;
  const explorerTokenUrl = hash ? getL1TokenExplorerUrl(hash) : undefined;
  const explorerContractUrl = hash ? `${ getL1AddressExplorerUrl(hash) }?tab=contract` : undefined;

  const holdersContent = tokenQuery.data && holdersQuery.data ? (
    <>
      <Box hideFrom="lg">
        <L1TokenHoldersMobile
          items={ holdersQuery.data.items }
          token={ tokenQuery.data }
          isLoading={ holdersQuery.isPlaceholderData }
        />
      </Box>
      <Box hideBelow="lg">
        <L1TokenHolders
          items={ holdersQuery.data.items }
          token={ tokenQuery.data }
          isLoading={ holdersQuery.isPlaceholderData }
        />
      </Box>
    </>
  ) : null;

  const transfersContent = transfersQuery.data ? (
    <Box overflowX="auto">
      <L1TokenTransfers
        items={ transfersQuery.data.items }
        isLoading={ transfersQuery.isPlaceholderData }
      />
    </Box>
  ) : null;

  const tabs: Array<TabItemRegular> = [
    {
      id: 'token_transfers',
      title: 'Token transfers',
      component: (
        <DataListDisplay
          isError={ transfersQuery.isError }
          itemsNum={ transfersQuery.data?.items.length }
          emptyText="There are no token transfers."
        >
          { transfersContent }
        </DataListDisplay>
      ),
    },
    {
      id: 'holders',
      title: 'Holders',
      component: (
        <DataListDisplay
          isError={ holdersQuery.isError }
          itemsNum={ holdersQuery.data?.items.length }
          emptyText="There are no holders for this token."
        >
          { holdersContent }
        </DataListDisplay>
      ),
    },
    {
      id: 'contract',
      title: 'Contract',
      component: (
        <Box py={ 4 }>
          <Skeleton loading={ tokenQuery.isPlaceholderData }>
            Contract details are available on Ethereum Blockscout.
          </Skeleton>
          { explorerContractUrl && (
            <Link href={ explorerContractUrl } external mt={ 3 } display="inline-flex">
              View contract on Ethereum
            </Link>
          ) }
        </Box>
      ),
    },
  ];

  return (
    <>
      <TextAd mb={ 6 }/>
      <PageTitle
        title={ `${ title }${ symbol ? ` (${ symbol })` : '' }` }
        isLoading={ tokenQuery.isPlaceholderData }
        secondRow={ hash ? (
          <Flex alignItems="center" w="100%" minW={ 0 } columnGap={ 2 } rowGap={ 2 } flexWrap={{ base: 'wrap', lg: 'nowrap' }}>
            <AddressEntity
              address={{ hash }}
              isLoading={ tokenQuery.isPlaceholderData }
              href={ explorerTokenUrl }
              link={{ external: true }}
            />
            <Flex ml={{ base: 0, lg: 'auto' }} flexGrow={{ base: 1, lg: 0 }}>
              <L1ExternalExplorers tokenHash={ hash } ml={{ base: 'auto', lg: 0 }}/>
            </Flex>
          </Flex>
        ) : null }
      />
      <L1TokenDetails
        tokenQuery={ tokenQuery }
        countersQuery={ countersQuery }
        onTabChange={ handleTabChange }
      />
      <Box id="token-tabs">
        <RoutedTabs
          tabs={ tabs }
          isLoading={ tokenQuery.isPlaceholderData }
          mt={ 8 }
        />
      </Box>
    </>
  );
};

export default L1HolderToken;
