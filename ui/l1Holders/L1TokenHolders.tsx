import { Box, Flex } from '@chakra-ui/react';
import BigNumber from 'bignumber.js';
import React from 'react';

import type { TokenHolder, TokenInfo } from 'types/api/token';

import { getL1AddressExplorerUrl } from 'lib/api/l1Blockscout';
import { TableBody, TableCell, TableColumnHeader, TableHeaderSticky, TableRoot, TableRow } from 'toolkit/chakra/table';
import AddressEntity from 'ui/shared/entities/address/AddressEntity';
import Utilization from 'ui/shared/Utilization/Utilization';
import AssetValue from 'ui/shared/value/AssetValue';

type Props = {
  items: Array<TokenHolder>;
  token: TokenInfo;
  isLoading?: boolean;
};

const L1TokenHolders = ({ items, token, isLoading }: Props) => {
  return (
    <TableRoot minW="800px">
      <TableHeaderSticky top={ 0 }>
        <TableRow>
          <TableColumnHeader>Address</TableColumnHeader>
          <TableColumnHeader isNumeric>Quantity</TableColumnHeader>
          <TableColumnHeader isNumeric>Percentage</TableColumnHeader>
        </TableRow>
      </TableHeaderSticky>
      <TableBody>
        { items.map((holder, index) => {
          const addressHref = getL1AddressExplorerUrl(holder.address.hash);
          return (
            <TableRow key={ holder.address.hash + (isLoading ? index : '') }>
              <TableCell verticalAlign="middle">
                <AddressEntity
                  address={ holder.address }
                  isLoading={ isLoading }
                  href={ addressHref }
                  link={{ external: true }}
                  fontWeight="700"
                />
              </TableCell>
              <TableCell verticalAlign="middle" isNumeric>
                <AssetValue
                  amount={ holder.value }
                  decimals={ token.decimals ?? '0' }
                  loading={ isLoading }
                />
              </TableCell>
              <TableCell verticalAlign="middle" isNumeric>
                { token.total_supply ? (
                  <Utilization
                    value={ BigNumber(holder.value).div(BigNumber(token.total_supply)).dp(4).toNumber() }
                    colorScheme="green"
                    display="inline-flex"
                    isLoading={ isLoading }
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

export const L1TokenHoldersMobile = ({ items, token, isLoading }: Props) => {
  return (
    <Box>
      { items.map((holder, index) => {
        const addressHref = getL1AddressExplorerUrl(holder.address.hash);
        return (
          <Box key={ holder.address.hash + (isLoading ? index : '') } py={ 4 } borderColor="border.divider" borderTopWidth={ index ? '1px' : 0 }>
            <AddressEntity
              address={ holder.address }
              isLoading={ isLoading }
              href={ addressHref }
              link={{ external: true }}
              fontWeight="700"
              mb={ 2 }
            />
            <Flex justifyContent="space-between" alignItems="center">
              <AssetValue
                amount={ holder.value }
                decimals={ token.decimals ?? '0' }
                loading={ isLoading }
              />
              { token.total_supply && (
                <Utilization
                  value={ BigNumber(holder.value).div(BigNumber(token.total_supply)).dp(4).toNumber() }
                  colorScheme="green"
                  display="inline-flex"
                  isLoading={ isLoading }
                />
              ) }
            </Flex>
          </Box>
        );
      }) }
    </Box>
  );
};

export default React.memo(L1TokenHolders);
