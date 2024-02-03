import { get_chats } from "@/actions/chat";
import Link from "next/link";
import React from "react";

const page = async () => {
  const chats = await get_chats();

  if (chats.length == 0) {
    return <div>You have no chats yet! </div>;
  }

  return chats.map((ch) => {
    return (
      <div className="flex flex-row justify-normal" key={ch.id}>
        <Link href={`/chat/${ch.id}`}>
          <div>{ch.title == "" ? "chat" : ch.title}</div>
        </Link>
      </div>
    );
  });
};

export default page;
