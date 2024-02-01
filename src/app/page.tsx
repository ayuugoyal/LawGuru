import Footer from "@/components/Footer";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex justify-between flex-col">
      <div className="navbar bg-base-100 sm:px-16">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">LawGuru</a>
        </div>
        <div className="navbar-end gap-3">
          <Link className="btn" href="/sign-up">
            Sign Up
          </Link>
          <Link className="btn" href="/sign-in">
            Sign In
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
