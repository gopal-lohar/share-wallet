import { FriendInterface } from "@/types/types";
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

export async function removeFriend(friendId: string) {
  const user = await getUserData();
  if (!user) return null;
  // TODO: remove friend
}
