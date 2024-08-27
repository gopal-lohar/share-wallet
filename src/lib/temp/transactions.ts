import { Friend, Transaction } from "@/types/types";
import { getPfpColor } from "@/lib/utils";

const friends: Friend[] = [
  { id: `${Math.random()}`, name: "Alice", pfpColor: getPfpColor("Alice") },
  { id: `${Math.random()}`, name: "Bob", pfpColor: getPfpColor("Bob") },
  { id: `${Math.random()}`, name: "Charlie", pfpColor: getPfpColor("Charlie") },
  { id: `${Math.random()}`, name: "David", pfpColor: getPfpColor("David") },
  { id: `${Math.random()}`, name: "Eva", pfpColor: getPfpColor("Eva") },
  { id: `${Math.random()}`, name: "Frank", pfpColor: getPfpColor("Frank") },
  { id: `${Math.random()}`, name: "Grace", pfpColor: getPfpColor("Grace") },
];

const descriptions = [
  "Dinner at the restaurant",
  "Bought groceries",
  "Paid for movie tickets",
  "Gas money",
  "Split the cab fare",
  "Bought snacks for the party",
  "Shared hotel room expenses",
];

const getRandomFriend = (excludeId?: string): Friend => {
  const availableFriends = excludeId
    ? friends.filter((friend) => friend.id !== excludeId)
    : friends;
  return availableFriends[Math.floor(Math.random() * availableFriends.length)];
};

const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];

  const userTransactionsCount: Record<string, number> = {};
  const userLenderCount: Record<string, number> = {};

  while (transactions.length < 50) {
    for (const friend of friends) {
      if (
        userTransactionsCount[friend.id] &&
        userTransactionsCount[friend.id] >= 10
      )
        continue;

      const isLender = (userLenderCount[friend.id] || 0) < 5;
      const lender = isLender ? friend : getRandomFriend(friend.id);
      const borrower = isLender ? getRandomFriend(friend.id) : friend;

      const transaction: Transaction = {
        _id: `${Math.random()}`,
        createdBy: lender.id,
        lender,
        borrower,
        amount: Math.floor(Math.random() * 100) + 1, // Random amount between 1 and 100
        description:
          descriptions[Math.floor(Math.random() * descriptions.length)],
        createdAt: new Date().toISOString(),
        editedAt: new Date().toISOString(),
      };

      transactions.push(transaction);

      userTransactionsCount[friend.id] =
        (userTransactionsCount[friend.id] || 0) + 1;
      if (isLender)
        userLenderCount[friend.id] = (userLenderCount[friend.id] || 0) + 1;

      if (transactions.length >= 50) break;
    }
  }

  return transactions;
};

const tempTransactions = generateTransactions();
export { tempTransactions };
