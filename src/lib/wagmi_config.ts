import { http, createConfig } from "wagmi";
import { polygon, sepolia, polygonAmoy } from "wagmi/chains";

export const config = createConfig({
  chains: [polygon, sepolia, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
  },
  ssr: true,
});
