import { useCallback, useEffect, useState, useTransition } from "react";
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
import { toast } from "sonner";

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

  const updateFriendShipStatus = useCallback(
    (friendShipStatus: FriendshipStatusEnum, friendId: string) => {
      if (openedTab === "add") {
        setFriendSearchResults((prev) => {
          return prev.map((user) => {
            if (user.id === friendId) {
              return {
                ...user,
                friendShipStatus,
              };
            }
            return user;
          });
        });
      } else if (openedTab === "friends") {
        console.log("first");
        setFriends((prev) => {
          return prev.map((user) => {
            if (user.id === friendId) {
              return {
                ...user,
                friendShipStatus,
              };
            }
            return user;
          });
        });
      } else if (openedTab === "requests") {
        setRequests((prev) => {
          return prev.map((user) => {
            if (user.id === friendId) {
              return {
                ...user,
                friendShipStatus,
              };
            }
            return user;
          });
        });
      }
    },
    [openedTab]
  );

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
              <UserListCard
                user={user}
                key={index}
                updateFriendShipStatus={updateFriendShipStatus}
              />
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
                  <UserListCard
                    user={user}
                    key={index}
                    updateFriendShipStatus={updateFriendShipStatus}
                  />
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
                  <UserListCard
                    user={user}
                    key={index}
                    updateFriendShipStatus={updateFriendShipStatus}
                  />
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

function UserListCard({
  user,
  updateFriendShipStatus,
}: {
  user: UserInterfaceForFriendSearch;
  updateFriendShipStatus: (
    friendShipStatus: FriendshipStatusEnum,
    friendId: string
  ) => void;
}) {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex items-center gap-2 rounded-lg border p-2">
      <ProfilePic letter={user.name[0]} color={user.pfpColor} />
      <p className="font-semibold text-muted-foreground">{user.name}</p>
      <div className="ml-auto flex gap-2">
        {user.friendShipStatus === FriendshipStatusEnum.None && (
          <RequestButton
            loading={loading}
            friendId={user.id}
            setLoading={setLoading}
            updateFriendShipStatus={updateFriendShipStatus}
          />
        )}
        {user.friendShipStatus === FriendshipStatusEnum.RequestSent && (
          <CancelRequestButton
            loading={loading}
            friendId={user.id}
            setLoading={setLoading}
            updateFriendShipStatus={updateFriendShipStatus}
          />
        )}
        {user.friendShipStatus === FriendshipStatusEnum.RequestReceived && (
          <>
            <AcceptButton
              loading={loading}
              friendId={user.id}
              setLoading={setLoading}
              updateFriendShipStatus={updateFriendShipStatus}
            />
            <RejectButton
              loading={loading}
              friendId={user.id}
              setLoading={setLoading}
              updateFriendShipStatus={updateFriendShipStatus}
            />
          </>
        )}
        {user.friendShipStatus === FriendshipStatusEnum.Friends && (
          <RemoveButton
            loading={loading}
            friendId={user.id}
            setLoading={setLoading}
            updateFriendShipStatus={updateFriendShipStatus}
          />
        )}
      </div>
    </div>
  );
}

function RequestButton({
  loading,
  setLoading,
  friendId,
  updateFriendShipStatus,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  friendId: string;
  updateFriendShipStatus: (
    friendShipStatus: FriendshipStatusEnum,
    friendId: string
  ) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        setIsPending(true);
        const promise = new Promise<void>((resolve, reject) => {
          sendFriendRequest(friendId)
            .then(() => {
              updateFriendShipStatus(
                FriendshipStatusEnum.RequestSent,
                friendId
              );
              resolve();
            })
            .catch(() => {
              reject();
            });
        });

        toast.promise(promise, {
          loading: "Sending Request...",
          success: "Request Sent",
          error: "Failed to send request",
        });
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
  friendId,
  updateFriendShipStatus,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  friendId: string;
  updateFriendShipStatus: (
    friendShipStatus: FriendshipStatusEnum,
    friendId: string
  ) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="outline"
      className={cn(
        "relative border-destructive text-destructive hover:bg-accent/50 hover:text-destructive",
        isPending && "disabled:opacity-100"
      )}
      onClick={() => {
        setIsPending(true);
        const promise = new Promise<void>((resolve, reject) => {
          cancelFriendRequest(friendId)
            .then(() => {
              updateFriendShipStatus(FriendshipStatusEnum.None, friendId);
              resolve();
            })
            .catch(() => {
              reject();
            });
        });

        toast.promise(promise, {
          loading: "Cancelling Request...",
          success: "Request Cancelled",
          error: "Failed to cancel request",
        });
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
  friendId,
  updateFriendShipStatus,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  friendId: string;
  updateFriendShipStatus: (
    friendShipStatus: FriendshipStatusEnum,
    friendId: string
  ) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="secondary"
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        setIsPending(true);
        const promise = new Promise<void>((resolve, reject) => {
          acceptFriendRequest(friendId)
            .then(() => {
              updateFriendShipStatus(FriendshipStatusEnum.Friends, friendId);
              resolve();
            })
            .catch(() => {
              reject();
            });
        });

        toast.promise(promise, {
          loading: "Accepting Request...",
          success: "Request Accepted",
          error: "Failed to accept request",
        });
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
  friendId,
  updateFriendShipStatus,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  friendId: string;
  updateFriendShipStatus: (
    friendShipStatus: FriendshipStatusEnum,
    friendId: string
  ) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="outline"
      className={cn(
        "relative border-destructive text-destructive hover:bg-accent/50 hover:text-destructive",
        isPending && "disabled:opacity-100"
      )}
      onClick={() => {
        setIsPending(true);
        const promise = new Promise<void>((resolve, reject) => {
          rejectFriendRequest(friendId)
            .then(() => {
              updateFriendShipStatus(FriendshipStatusEnum.None, friendId);
              resolve();
            })
            .catch(() => {
              reject();
            });
        });

        toast.promise(promise, {
          loading: "Rejecting Request...",
          success: "Request Rejected",
          error: "Failed to reject request",
        });
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
  friendId,
  updateFriendShipStatus,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  friendId: string;
  updateFriendShipStatus: (
    friendShipStatus: FriendshipStatusEnum,
    friendId: string
  ) => void;
}) {
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setLoading(isPending);
  }, [isPending, setLoading]);

  return (
    <Button
      disabled={loading}
      variant="destructive"
      className={cn("relative", isPending && "disabled:opacity-100")}
      onClick={() => {
        setIsPending(true);
        const promise = new Promise<void>((resolve, reject) => {
          removeFriend(friendId)
            .then(() => {
              updateFriendShipStatus(FriendshipStatusEnum.None, friendId);
              resolve();
            })
            .catch(() => {
              reject();
            });
        });

        toast.promise(promise, {
          loading: "Removing Friend...",
          success: "Friend Removed",
          error: "Failed to remove friend",
        });
      }}
    >
      <span className={cn(isPending && "text-transparent")}>Remove</span>
      {isPending && (
        <div className="absolute size-7 animate-spin rounded-full border-4 border-background border-t-current"></div>
      )}
    </Button>
  );
}
