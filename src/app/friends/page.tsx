import { getFriends } from "../_actions/friends";
import Friends from "./_components/Friends";

export default async function UserPage() {
  const friends = await getFriends();
  return <Friends friendsProps={friends} />;
}
