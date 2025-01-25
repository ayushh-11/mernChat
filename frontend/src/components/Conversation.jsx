import React from 'react';
import Message from './Message';
import { IoSend } from "react-icons/io5";
import { TiMessages } from "react-icons/ti";
import { useMessageContext } from '../context/MessageContext';
import { useState } from 'react';
import axios from 'axios'
import { useAuthContext } from '../context/AuthContext';


function Conversation() {
  const {selectedChat,setMessageRefresh,messageRefresh} = useMessageContext();
  console.log("Selected chat = ",selectedChat)
  const {authUser} = useAuthContext();
  const [msg, setMsg] = useState("") 
  var se = selectedChat;
  function handleSend(e){
    if(msg.trim() == "")
      return;
    e.preventDefault();
    axios.defaults.withCredentials = true;
    axios.post(`http://localhost:5000/api/message/send/${selectedChat._id}`,{msg})
      .then(response => {
        if(response){
          console.log(response)
          setMsg("")
          setMessageRefresh(prev=>!prev)
          setMsg("")
          document.getElementById("messageInput").value = "";
        }
      })
      .catch(error => {
        throw error
      })
      
  }
  return (
    <div className="md:min-w-[450px] flex flex-col" style={{ width: "500px" }}>
      {!selectedChat ?
        <div className='flex items-center justify-center w-full h-full'>
          <div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
            <p>Welcome 👋 {authUser && authUser.fullName} ❄</p>
            <p>Select a chat to start messaging</p>
            <TiMessages className='text-3xl md:text-6xl text-center' />
          </div>
        </div> :
        (
          <>
            {/* Header */}
            <div className="bg-slate-500 px-4 py-2 mb-2 h-12 flex items-center">
              <span className="label-text text-white">To:</span>
              <span className="ml-2 font-semibold text-white">{selectedChat.fullName}</span>
            </div>

            {/* Messages */}
            <Message selectedChat={selectedChat}/>

            {/* Message Input */}
            <form onSubmit={handleSend} className="px-4 mt-auto">
              <div className="relative">
                <input
                  id="messageInput"
                  className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 text-white"
                  type="text"
                  placeholder="Send a message"
                  onChange={(e)=>setMsg(e.target.value)}
                />
                <button type ="submit" className="absolute inset-y-0 right-3 flex items-center text-white">
                  <IoSend />
                </button>
              </div>
            </form>
          </>
        )}
    </div>

  );
}

export default Conversation;
