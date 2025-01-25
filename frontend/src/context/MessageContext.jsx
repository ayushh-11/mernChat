import { createContext, useContext, useState } from "react";

export const MessageContext = createContext();

export const useMessageContext = () =>{
    return useContext(MessageContext);
}

export const MessageContextProvider = ({children}) => {
    const [messages, setMessage] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null);
    const [messageRefresh, setMessageRefresh] = useState(false)
    return <MessageContext.Provider value={{messages, setMessage, selectedChat, setSelectedChat,messageRefresh,setMessageRefresh}}>
        {children}
    </MessageContext.Provider>
}