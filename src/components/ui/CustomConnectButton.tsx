import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

export const ConnectButton = () => {
  return (
    <RainbowkitConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        return (
          <div
            className="play-btn sm:px-4 py-2 animate-text text-1xl bg-gradient-to-t from-[#525252] to-[#1a1a1a] hover:bg-gradient-to-b text-white rounded-xl"
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <span
                    onClick={openConnectModal}
                    className="text-xl play-btn px-2 cursor-pointer animate-text hover:animate-text-hover"
                  >
                    Sign in
                  </span>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 30,
                          height: 30,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            width={30}
                            height={30}
                          />
                        )}
                      </div>
                    )}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </RainbowkitConnectButton.Custom>
  );
};
export default ConnectButton;