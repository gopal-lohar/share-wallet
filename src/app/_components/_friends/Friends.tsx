import ProfilePic from "@/components/ProfilePic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FriendshipStatusEnum,
  UserInterfaceForFriendSearch,
} from "@/types/types";
import { useEffect, useState, useTransition } from "react";

export function Friends() {
  const users: UserInterfaceForFriendSearch[] = [
    {
      id: "id_1",
      name: "Alice",
      pfpColor: "hsl(246, 35%, 45%)",
      friendShipStatus: "none",
    },
    {
      id: "id_4",
      name: "David",
      pfpColor: "hsl(54, 35%, 45%)",
      friendShipStatus: "requestSent",
    },
    {
      id: "id_7",
      name: "Grace",
      pfpColor: "hsl(279, 35%, 45%)",
      friendShipStatus: "requestReceived",
    },
    {
      id: "id_10",
      name: "Jack",
      pfpColor: "hsl(27, 35%, 45%)",
      friendShipStatus: "friends",
    },
    {
      id: "id_2",
      name: "Bob",
      pfpColor: "hsl(89, 35%, 45%)",
      friendShipStatus: "none",
    },
    {
      id: "id_3",
      name: "Charlie",
      pfpColor: "hsl(316, 35%, 45%)",
      friendShipStatus: "none",
    },
    {
      id: "id_5",
      name: "Eve",
      pfpColor: "hsl(173, 35%, 45%)",
      friendShipStatus: "requestSent",
    },
    {
      id: "id_6",
      name: "Frank",
      pfpColor: "hsl(45, 35%, 45%)",
      friendShipStatus: "requestSent",
    },
    {
      id: "id_8",
      name: "Heidi",
      pfpColor: "hsl(344, 35%, 45%)",
      friendShipStatus: "requestReceived",
    },
    {
      id: "id_9",
      name: "Ivy",
      pfpColor: "hsl(128, 35%, 45%)",
      friendShipStatus: "requestReceived",
    },
    {
      id: "id_11",
      name: "Kevin",
      pfpColor: "hsl(358, 35%, 45%)",
      friendShipStatus: "friends",
    },
    {
      id: "id_12",
      name: "Lily",
      pfpColor: "hsl(67, 35%, 45%)",
      friendShipStatus: "friends",
    },
  ] as UserInterfaceForFriendSearch[];

  return (
    <>
      {users.map((user) => (
        <UserListCard user={user} key={user.id} />
      ))}
    </>
  );
}

function UserListCard({ user }: { user: UserInterfaceForFriendSearch }) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center gap-2 rounded-lg border p-2">
      <ProfilePic letter={user.name[0]} color={user.pfpColor} />
      <p className="font-semibold text-muted-foreground">{user.name}</p>
      <div className="ml-auto flex gap-2">
        {user.friendShipStatus === FriendshipStatusEnum.None && (
          <RequestButton loading={loading} setLoading={setLoading} />
        )}
        {user.friendShipStatus === FriendshipStatusEnum.RequestSent && (
          <CancelRequestButton loading={loading} setLoading={setLoading} />
        )}
        {user.friendShipStatus === FriendshipStatusEnum.RequestReceived && (
          <>
            <AcceptButton loading={loading} setLoading={setLoading} />
            <RejectButton loading={loading} setLoading={setLoading} />
          </>
        )}
        {user.friendShipStatus === FriendshipStatusEnum.Friends && (
          <RemoveButton loading={loading} setLoading={setLoading} />
        )}
      </div>
    </div>
  );
}

function RequestButton({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="secondary"
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        startTransition(async () => {});
      }}
    >
      <span className={cn(isPending && "text-transparent")}>Request</span>
      {isPending && (
        <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-current"></div>
      )}
    </Button>
  );
}

function CancelRequestButton({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="secondary"
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        startTransition(async () => {});
      }}
    >
      <span className={cn(isPending && "text-transparent")}>
        Cancel Request
      </span>
      {isPending && (
        <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-current"></div>
      )}
    </Button>
  );
}

function AcceptButton({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="secondary"
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        startTransition(async () => {});
      }}
    >
      <span className={cn(isPending && "text-transparent")}>Accept</span>
      {isPending && (
        <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-current"></div>
      )}
    </Button>
  );
}

function RejectButton({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="destructive"
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        startTransition(async () => {});
      }}
    >
      <span className={cn(isPending && "text-transparent")}>Reject</span>
      {isPending && (
        <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-current"></div>
      )}
    </Button>
  );
}

function RemoveButton({
  loading,
  setLoading,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="secondary"
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        startTransition(async () => {});
      }}
    >
      <span className={cn(isPending && "text-transparent")}>Remove</span>
      {isPending && (
        <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-current"></div>
      )}
    </Button>
  );
}

// function Btn({
//   loading,
//   setLoading,
// }: {
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }) {
//   const [isPending, startTransition] = useTransition();
//   useEffect(() => {
//     setLoading(isPending);
//   }, [isPending, setLoading]);

//   return (
//     <Button
//       disabled={loading}
//       variant="secondary"
//       className={cn("relative", isPending && "disabled:opacity-100")}
//       onClick={() => {
//         startTransition(async () => {});
//       }}
//     >
//       <span className={cn(isPending && "text-transparent")}>Request</span>
//       {isPending && (
//         <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-current"></div>
//       )}
//     </Button>
//   );
// }
