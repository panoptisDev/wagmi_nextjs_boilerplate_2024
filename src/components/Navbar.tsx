"use client";

import React, { useState } from 'react';
//import { ConnectButton } from "@rainbow-me/rainbowkit";
//import { ConnectButton } from "@/components/ui/CustomConnectButton";
import { BlackConnectWalletButton } from "@/components/ui/BlackConnectWalletButton";
import { useAccount } from 'wagmi';
import Link from "next/link";
import { motion } from "framer-motion";
import styles from './Navbar.module.css';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../components/ui/dropdown-menu";
import { GradientBorderLogo } from '../components/ui/GradientBorderLogo';
import ShimmerButton from '../components/ui/ShimmerButton';
import ThemeToggleButton from '../components/ThemeToggleButton';
import ConnectionStatusSwitch from '../components/ConnectionStatusSwitch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faLayerGroup, faClipboardQuestion, faShop, faCoins, faBuildingColumns, faHeart,
} from '@fortawesome/free-solid-svg-icons';

const gradientStyle = {
    height: "4px",
    width: "100%",
    border: "none",
  };
  
  const gradientAnimation = {
    background: [
      "linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)",
      "linear-gradient(to right, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5, #0052FF)",
      "linear-gradient(to right, #B82EA4, #FF9533, #7FD057, #45E1E5, #0052FF, #B82EA4)",
      "linear-gradient(to right, #FF9533, #7FD057, #45E1E5, #0052FF, #B82EA4, #FF9533)",
      "linear-gradient(to right, #7FD057, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057)",
      "linear-gradient(to right, #45E1E5, #0052FF, #B82EA4, #FF9533, #7FD057, #45E1E5)"
    ],
    transition: {
      duration: 10,
      ease: "linear",
      repeat: Infinity
    }
  };

interface NavbarProps {
  tokenId?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const { isConnected } = useAccount();
  const [logoState, setLogoState] = useState({
    src: "/panoptis400-3Dgreen.webp",
    text: "Boilerplate"
  });

  const changeLogo = () => {
    setLogoState({
      src: "/panoptis400-3Dgreen.webp.webp",
      text: "BlackJack"
    });
  };

  return (
    <div>
      <div className={styles.navbar}>
        <Link href={"/"}>
          <div className={styles.logoContainer}>
            <GradientBorderLogo
              src={logoState.src}
              alt="ElefantMarket Logo"
              size={85}
            />
            <span className={styles.logoText}>{logoState.text}</span>
          </div>
        </Link>
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ShimmerButton className="shadow-2xl">
                <span className="text-sm font-medium leading-none tracking-tight text-center text-white whitespace-pre-wrap dark:from-white dark:to-slate-900/10 lg:text-lg">
                  Menu
                </span>
              </ShimmerButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className={styles.dropdownMenu}>
              <DropdownMenuItem asChild>
                <Link href="/" className={styles.dropdownLink}>
                  <FontAwesomeIcon icon={faHouse} style={{ color: "#74C0FC", marginRight: "8px" }} /> Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              
              {/* Marketplace Section */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FontAwesomeIcon icon={faShop} style={{ color: "#74C0FC", marginRight: "8px" }} /> Game Section
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                <Link href="/" className={styles.dropdownLink}>
                  <FontAwesomeIcon icon={faHouse} style={{ color: "#74C0FC", marginRight: "8px" }} /> Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className={`${styles.dropdownSectionTitle} ${styles.marketSectionTitle}`}>
              <FontAwesomeIcon icon={faShop} style={{ color: "#74C0FC", marginRight: "8px" }} /> Blackjack
              </div>
              <DropdownMenuItem asChild>
                <Link href="/Blackjack" className={styles.dropdownLink}>
                  <FontAwesomeIcon icon={faHeart} style={{ color: "#74C0FC", marginRight: "8px" }} /> Blackjack
                </Link>
              </DropdownMenuItem>
                  {/* ... (other Marketplace items) */}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Staking Section */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FontAwesomeIcon icon={faLayerGroup} style={{ color: "#74C0FC", marginRight: "8px" }} /> Staking
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                <Link href="/FlexibleStaking" className={styles.dropdownLink}>
                  <FontAwesomeIcon icon={faCoins} style={{ color: "#74C0FC", marginRight: "8px" }} /> Flexible Staking
                </Link>
              </DropdownMenuItem>
                  {/* ... (other Staking items) */}
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {/* Pawn Section */}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <FontAwesomeIcon icon={faBuildingColumns} style={{ color: "#74C0FC", marginRight: "8px" }} /> Info Section
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                <DropdownMenuItem asChild>
                <Link href="/info" className={styles.dropdownLink} onClick={changeLogo}>
                  <FontAwesomeIcon icon={faClipboardQuestion} style={{ color: "#74C0FC", marginRight: "8px" }} /> info
                </Link>
              </DropdownMenuItem>
                  {/* ... (other Pawn Section items) */}
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          <ConnectionStatusSwitch isConnected={isConnected} />
          <span className="text-sm">
            {isConnected ? 'Connected' : 'Not Connected'}
          </span>
          <BlackConnectWalletButton/>
        </div>
      </div>
      {/* Animated Gradient Border */}
      <motion.div style={gradientStyle} animate={gradientAnimation} />
    </div>
  );
};

export default Navbar;