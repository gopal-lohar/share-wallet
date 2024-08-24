export default function ProfilePic({
  letter,
  color,
}: {
  letter: string;
  color: string;
}) {
  return (
    <div
      className={`size-10 rounded-full flex items-center justify-center text-white leading-none`}
      style={{ backgroundColor: color }}
    >
      <span className="text-xl">{letter.toUpperCase()}</span>
    </div>
  );
}
