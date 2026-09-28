import type { Feature } from './types';
import type { NetworkExplorer } from 'types/networks';

import { getEnvValue, parseEnvJson } from '../utils';

export type L1HolderTokenConfig = {
  address: string;
  symbol?: string;
  name?: string;
};

const title = 'L1 holders';

const DEFAULT_EXTERNAL_EXPLORERS: Array<NetworkExplorer> = [
  {
    title: 'Etherscan',
    baseUrl: 'https://etherscan.io/',
    logo: 'https://raw.githubusercontent.com/blockscout/frontend-configs/main/configs/explorer-logos/etherscan.png',
    paths: {
      token: '/token',
      address: '/address',
      tx: '/tx',
    },
  },
];

const config: Feature<{
  apiHost: string;
  explorerBaseUrl: string;
  tokens: Array<L1HolderTokenConfig>;
  externalExplorers: Array<NetworkExplorer>;
}> = (() => {
  const isEnabled = getEnvValue('NEXT_PUBLIC_L1_HOLDERS_ENABLED') === 'true';
  const apiHost = (getEnvValue('NEXT_PUBLIC_L1_BLOCKSCOUT_API_HOST') || '').replace(/\/$/, '');
  const tokens = parseEnvJson<Array<L1HolderTokenConfig>>(getEnvValue('NEXT_PUBLIC_L1_HOLDERS_TOKENS')) || [];
  const externalExplorers = parseEnvJson<Array<NetworkExplorer>>(getEnvValue('NEXT_PUBLIC_L1_HOLDERS_EXTERNAL_EXPLORERS')) ||
    DEFAULT_EXTERNAL_EXPLORERS;

  if (isEnabled && apiHost && tokens.length > 0) {
    return Object.freeze({
      title,
      isEnabled: true,
      apiHost,
      explorerBaseUrl: apiHost,
      tokens: tokens.map((token) => ({
        ...token,
        address: token.address.toLowerCase(),
      })),
      externalExplorers,
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
