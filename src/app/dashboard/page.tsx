import { UserButton } from "@clerk/nextjs";

export default function Dashboard() {
  return (
    <div className="h-screen flex justify-center items-center">
      <UserButton afterSignOutUrl="/" />
    </div>
  );
}
