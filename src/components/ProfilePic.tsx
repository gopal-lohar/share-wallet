export default function ProfilePic({
  letter,
  color,
}: {
  letter: string;
  color: string;
}) {
  return (
    <div
      className={`flex size-10 items-center justify-center rounded-full leading-none text-white`}
      style={{ backgroundColor: color }}
    >
      <span className="text-xl">{letter.toUpperCase()}</span>
    </div>
  );
}
