import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UserContext from "@/context/UserContext";
import { useContext } from "react";
import FriendsLocal from "@/app/_components/_friends/FriendsLocal";
import { Friends } from "@/app/_components/_friends/Friends";

export default function FriendsDialog() {
  const user = useContext(UserContext);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-max" variant="secondary">
          Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[calc(100svh_-_1rem)] grid-rows-[auto,1fr]">
        <DialogHeader>
          <DialogTitle>Friends</DialogTitle>
          <DialogDescription>
            Create a transaction with you friends
          </DialogDescription>
        </DialogHeader>
        {user ? <Friends /> : <FriendsLocal />}
      </DialogContent>
    </Dialog>
  );
}
