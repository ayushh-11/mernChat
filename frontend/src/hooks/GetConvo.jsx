import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMessageContext } from '../context/MessageContext';
import { useSocketContext } from '../context/SocketContext.jsx';

export default function GetConvo() {
    const [messages, setMessages] = useState([]);
    const { selectedChat, messageRefresh, setMessageRefresh } = useMessageContext();
    const { socket } = useSocketContext();

    useEffect(() => {
        if (!selectedChat) return;
        axios.defaults.withCredentials = true;
        axios
            .get(`http://localhost:5000/api/message/${selectedChat._id}`)
            .then(response => {
                console.log('Messages =', response.data);
                setMessages(response.data);
            })
            .catch(error => {
                console.error('Error fetching messages:', error);
            });
    }, [selectedChat, messageRefresh]);

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            newMessage.shouldShake = true;
            // Correctly append the new message to the previous state
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        return () => socket?.off("newMessage");
    }, [socket]);

    return messages;
}
