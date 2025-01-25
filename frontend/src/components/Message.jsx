import React, { useEffect, useRef } from 'react';
import GetConvo from '../hooks/GetConvo.jsx';
import { useMessageContext } from '../context/MessageContext';

function Message({ chatSelected }) {
    const { selectedChat } = useMessageContext();
    const messages = GetConvo();
    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {messages && messages.map((message, index) => (
                <div
                    key={message._id}
                    className={`chat ${message.receiverId === selectedChat._id ? "chat-end" : "chat-start"}`}
                >
                    <div className={`chat-bubble ${message.receiverId === selectedChat._id ? "chat-bubble-primary" : "chat-bubble"}`}>
                        {message.message}
                    </div>
                    <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:4</div>

                    {/* Apply the lastMessageRef only to the last message */}
                    {index === messages.length - 1 && (
                        <div ref={lastMessageRef} />
                    )}
                </div>
            ))}
        </div>
    );
}

export default Message;
