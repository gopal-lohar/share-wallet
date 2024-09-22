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
import FriendsLocal from "@/app/_components/FriendsLocal";
import { Friends } from "@/app/_components/Friends";

export default function FriendsDialog() {
  const user = useContext(UserContext);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-max" variant="secondary">
          Friends
        </Button>
      </DialogTrigger>
      <DialogContent>
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
