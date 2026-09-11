import config from 'configs/app';

// TODO delete when page descriptions is refactored
export default function getNetworkTitle() {
  const name = config.app.nameLatest || config.chain.name;
  return name + (config.chain.shortName ? ` (${ config.chain.shortName })` : '') + ' Explorer';
}
