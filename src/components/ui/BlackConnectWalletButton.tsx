import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ConnectButton as RainbowkitConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";

const GRADIENT_BORDER_WIDTH = 2;

const buttonStyles: React.CSSProperties = {
  background: "transparent",
  border: "1px solid transparent",
  boxSizing: "border-box",
};

const contentWrapperStyle: React.CSSProperties = {
  position: "relative",
};

interface GradientProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  isAnimationDisabled?: boolean;
}

function Gradient({ children, style, isAnimationDisabled = false }: GradientProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const gradientStyle = useMemo(() => {
    const rotate = isAnimating ? "720deg" : "0deg";
    return {
      transform: `rotate(${rotate})`,
      transition: isAnimating
        ? "transform 2s cubic-bezier(0.27, 0, 0.24, 0.99)"
        : "none",
      ...style,
    };
  }, [isAnimating, style]);

  const handleMouseEnter = useCallback(() => {
    if (isAnimationDisabled || isAnimating) return;
    setIsAnimating(true);
  }, [isAnimationDisabled, isAnimating]);

  useEffect(() => {
    if (!isAnimating) return;
    const animationTimeout = setTimeout(() => {
      setIsAnimating(false);
    }, 2000);
    return () => {
      clearTimeout(animationTimeout);
    };
  }, [isAnimating]);

  return (
    <div style={contentWrapperStyle} onMouseEnter={handleMouseEnter}>
      <div className="gradient-background" style={gradientStyle} />
      {children}
    </div>
  );
}

interface BlackConnectWalletButtonProps {
  height?: number;
  width?: number;
}

export function BlackConnectWalletButton({ height = 66, width = 200 }: BlackConnectWalletButtonProps) {
  const minButtonHeight = 48;
  const minButtonWidth = 200;
  const buttonHeight = Math.max(minButtonHeight, height);
  const buttonWidth = Math.max(minButtonWidth, width);
  const gradientDiameter = Math.max(buttonHeight, buttonWidth);
  const styles = useMemo(
    () => ({
      gradientContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black",
        borderRadius: buttonHeight / 2,
        height: buttonHeight,
        width: buttonWidth,
        boxSizing: "border-box" as const,
        overflow: "hidden",
      },
      gradient: {
        background:
          "conic-gradient(from 180deg, #45E1E5 0deg, #0052FF 86.4deg, #B82EA4 165.6deg, #FF9533 255.6deg, #7FD057 320.4deg, #45E1E5 360deg)",
        position: "absolute" as const,
        top: -buttonHeight - GRADIENT_BORDER_WIDTH,
        left: -GRADIENT_BORDER_WIDTH,
        width: gradientDiameter,
        height: gradientDiameter,
      },
      buttonBody: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxSizing: "border-box" as const,
        backgroundColor: "#000000",
        height: buttonHeight - GRADIENT_BORDER_WIDTH * 2,
        width: buttonWidth - GRADIENT_BORDER_WIDTH * 2,
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        fontSize: 18,
        borderRadius: buttonHeight / 2,
        position: "relative" as const,
        paddingRight: 10,
        color: "white",
      },
    }),
    [buttonHeight, buttonWidth, gradientDiameter]
  );

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
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            <button style={buttonStyles} onClick={openConnectModal}>
              <div style={styles.gradientContainer}>
                <Gradient style={styles.gradient}>
                  <div style={styles.buttonBody}>
                    {(() => {
                      if (!connected) {
                        return (
                          <span className="text-xl play-btn px-2 cursor-pointer animate-text hover:animate-text-hover">
                            Connect Wallet
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
                </Gradient>
              </div>
            </button>
          </div>
        );
      }}
    </RainbowkitConnectButton.Custom>
  );
}