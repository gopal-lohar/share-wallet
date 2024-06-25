import Counter from "@/components/Counter";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto my-4">
        <Counter></Counter>
      </div>
    </div>
  );
}
