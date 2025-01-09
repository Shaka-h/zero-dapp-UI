"use client"; // Add this directive at the top of the file

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
export default function Home() {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(provider);
      }
    };

    initializeProvider();
  }, []);

  // const [network, setNetwork] = useState('');

  // useEffect(() => {
  //   // ...

  //   const getNetwork = async () => {
  //     if (provider) {
  //       const network = await provider.getNetwork();
  //       setNetwork(network.name);
  //     }
  //   };

  //   getNetwork();
  // }, [provider]);
  const showConnectedButton = false;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
        <div className="title w-full flex justify-center">Zero to Dapp !</div>
        <div className="border rounded-lg p-4 w-full space-y-4">
          <div>Request Token</div>
          <div className="flex">
            <input className="flex items-center justify-center border w-full rounded-lg p-2" placeholder="Wallet Address"></input>
          </div>




          {showConnectedButton && (
            <div className="cursor-pointer rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Request 10 ZTD
            </div>
          )}

          {showConnectedButton && (
            <div className="cursor-pointer rounded-lg border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5">
              Connect Wallet
              {/* {status === "loading" ? <Loading /> : "Connect Wallet"} */}
            </div>
          )}


        </div>

        <div className="border rounded-lg p-2 w-full space-y-2">
          <div>Connected Address</div>
          <div className="p-2 shadow-lg shadow-inner">0x28304089335d7f441544fCc828D46449DD79385F</div>
          <div className="p-2 shadow-lg ">Amount: <span>20 ZTD</span></div>
        </div>

      </main>
      <footer className="row-start-3 flex flex-col gap-6  items-center ">
        <div className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
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
