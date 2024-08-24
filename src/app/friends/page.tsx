"use client";

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

import ProfilePic from "@/components/ProfilePic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  // interface Friend {
  //   googleId: string;
  //   name: string;
  //   pfpColor: string;
  // }

  // generate an array of 10 Friends
  const friends = [
    { googleId: "1", name: "John Doe", pfpColor: "hsl(40, 35%, 45%)" },
    { googleId: "2", name: "Jane Doe", pfpColor: "hsl(140, 35%, 45%)" },
    { googleId: "3", name: "Alice", pfpColor: "hsl(240, 35%, 45%)" },
    { googleId: "4", name: "Bob", pfpColor: "hsl(60, 35%, 45%)" },
    { googleId: "5", name: "Charlie", pfpColor: "hsl(30, 35%, 45%)" },
    { googleId: "6", name: "David", pfpColor: "hsl(80, 35%, 45%)" },
    { googleId: "7", name: "Eve", pfpColor: "hsl(200, 35%, 45%)" },
    { googleId: "8", name: "Frank", pfpColor: "hsl(10, 35%, 45%)" },
    { googleId: "9", name: "Grace", pfpColor: "hsl(280, 35%, 45%)" },
    { googleId: "10", name: "Heidi", pfpColor: "hsl(90, 35%, 45%)" },
  ];

  const router = useRouter();

  return (
    <div className="mx-auto mt-10 w-full max-w-screen-md px-2">
      <div className="flex flex-row flex-wrap gap-4 py-6 sm:gap-10">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => router.back()}
          >
            <ArrowLeft />
          </Button>
          <h2 className="text-2xl font-medium text-muted-foreground">
            Friends
          </h2>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="ml-auto rounded-full text-muted-foreground hover:text-foreground"
        >
          <PlusIcon />
        </Button>
      </div>
      <div className="mx-auto flex max-w-screen-md flex-col gap-2">
        {friends.map((friend) => (
          <div
            key={friend.googleId}
            className="flex items-center gap-2 rounded-lg border p-4"
          >
            <ProfilePic letter={friend.name[0]} color={friend.pfpColor} />
            <p className="font-semibold text-muted-foreground">{friend.name}</p>
            <RemoveFirendButton />
          </div>
        ))}
      </div>
    </div>
  );
}

function RemoveFirendButton() {
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
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
