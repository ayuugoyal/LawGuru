"use client";
import React, { FormEvent } from "react";
import { create_chat } from "@/actions/chat";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const handle_submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = document.querySelector<HTMLInputElement>("#message")!.value;
    const res = await create_chat(message);
    router.push(`/chat/${res.id}`);
  };

  return (
    <>
      <form
        className="rounded-lg shadow-xl p-4 w-2/3"
        onSubmit={(e) => handle_submit(e)}
      >
        <div className="relative flex">
          <input
            id="message"
            type="text"
            placeholder="Type your query here"
            className="input input-bordered w-full"
          />
          <div className="absolute right-0 items-center inset-y-0 flex">
            <button type="submit" className="p-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </form>
      <div></div>
    </>
  );
}
