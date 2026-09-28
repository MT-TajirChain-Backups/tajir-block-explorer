import { Box, Flex } from '@chakra-ui/react';
import { useQueries } from '@tanstack/react-query';
import React from 'react';

import type { TokenInfo } from 'types/api/token';

import { route } from 'nextjs-routes';

import config from 'configs/app';
import { fetchL1Token } from 'lib/api/l1Blockscout';
import { TOKEN_INFO_ERC_20 } from 'stubs/token';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { TableBody, TableCell, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import DataListDisplay from 'ui/shared/DataListDisplay';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import PageTitle from 'ui/shared/Page/PageTitle';
import AssetValue from 'ui/shared/value/AssetValue';

const l1HoldersFeature = config.features.l1Holders;

const L1Holders = () => {
  const tokens = l1HoldersFeature.isEnabled ? l1HoldersFeature.tokens : [];

  const queries = useQueries({
    queries: tokens.map((token) => ({
      queryKey: [ 'l1-token', token.address ],
      queryFn: () => fetchL1Token(token.address),
      placeholderData: {
        ...TOKEN_INFO_ERC_20,
        address_hash: token.address,
        symbol: token.symbol ?? TOKEN_INFO_ERC_20.symbol,
        name: token.name ?? TOKEN_INFO_ERC_20.name,
      } satisfies TokenInfo,
      enabled: l1HoldersFeature.isEnabled,
    })),
  });

  const isLoading = queries.some((query) => query.isPlaceholderData);
  const isError = queries.some((query) => query.isError);

  const items = queries.map((query, index) => {
    const configured = tokens[index];
    const data = query.data;
    return {
      address: configured.address,
      name: data?.name || configured.name || 'Unknown',
      symbol: data?.symbol || configured.symbol || '',
      holdersCount: data?.holders_count,
      totalSupply: data?.total_supply,
      decimals: data?.decimals,
      marketCap: data?.circulating_market_cap,
      isLoading: query.isPlaceholderData,
    };
  });

  const content = (
    <>
      <Box hideFrom="lg">
        { items.map((item) => (
          <Box key={ item.address } py={ 4 } borderColor="border.divider" borderTopWidth="1px" _first={{ borderTopWidth: 0 }}>
            <Link href={ route({ pathname: '/l1-holders/[hash]', query: { hash: item.address } }) }>
              <Skeleton loading={ item.isLoading } fontWeight={ 700 }>
                { item.name }{ item.symbol ? ` (${ item.symbol })` : '' }
              </Skeleton>
            </Link>
            <AddressEntity
              address={{ hash: item.address }}
              isLoading={ item.isLoading }
              noLink
              mt={ 1 }
            />
            <Flex mt={ 2 } justifyContent="space-between">
              <Skeleton loading={ item.isLoading }>
                Holders: { item.holdersCount ? Number(item.holdersCount).toLocaleString() : '-' }
              </Skeleton>
              <AssetValue
                amount={ item.totalSupply }
                decimals={ item.decimals ?? '0' }
                accuracy={ 2 }
                loading={ item.isLoading }
              />
            </Flex>
          </Box>
        )) }
      </Box>
      <Box hideBelow="lg">
        <TableRoot>
          <TableHeaderSticky top={ 0 }>
            <TableRow>
              <TableColumnHeader>Token</TableColumnHeader>
              <TableColumnHeader>Address</TableColumnHeader>
              <TableColumnHeader isNumeric>Max total supply</TableColumnHeader>
              <TableColumnHeader isNumeric>Holders</TableColumnHeader>
              <TableColumnHeader isNumeric>Onchain Market Cap</TableColumnHeader>
            </TableRow>
          </TableHeaderSticky>
          <TableBody>
            { items.map((item) => (
              <TableRow key={ item.address }>
                <TableCell>
                  <Link href={ route({ pathname: '/l1-holders/[hash]', query: { hash: item.address } }) } fontWeight={ 700 }>
                    <Skeleton loading={ item.isLoading }>
                      { item.name }{ item.symbol ? ` (${ item.symbol })` : '' }
                    </Skeleton>
                  </Link>
                </TableCell>
                <TableCell>
                  <AddressEntity
                    address={{ hash: item.address }}
                    isLoading={ item.isLoading }
                    truncation="constant"
                    noLink
                  />
                </TableCell>
                <TableCell isNumeric>
                  <AssetValue
                    amount={ item.totalSupply }
                    decimals={ item.decimals ?? '0' }
                    asset={ item.symbol || undefined }
                    accuracy={ 2 }
                    loading={ item.isLoading }
                  />
                </TableCell>
                <TableCell isNumeric>
                  <Skeleton loading={ item.isLoading }>
                    { item.holdersCount ? Number(item.holdersCount).toLocaleString() : '-' }
                  </Skeleton>
                </TableCell>
                <TableCell isNumeric>
                  <Skeleton loading={ item.isLoading }>
                    { item.marketCap ? `$${ Number(item.marketCap).toLocaleString() }` : '-' }
                  </Skeleton>
                </TableCell>
              </TableRow>
            )) }
          </TableBody>
        </TableRoot>
      </Box>
    </>
  );

  return (
    <>
      <PageTitle title="L1 holders" withTextAd/>
      <DataListDisplay
        isError={ isError }
        itemsNum={ items.length }
        emptyText="There are no L1 tokens configured."
      >
        { content }
      </DataListDisplay>
    </>
  );
};

export default L1Holders;
