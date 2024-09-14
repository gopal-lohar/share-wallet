import { cn } from "@/lib/utils";

export default function ProfilePic({
  className = "",
  letter,
  color,
}: {
  className?: string;
  letter: string;
  color: string;
}) {
  return (
    <div
      className={cn(
        "flex size-10 shrink-0 items-center justify-center rounded-full text-xl leading-none text-white",
        className
      )}
      style={{ backgroundColor: color }}
    >
      <span>{letter.toUpperCase()}</span>
    </div>
  );
}
