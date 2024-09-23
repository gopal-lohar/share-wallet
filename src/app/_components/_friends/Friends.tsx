import { useEffect, useState, useTransition } from "react";
import ProfilePic from "@/components/ProfilePic";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  FriendshipStatusEnum,
  UserInterfaceForFriendSearch,
} from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getFriends,
  getRequestsReceived,
  getUsersForFriendSearch,
  sendFriendRequest,
  cancelFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
} from "@/app/_actions/friends";
import { Input } from "@/components/ui/input";

export function Friends() {
  const [friendSearchResults, setFriendSearchResults] = useState<
    UserInterfaceForFriendSearch[]
  >([]);
  const [friends, setFriends] = useState<UserInterfaceForFriendSearch[]>([]);
  // request
  const [requests, setRequests] = useState<UserInterfaceForFriendSearch[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [openedTab, setOpenedTab] = useState<"friends" | "requests" | "add">(
    "friends"
  );

  useEffect(() => {
    setLoading(true);
    if (searchInput === "") {
      setFriendSearchResults([]);
      return;
    }
    getUsersForFriendSearch(searchInput)
      .then((data) => {
        setFriendSearchResults(data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
      });
  }, [searchInput, openedTab]);

  useEffect(() => {
    setLoading(true);
    try {
      if (openedTab === "friends") {
        getFriends().then((data) => {
          setFriends(
            data?.map((user) => ({
              ...user,
              friendShipStatus: FriendshipStatusEnum.Friends,
            })) ?? []
          );
          setLoading(false);
        });
      } else if (openedTab === "requests") {
        getRequestsReceived().then((data) => {
          setRequests(data);
          setLoading(false);
        });
      } else if (openedTab === "add") {
        getUsersForFriendSearch(searchInput).then((data) => {
          setFriendSearchResults(data);
          setLoading(false);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [openedTab, searchInput]);

  return (
    <>
      <Tabs
        defaultValue="friends"
        className="h-full"
        value={openedTab}
        onValueChange={(e) => {
          setOpenedTab(e as "friends" | "requests" | "add");
        }}
      >
        <div className="flex">
          <TabsList className="mx-auto">
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="add" className="p-0">
              <div className="relative flex size-8 items-center justify-center">
                <div className="absolute h-[1px] w-1/2 bg-foreground"></div>
                <div className="absolute h-[1px] w-1/2 rotate-90 bg-foreground"></div>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="add" className="h-[calc(100%-3rem)] overflow-auto">
          <div className="pb-4">
            <Input
              value={searchInput}
              placeholder="Search"
              className="w-full"
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          {loading && (
            <div className="flex justify-center py-10">
              <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-foreground"></div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {friendSearchResults.map((user, index) => (
              <UserListCard user={user} key={index} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="friends">
          {loading && (
            <div className="flex justify-center py-10">
              <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-foreground"></div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {friends.length
              ? friends.map((user, index) => (
                  <UserListCard user={user} key={index} />
                ))
              : !loading && (
                  <div className="py-20 text-center">No Friends Found</div>
                )}
          </div>
          {}
        </TabsContent>
        <TabsContent value="requests">
          {loading && (
            <div className="flex justify-center py-10">
              <div className="size-8 animate-spin rounded-full border-4 border-muted border-t-foreground"></div>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {requests.length
              ? requests.map((user, index) => (
                  <UserListCard user={user} key={index} />
                ))
              : !loading && (
                  <div className="py-20 text-center">No Requests Found</div>
                )}
          </div>
        </TabsContent>
      </Tabs>
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
