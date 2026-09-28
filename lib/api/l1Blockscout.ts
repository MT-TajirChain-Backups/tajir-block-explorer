import type { TokenCounters, TokenHolders, TokenInfo } from 'types/api/token';
import type { TokenTransferResponse } from 'types/api/tokenTransfer';

import config from 'configs/app';

const l1HoldersFeature = config.features.l1Holders;

export function getL1BlockscoutBaseUrl(): string | undefined {
  if (!l1HoldersFeature.isEnabled) {
    return;
  }
  return l1HoldersFeature.apiHost;
}

export function getL1ExplorerUrl(path: string): string | undefined {
  const base = getL1BlockscoutBaseUrl();
  if (!base) {
    return;
  }
  return `${ base }${ path.startsWith('/') ? path : `/${ path }` }`;
}

export function getL1TokenExplorerUrl(hash: string): string | undefined {
  return getL1ExplorerUrl(`/token/${ hash }`);
}

export function getL1TxExplorerUrl(hash: string): string | undefined {
  return getL1ExplorerUrl(`/tx/${ hash }`);
}

export function getL1AddressExplorerUrl(hash: string): string | undefined {
  return getL1ExplorerUrl(`/address/${ hash }`);
}

function buildUrl(path: string, query?: Record<string, string | number | undefined | null>): string {
  const base = getL1BlockscoutBaseUrl();
  if (!base) {
    throw new Error('L1 holders feature is not enabled');
  }

  const url = new URL(`${ base }/api/v2${ path }`);
  if (query) {
    Object.entries(query).forEach(([ key, value ]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }
  return url.toString();
}

async function fetchL1Json<T>(path: string, query?: Record<string, string | number | undefined | null>): Promise<T> {
  const response = await fetch(buildUrl(path, query));
  if (!response.ok) {
    throw new Error(`L1 Blockscout request failed: ${ response.status } ${ response.statusText }`);
  }
  return response.json() as Promise<T>;
}

export function fetchL1Token(hash: string) {
  return fetchL1Json<TokenInfo>(`/tokens/${ hash }`);
}

export function fetchL1TokenCounters(hash: string) {
  return fetchL1Json<TokenCounters>(`/tokens/${ hash }/counters`);
}

export function fetchL1TokenHolders(hash: string, query?: Record<string, string | number | undefined | null>) {
  return fetchL1Json<TokenHolders>(`/tokens/${ hash }/holders`, query);
}

export function fetchL1TokenTransfers(hash: string, query?: Record<string, string | number | undefined | null>) {
  return fetchL1Json<TokenTransferResponse>(`/tokens/${ hash }/transfers`, query);
}
