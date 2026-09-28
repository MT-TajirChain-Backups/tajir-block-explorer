import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import type { TokenTransfer } from 'types/api/tokenTransfer';

import { getL1AddressExplorerUrl, getL1TxExplorerUrl } from 'lib/api/l1Blockscout';
import { Badge } from 'toolkit/chakra/badge';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { TableBody, TableCell, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import TxEntity from 'ui/shared/entities/tx/TxEntity';
import TimeWithTooltip from 'ui/shared/time/TimeWithTooltip';
import AssetValue from 'ui/shared/value/AssetValue';

type Props = {
  items: Array<TokenTransfer>;
  isLoading?: boolean;
};

const L1TokenTransfers = ({ items, isLoading }: Props) => {
  return (
    <TableRoot minW="1000px">
      <TableHeaderSticky top={ 0 }>
        <TableRow>
          <TableColumnHeader>Txn hash</TableColumnHeader>
          <TableColumnHeader>Method</TableColumnHeader>
          <TableColumnHeader>From</TableColumnHeader>
          <TableColumnHeader>To</TableColumnHeader>
          <TableColumnHeader isNumeric>Amount</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((item, index) => {
          const txHref = item.transaction_hash ? getL1TxExplorerUrl(item.transaction_hash) : undefined;
          const fromHref = getL1AddressExplorerUrl(item.from.hash);
          const toHref = item.to ? getL1AddressExplorerUrl(item.to.hash) : undefined;
          const amount = item.total && 'value' in item.total ? item.total.value : null;

          return (
            <TableRow key={ (item.transaction_hash || '') + index } alignItems="top">
              <TableCell>
                <Flex flexDirection="column" alignItems="flex-start" mt="5px" rowGap={ 3 }>
                  { item.transaction_hash ? (
                    <TxEntity
                      hash={ item.transaction_hash }
                      isLoading={ isLoading }
                      href={ txHref }
                      link={{ external: true }}
                      fontWeight={ 600 }
                      noIcon
                      truncation="constant_long"
                    />
                  ) : <Skeleton loading={ isLoading }>-</Skeleton> }
                  <TimeWithTooltip
                    timestamp={ item.timestamp }
                    enableIncrement
                    isLoading={ isLoading }
                    display="inline-block"
                    color="text.secondary"
                    fontWeight="400"
                  />
                </Flex>
              </TableCell>
              <TableCell>
                { item.method ? (
                  <Box my="3px">
                    <Badge loading={ isLoading } truncated>{ item.method }</Badge>
                  </Box>
                ) : null }
              </TableCell>
              <TableCell>
                <AddressEntity
                  address={ item.from }
                  isLoading={ isLoading }
                  href={ fromHref }
                  link={{ external: true }}
                  truncation="constant"
                  mt="5px"
                />
              </TableCell>
              <TableCell>
                { item.to ? (
                  <AddressEntity
                    address={ item.to }
                    isLoading={ isLoading }
                    href={ toHref }
                    link={{ external: true }}
                    truncation="constant"
                    mt="5px"
                  />
                ) : '-' }
              </TableCell>
              <TableCell isNumeric>
                { amount && item.token ? (
                  <AssetValue
                    amount={ amount }
                    decimals={ item.token.decimals ?? '0' }
                    asset={ item.token.symbol ?? undefined }
                    loading={ isLoading }
                    mt="5px"
                  />
                ) : '-' }
              </TableCell>
            </TableRow>
          );
        }) }
      </TableBody>
    </TableRoot>
  );
};

export default React.memo(L1TokenTransfers);
