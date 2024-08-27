export default function Test() {
  return "";
}

// import { useEffect, useState } from "react";
// import { Check, PlusIcon } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { Cross1Icon } from "@radix-ui/react-icons";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { cn } from "@/lib/utils";

// type Friend = { _id: string; id: string; name: string };

// export default function AddExpenseWith({
//   expense,
//   setExpense,
// }: {
//   expense: Expense;
//   setExpense: React.Dispatch<React.SetStateAction<Expense>>;
// }) {
//   const [open, setOpen] = useState(false);
//   const [optionsResponse, setOptionsResponse] = useState<CustomAxiosResponse>({
//     data: null,
//     loading: false,
//     error: false,
//   });
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     let fetchOptionsTimeout: NodeJS.Timeout | null = null;
//     setOptionsResponse({ data: null, loading: true, error: false });
//     fetchOptionsTimeout = setTimeout(() => {
//       axiosRequest({
//         path: `/user/friends?search=${encodeURIComponent(searchQuery)}`,
//         setResponse: setOptionsResponse,
//       });
//     }, 250);

//     return () => {
//       if (fetchOptionsTimeout) {
//         clearTimeout(fetchOptionsTimeout);
//       }
//     };
//   }, [searchQuery]);

//   return (
//     <div className="flex gap-2 flex-wrap">
//       {expense.expenseWith.map((friend) => (
//         <Badge
//           key={friend.id}
//           variant="outline"
//           className="p-1 pl-2 rounded-full h-9"
//         >
//           {friend.name}
//           <Button
//             variant="secondary"
//             className="size-6 rounded-full flex items-center justify-center shrink-0 p-0 relative ml-1"
//             onClick={(e) => {
//               e.preventDefault();
//               setExpense((prevExpense) => ({
//                 ...prevExpense,
//                 expenseWith: prevExpense.expenseWith.filter(
//                   (expenseWithFriend) =>
//                     expenseWithFriend.id !== friend.id
//                 ),
//               }));
//             }}
//           >
//             <Cross1Icon className="size-3/5" />
//           </Button>
//         </Badge>
//       ))}

//       <Popover open={open} onOpenChange={setOpen}>
//         <PopoverTrigger asChild>
//           <Button variant="outline" className="rounded-full size-9 p-0">
//             <PlusIcon />
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-[200px] p-0">
//           <Command>
//             <CommandInput
//               value={searchQuery}
//               onValueChange={(e) => {
//                 setSearchQuery(e.valueOf());
//               }}
//               placeholder="Search Friends..."
//             />
//             <CommandList>
//               <CommandEmpty>
//                 {optionsResponse.loading && !optionsResponse.error
//                   ? "Loading Friends..."
//                   : ""}
//                 {!optionsResponse.loading && !optionsResponse.error
//                   ? "No Friends found."
//                   : ""}
//                 {optionsResponse.error && "Error loading friends."}
//               </CommandEmpty>
//               <CommandGroup>
//                 {optionsResponse.data &&
//                   optionsResponse.data.map((friend: Friend) => {
//                     const isSelected = expense.expenseWith.some(
//                       (friendInExpense) =>
//                         friendInExpense.id === friend.id
//                     );
//                     return (
//                       <CommandItem
//                         key={friend.id}
//                         value={friend.name}
//                         onSelect={() => {
//                           if (isSelected) return;
//                           setExpense((prevExpense) => ({
//                             ...prevExpense,
//                             expenseWith: [
//                               ...prevExpense.expenseWith,
//                               { ...friend },
//                             ],
//                           }));
//                           setOpen(false);
//                         }}
//                       >
//                         <Check
//                           className={cn(
//                             "mr-2 h-4 w-4",
//                             isSelected ? "opacity-100" : "opacity-0"
//                           )}
//                         />
//                         {friend.name}
//                       </CommandItem>
//                     );
//                   })}
//               </CommandGroup>
//             </CommandList>
//           </Command>
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
