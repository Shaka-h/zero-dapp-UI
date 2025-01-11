"use client"; 

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { getSignerContract } from '@/app/ethereum/utils'
export default function Home() {
  const [provider, setProvider] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState("")
  const [isConnected, setIsConnected] = useState(false);
  

  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        setProvider(provider);
        setWalletAddress(address);
        setIsConnected(true);

        const contract = getSignerContract().request_contract;

        let weiBalance = await contract.balanceOf(address)
        
        setBalance(ethers.utils.formatEther(weiBalance.toString()))
      } catch (error) {
        console.error("Failed to connect wallet:", error);
        alert("An error occurred while connecting the wallet. Please try again.");
      }
    } else {
      alert("MetaMask is not installed. Please install it to connect.");
    }
  };

  const mintToken = async () => {
    const contract = getSignerContract().request_contract;
    let mint_request = await contract.mint();
    console.log(mint_request.logs, "OOOOO");
    console.log(mint_request, "OOOOO");

    contract.on("Minted", async (address, time) => {
      console.log("Sender: ", address);
      console.log("time", time);
      let weiBalance = await contract.balanceOf(address)
        
        setBalance(ethers.utils.formatEther(weiBalance.toString()))
      
    })

  };


  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
        <div className="title w-full flex justify-center">Zero to Dapp !</div>
        {isConnected && (
          <div className="border rounded-lg p-4 w-full space-y-4">
            <div>Request Token</div>
            <div className="flex">
              <input className="flex items-center justify-center border w-full rounded-lg p-2" 
               placeholder="Enter your wallet address"
               value={walletAddress}
               onChange={(e) => setWalletAddress(e.target.value)}></input>
            </div>


            <div onClick={mintToken} className="cursor-pointer rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Request 5 ZTD
            </div>

          </div>
        )}

        {!isConnected && (
          <div onClick={connectWallet} className="w-full cursor-pointer rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
            Connect Wallet
          </div>
        )}

        {isConnected && (
          <div className="border rounded-lg p-2 w-full space-y-2">
            <div>Connected Address</div>
            <div className="p-2 shadow-lg shadow-inner">{walletAddress}</div>
            <div className="p-2 shadow-lg ">Amount: <span>{balance} ZTD</span></div>
          </div>
        )}

      </main>
      <footer className="row-start-3 flex flex-col gap-6  items-center ">
        <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.youtube.com/live/oIzwCRMCZz0"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/youtube.svg"
              alt="File icon"
              width={16}
              height={16}
            />
            Youtube
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://github.com/Shaka-h/zero-dapp-UI"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/github.svg"
              alt="Window icon"
              width={16}
              height={16}
            />
            Github
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://www.linkedin.com/in/miriam-shaka-8090ab272/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/linkedln.svg"
              alt="Globe icon"
              width={16}
              height={16}
            />
            Linkedln
          </a>
        </div>
        <div>Created By: Miriam Shaka</div>
      </footer>
    </div>
  );
}
