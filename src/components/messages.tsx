"use client";
import { send_message } from "@/actions/chat";
import { Message } from "@/db/schema";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { FormEvent, useState } from "react";

export function ChatMessages({
    messages,
    chatId,
}: {
    messages: Message[];
    chatId: string;
}) {
    const [message, setMessages] = useState(messages);
    const { user } = useUser();
    if (!user) {
        console.log("hahah");
        return <></>;
    }

    const handle_submit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputElement = document.querySelector<HTMLInputElement>("#message")!;
        const query = inputElement.value;
        inputElement.value = "";
        const newMessage = await send_message(chatId, userId, query);
        console.log(newMessage);
        setMessages([...message, newMessage])
    };

    const pos = ["start", "end"];
    let i = 0;
    return (
        <div>
            <div className="items-center align-middle">
                {message.map((x) => {
                    i += 1;
                    return (
                        <div className={`chat chat-start ${pos[(i % 2) - 1]}`} key={x.id}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <Image
                                        alt="Tailwind CSS chat bubble component"
                                        src={x.sender != 'robot' ? "/justice.jpg" : "/lawlogo1.png"}
                                        width={100}
                                        height={100}
                                    />
                                </div>
                            </div>
                            <div className="chat-header">
                                {
                                    x.sender != 'robot' ?
                                        <p className="pt-2">{user.firstName + (user.lastName ?? "")}</p>
                                        : <p className="pt-2">Robot</p>
                                }
                                <time className="text-xs opacity-50">
                                    {x.created_at.getHours()}:{x.created_at.getMinutes()}
                                </time>
                            </div>
                            <div className="chat-bubble">{x.content}</div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                    );
                })}
            </div>
            <div>
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
            </div>
        </div>
    );
}
