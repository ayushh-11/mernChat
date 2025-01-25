import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import {useMessageContext} from "../context/MessageContext";



const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useMessageContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {
			newMessage.shouldShake = true;
			setMessages([...messages, newMessage]);
		});

		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;