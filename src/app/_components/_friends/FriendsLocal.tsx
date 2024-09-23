"use client";

import * as React from "react";
import { useContext, useEffect, useRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { localStorageKeys } from "@/lib/local-storage-keys";
import UserContext from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ProfilePic from "@/components/ProfilePic";
import { getPfpColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { FriendInterface } from "@/types/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function FriendsLocal() {
  const isFirstLoad = useRef(true);
  const [friends, setFriends] = useState<FriendInterface[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      if (!user) {
        const storedFriends = localStorage.getItem(localStorageKeys.friends);
        if (storedFriends) {
          setFriends(JSON.parse(storedFriends));
        }
      }
    } else {
      if (!user) {
        localStorage.setItem(localStorageKeys.friends, JSON.stringify(friends));
      }
    }
  }, [friends, user]);

  return (
    <div className="mx-auto w-full">
      <div className="flex flex-row flex-wrap items-center gap-4 pb-4 sm:gap-10">
        <h2 className="text-2xl font-medium text-muted-foreground">Friends</h2>
        <AddFriend setFriends={setFriends} />
      </div>
      <div className="mx-auto flex flex-col gap-2">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center gap-2 rounded-lg border p-2"
          >
            <ProfilePic letter={friend.name[0]} color={friend.pfpColor} />
            <p className="font-semibold text-muted-foreground">{friend.name}</p>
            <RemoveFirendButton setFriends={setFriends} friend={friend} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RemoveFirendButton({
  friend,
  setFriends,
}: {
  friend: FriendInterface;
  setFriends: React.Dispatch<React.SetStateAction<FriendInterface[]>>;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="ml-auto">
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            friend from your list.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setFriends((prev: any) =>
                prev.filter((f: any) => f.id !== friend.id)
              );
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function AddFriend({
  setFriends,
}: {
  setFriends: React.Dispatch<React.SetStateAction<FriendInterface[]>>;
}) {
  const [name, setName] = useState("");
  const [pfpHue, setPfpHue] = useState(60);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto rounded-full text-muted-foreground hover:text-foreground"
        >
          <PlusIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Friend</DialogTitle>
          <DialogDescription>
            Create a Friend to add to your friends list. This will be saved only
            on your device
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {name ? (
            <div className="flex items-center justify-center pb-4">
              <ProfilePic letter={name[0]} color={getPfpColor("", pfpHue)} />
            </div>
          ) : (
            ""
          )}
          <div className="grid grid-cols-5 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-4"
            />
          </div>
          {name ? (
            <div className="grid grid-cols-5 items-center gap-4">
              <Label htmlFor="pfpColor" className="text-right">
                Color
              </Label>
              <div className="col-span-4">
                <Slider
                  value={[pfpHue]}
                  defaultValue={[33]}
                  onValueChange={(value) => {
                    setPfpHue(value[0]);
                  }}
                  max={360}
                  step={1}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild disabled={name.length ? false : true}>
            <Button
              type="submit"
              onClick={() => {
                setFriends((prev) => [
                  ...prev,
                  {
                    id: `${Date.now()}-${Math.floor(Math.random() * 10e10)}`,
                    name,
                    pfpColor: getPfpColor("", pfpHue),
                  },
                ]);
              }}
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// From: src/components/ui/slider.tsx
const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className="relative h-6 w-full grow overflow-hidden rounded-full"
      style={{
        background: `linear-gradient(to right, 
        ${[0, 60, 120, 180, 240, 300, 360].map((hue) => getPfpColor("", hue)).join(",")}`,
      }}
    >
      <SliderPrimitive.Range className="absolute h-full" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
