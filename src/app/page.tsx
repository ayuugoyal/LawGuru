import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center h-screen items-center">
      <Link href="/dashboard">
        <div>Get Started</div>
      </Link>
    </div>
  );
}
