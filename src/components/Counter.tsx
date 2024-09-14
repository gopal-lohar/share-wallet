"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import ShareWalletIcon from "./ShareWalletIcon";

export default function Counter() {
  const [counter, setCounter] = useState(0);
  return (
    <div className="flex w-max flex-col gap-4 rounded-md border">
      <div className="mt-2 flex h-10 items-center gap-4 px-4">
        <div className="flex items-center gap-4">
          <ShareWalletIcon />
          Share Wallet
        </div>
        <Button variant="ghost" className="ml-auto size-8 p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentcolor"
          >
            <path d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z" />
          </svg>
        </Button>
      </div>
      <div className="flex items-center gap-4 px-4">
        <Button
          variant="outline"
          onClick={() => {
            setCounter(counter - 1);
          }}
        >
          Decrease
        </Button>
        <div className="flex size-10 items-center justify-center rounded-md border">
          {counter}
        </div>
        <Button
          variant="outline"
          onClick={() => {
            setCounter(counter + 1);
          }}
        >
          Increase
        </Button>
      </div>
      <Button onClick={() => setCounter(0)} className="mx-4 mb-4">
        Reset
      </Button>
    </div>
  );
}
