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
import { Friend } from "@/types/types";
import ProfilePic from "@/components/ProfilePic";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { AddFriend } from "./AddFriend";
import { localStorageKeys } from "@/lib/local-storage-keys";
import UserContext from "@/context/UserContext";
import { removeFriend } from "@/app/_actions/friends";

export default function Friends({
  friendsProps,
}: {
  friendsProps: Friend[] | null;
}) {
  const isFirstLoad = useRef(true);
  const router = useRouter();
  const [friends, setFriends] = useState<Friend[]>([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      if (user) {
        friendsProps && setFriends(friendsProps);
      } else {
        const storedFriends = localStorage.getItem(localStorageKeys.friends);
        if (storedFriends) {
          console.log(storedFriends);
          setFriends(JSON.parse(storedFriends));
        }
      }
    } else {
      if (!user) {
        localStorage.setItem(localStorageKeys.friends, JSON.stringify(friends));
      }
    }
  }, [friends]);

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
        <AddFriend server={user ? true : false} setFriends={setFriends} />
      </div>
      <div className="mx-auto flex max-w-screen-md flex-col gap-2">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center gap-2 rounded-lg border p-4"
          >
            <ProfilePic letter={friend.name[0]} color={friend.pfpColor} />
            <p className="font-semibold text-muted-foreground">{friend.name}</p>
            <RemoveFirendButton
              server={user ? true : false}
              setFriends={setFriends}
              friend={friend}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function RemoveFirendButton({
  server,
  friend,
  setFriends,
}: {
  server: boolean;
  friend: Friend;
  setFriends: React.Dispatch<React.SetStateAction<Friend[]>>;
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
              if (server) {
                removeFriend(friend.id);
              }
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
