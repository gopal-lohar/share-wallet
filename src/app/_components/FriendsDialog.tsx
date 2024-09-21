import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Friends from "@/app/_components/Friends";
import { Friend } from "@/types/types";

export default function FriendsDialog({
  friendsProps,
}: {
  friendsProps: Friend[] | null;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-max" variant="secondary">
          Friends
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>your Friends</DialogTitle>
          <DialogDescription>
            Create a transaction with you friends
          </DialogDescription>
        </DialogHeader>
        <Friends friendsProps={friendsProps} />
      </DialogContent>
    </Dialog>
  );
}
