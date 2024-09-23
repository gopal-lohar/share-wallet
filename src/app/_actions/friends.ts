import {
  FriendInterface,
  FriendshipStatusEnum,
  UserInterfaceForFriendSearch,
} from "@/types/types";
import { getUserData } from "@/app/_actions/users";

export async function getFriends(): Promise<FriendInterface[] | null> {
  const user = await getUserData();
  if (!user) return null;

  // TODO: fetch friends from db
  return [
    {
      id: "1726425716722-19057104119", //string id
      name: "Tom",
      pfpColor: "hsl(60 ,35% ,45%)",
    },
    {
      id: "1726425722520-11378687460",
      name: "Tony",
      pfpColor: "hsl(60 ,35% ,45%)",
    },
    {
      id: "1726425728673-20772854565",
      name: "Titan",
      pfpColor: "hsl(287 ,35% ,45%)",
    },
  ];
}

export async function getRequestsReceived(): Promise<
  UserInterfaceForFriendSearch[]
> {
  const user = await getUserData();
  if (!user) return [];

  return [
    {
      id: "id_3",
      name: "Bob",
      pfpColor: "hsl(60, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.RequestReceived,
    },
    {
      id: "id_6",
      name: "Charlie",
      pfpColor: "hsl(60, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.RequestReceived,
    },
  ];
}

export async function getRequestsSent(): Promise<
  UserInterfaceForFriendSearch[]
> {
  const user = await getUserData();
  if (!user) return [];

  return [
    {
      id: "id_2",
      name: "Ben",
      pfpColor: "hsl(60, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.RequestSent,
    },
    {
      id: "id_5",
      name: "Daniel",
      pfpColor: "hsl(60, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.RequestSent,
    },
  ];
}

export async function getUsersForFriendSearch(
  searchInput: string
): Promise<UserInterfaceForFriendSearch[]> {
  const user = await getUserData();
  if (!user) return [];

  return [
    {
      id: "id_1",
      name: "Alice",
      pfpColor: "hsl(246, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.None,
    },
    {
      id: "id_4",
      name: "David",
      pfpColor: "hsl(54, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.RequestSent,
    },
    {
      id: "id_7",
      name: "Grace",
      pfpColor: "hsl(279, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.RequestReceived,
    },
    {
      id: "id_10",
      name: "Jack",
      pfpColor: "hsl(27, 35%, 45%)",
      friendShipStatus: FriendshipStatusEnum.Friends,
    },
  ];
}

export async function removeFriend(friendId: string) {
  const user = await getUserData();
  if (!user) return null;
  // TODO: remove friend
}

export async function sendFriendRequest(friendId: string) {
  const user = await getUserData();
  if (!user) return;
  // TODO: send friend request
}

export async function acceptFriendRequest(friendId: string) {
  const user = await getUserData();
  if (!user) return;
  // TODO: accept friend request
}

export async function rejectFriendRequest(friendId: string) {
  const user = await getUserData();
  if (!user) return;
  // TODO: reject friend request
}

export async function cancelFriendRequest(friendId: string) {
  const user = await getUserData();
  if (!user) return;
  // TODO: cancel friend request
}
