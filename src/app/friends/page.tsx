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
import { Friend as OriginalFriend } from "@/types/types";
import ProfilePic from "@/components/ProfilePic";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useContext, useEffect } from "react";
import AppModeContext from "@/context/AppModeContext";
import { AddFriend } from "./_components/AddFriend";

export type FriendClient = Omit<OriginalFriend, "googleId"> & {
  id: string;
};

export default function UsersPage() {
  const router = useRouter();
  const appMode = useContext(AppModeContext);

  const [friends, setFriends] = useLocalStorage<FriendClient[]>(
    "LOCAL_FRIENDS",
    []
  );

  return (
    <div className="mx-auto w-full max-w-screen-md px-2">
      <div className="flex flex-row flex-wrap gap-4 py-6 sm:gap-10">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              if (window.history.length > 1) {
                router.back();
              } else {
                router.push("/");
              }
            }}
          >
            <ArrowLeft />
          </Button>
          <h2 className="text-2xl font-medium text-muted-foreground">
            Friends
          </h2>
        </div>
        <AddFriend setFriends={setFriends} />
      </div>
      <div className="mx-auto flex max-w-screen-md flex-col gap-2">
        {appMode ? (
          friends.map((friend) => (
            <div
              key={friend.id}
              className="flex items-center gap-2 rounded-lg border p-4"
            >
              <ProfilePic letter={friend.name[0]} color={friend.pfpColor} />
              <p className="font-semibold text-muted-foreground">
                {friend.name}
              </p>
              <RemoveFirendButton setFriends={setFriends} friend={friend} />
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center py-20">
            <div className="size-10 animate-spin rounded-full border-4 border-muted border-t-primary"></div>
          </div>
        )}
      </div>
    </div>
  );
}

function RemoveFirendButton({
  friend,
  setFriends,
}: {
  friend: FriendClient;
  setFriends: React.Dispatch<React.SetStateAction<FriendClient[]>>;
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
