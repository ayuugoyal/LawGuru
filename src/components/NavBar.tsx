import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { MdRecentActors } from "react-icons/md";
import { GoLaw } from "react-icons/go";
import { IoChatbubblesOutline } from "react-icons/io5";

const NavBar = () => {
  return (
    <ul className="menu flex items-center menu-horizontal bg-base-200 rounded-box">
      <li>
        <Link href="/dashboard">
          <IoChatbubblesOutline className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <Link href="/recentchats">
          <MdRecentActors className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <Link href="/lawyer">
          <GoLaw className="h-5 w-5" />
        </Link>
      </li>
      <li>
        <UserButton afterSignOutUrl="/" />
      </li>
    </ul>
  );
};

export default NavBar;
