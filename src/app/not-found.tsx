import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wfull flex h-[calc(100vh-10rem)] items-center justify-center">
      <div className="rounded-md border p-4">
        <h2 className="text-center text-xl font-medium">Page Not Found</h2>
        <p className="text-clip">Could not find requested resource</p>
        <Button className="mt-4 w-full" variant="secondary" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
