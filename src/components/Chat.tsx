import Image from "next/image";

const Chat = () => {
    return (
        <div>
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Image
                            alt="Tailwind CSS chat bubble component"
                            src="/justice.jpg"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className="chat-header">
                    Obi-Wan Kenobi
                    <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">You were the Chosen One!</div>
                <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <Image
                            alt="Tailwind CSS chat bubble component"
                            src="/justice.jpg"
                            width={100}
                            height={100}
                        />
                    </div>
                </div>
                <div className="chat-header">
                    Anakin
                    <time className="text-xs opacity-50">12:46</time>
                </div>
                <div className="chat-bubble">I hate you!</div>
                <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
        </div>
    );
};

export default Chat;
