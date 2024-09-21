"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import ProfilePic from "@/components/ProfilePic";
import { getPfpColor } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { DialogClose } from "@radix-ui/react-dialog";
import { Friend } from "@/types/types";

export function AddFriend({
  server,
  setFriends,
}: {
  server: boolean;
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
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
