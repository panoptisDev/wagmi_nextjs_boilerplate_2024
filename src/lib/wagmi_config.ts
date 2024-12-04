// src/lib/wagmi_config.ts
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  bscTestnet,
  polygon,
  polygonAmoy,
} from 'wagmi/chains';

const enableTestnets = true;

export const config = getDefaultConfig({
  appName: 'boilerpplate',
  projectId: '6b0e7594e3cfc2d55e17b6509e809444',
  chains: [
    polygon,
    /*polygonAmoy,*/
    ...(enableTestnets ? [polygonAmoy, bscTestnet] : []),
  ],
  ssr: true,
});