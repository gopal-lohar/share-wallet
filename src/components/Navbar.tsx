"use client";

import { useContext, useTransition } from "react";

import ShareWalletIcon from "@/components/ShareWalletIcon";
import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import UserContext from "@/context/UserContext";
import { UserDetails } from "@/types/types";
import ProfilePic from "@/components/ProfilePic";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const user = useContext(UserContext);
  return (
    <nav className="h-16 w-full border-b sm:border-b">
      <div className="mx-auto flex h-full w-full max-w-[1500px] items-center gap-2 px-2">
        <Link href="/" className="flex h-full items-center gap-4">
          <ShareWalletIcon className="size-10" />
          <span className="hidden translate-y-0.5 text-2xl font-bold text-muted-foreground sm:inline-block">
            Share Wallet
          </span>
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          {user ? <ProfilePicButton user={user} /> : <LoginButton />}
        </div>
      </div>
    </nav>
  );
}

function ProfilePicButton({ user }: { user: UserDetails }) {
  return (
    <div className="ml-auto flex items-center gap-4 pr-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="rounded-full p-0">
            <ProfilePic letter={user.name[0]} color={user.pfpColour} />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div className="px-2 py-1.5 text-sm font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.name}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Github</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function LoginButton() {
  const router = useRouter();
  const [singingIn, startSigningIn] = useTransition();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="gap-2 rounded-full px-2 text-primary hover:text-primary sm:pr-3"
        >
          <AccountIcon />
          <span className="text hidden sm:inline-block">Login</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Login to connect with you friends online
          </DialogDescription>
        </DialogHeader>
        <Button
          variant="secondary"
          className={cn(
            "relative mx-auto w-max pl-2",
            singingIn ? "disabled:opacity-100" : ""
          )}
          disabled={singingIn}
          onClick={() => {
            startSigningIn(async () => {
              try {
                await signIn("google", { redirect: false });
              } catch (error) {
                router.push("/");
              }
            });
          }}
        >
          <span
            className={cn(
              "flex items-center gap-1",
              singingIn ? "opacity-0" : ""
            )}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </span>
          {singingIn ? (
            <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-primary"></div>
          ) : (
            ""
          )}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

interface IconProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const GoogleIcon = ({
  color = "currentcolor",
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={cn("shrink-0", className)}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="-0.5 0 48 48"
    {...props}
  >
    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g id="Color-" transform="translate(-401.000000, -860.000000)">
        <g id="Google" transform="translate(401.000000, 860.000000)">
          <path
            d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
            id="Fill-1"
            fill="#FBBC05"
          ></path>
          <path
            d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
            id="Fill-2"
            fill="#EB4335"
          ></path>
          <path
            d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
            id="Fill-3"
            fill="#34A853"
          ></path>
          <path
            d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
            id="Fill-4"
            fill="#4285F4"
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

export const AccountIcon = ({
  color = "currentcolor",
  width = 24,
  height = 24,
  className,
  ...props
}: IconProps) => (
  <svg
    width={width}
    height={height}
    className={cn("shrink-0", className)}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    {...props}
  >
    <path d="M240.92-268.31q51-37.84 111.12-59.77Q412.15-350 480-350t127.96 21.92q60.12 21.93 111.12 59.77 37.3-41 59.11-94.92Q800-417.15 800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 62.85 21.81 116.77 21.81 53.92 59.11 94.92ZM480.01-450q-54.78 0-92.39-37.6Q350-525.21 350-579.99t37.6-92.39Q425.21-710 479.99-710t92.39 37.6Q610-634.79 610-580.01t-37.6 92.39Q534.79-450 480.01-450ZM480-100q-79.15 0-148.5-29.77t-120.65-81.08q-51.31-51.3-81.08-120.65Q100-400.85 100-480t29.77-148.5q29.77-69.35 81.08-120.65 51.3-51.31 120.65-81.08Q400.85-860 480-860t148.5 29.77q69.35 29.77 120.65 81.08 51.31 51.3 81.08 120.65Q860-559.15 860-480t-29.77 148.5q-29.77 69.35-81.08 120.65-51.3 51.31-120.65 81.08Q559.15-100 480-100Zm0-60q54.15 0 104.42-17.42 50.27-17.43 89.27-48.73-39-30.16-88.11-47Q536.46-290 480-290t-105.77 16.65q-49.31 16.66-87.92 47.2 39 31.3 89.27 48.73Q425.85-160 480-160Zm0-350q29.85 0 49.92-20.08Q550-550.15 550-580t-20.08-49.92Q509.85-650 480-650t-49.92 20.08Q410-609.85 410-580t20.08 49.92Q450.15-510 480-510Zm0-70Zm0 355Z" />
  </svg>
);
