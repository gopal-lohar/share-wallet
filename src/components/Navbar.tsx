"use client";

import ShareWalletIcon from "@/components/ShareWalletIcon";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="w-full h-20">
      <div className="container flex items-center mx-auto h-full gap-2">
        <div className="h-full flex items-center gap-4">
          <ShareWalletIcon className="size-10" />
          <span className="hidden sm:inline-block font-extrabold text-muted-foreground text-2xl translate-y-0.5">
            Share Wallet
          </span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <Button
            variant="outline"
            className="text-primary border-primary hover:text-primary rounded-full"
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
