import { get_all_messages, get_chat } from "@/actions/chat";
import { ChatMessages } from "@/components/messages";

export default async function chat({ params }: {
    params: {
        id: string
    }
}) {
    const chatId = params.id;
    const chatInfo = await get_chat(chatId);
    const messages = await get_all_messages(chatId);
    console.log(messages);

    return (
        <>
            <div className="flex flex-row items-center justify-center">
                <ChatMessages messages={messages} chatId={chatInfo.id} />
            </div>
            <div></div>
        </>
    );
}
