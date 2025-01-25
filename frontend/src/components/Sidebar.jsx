import React, { useState, useMemo } from 'react';
import { FaSearch } from "react-icons/fa";
import { IoExitOutline } from "react-icons/io5";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import UseGetUser from '../hooks/UseGetUser';
import { useMessageContext } from '../context/MessageContext';
import { useSocketContext } from '../context/SocketContext';

function Sidebar() {
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();
  const { user } = UseGetUser();
  const { setSelectedChat, selectedChat } = useMessageContext();
  const [keyword, setKeyword] = useState("");
  const {onlineUsers} = useSocketContext();
  

  const filteredUsers = useMemo(() => {
    return user.filter(u =>
      u.fullName.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, user]);

  const logout = () => {
    console.log("Logging out...");
    axios.defaults.withCredentials = true;
    axios
      .post("http://localhost:5000/api/auth/logout")
      .then((response) => {
        if (response) {
          localStorage.removeItem("chat-user");
          setAuthUser(null);
          setSelectedChat(null);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        alert("Logout failed. Please try again.");
      });
  };

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full">
      {/* Search Form */}
      <form
        className="flex items-center relative"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          className="input input-bordered rounded-full w-full pr-10"
          placeholder="Search"
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sky-500"
          aria-label="Search"
        >
          <FaSearch />
        </button>
      </form>

      <div className="divider my-4"></div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((u) => (
            <div className="flex cursor-pointer" key={u._id} >
              <div
                className={`flex w-full gap-2 items-center ${selectedChat?._id === u._id && "bg-sky-500"
                  } rounded p-2 py-1`}
                onClick={() => setSelectedChat(u)}
              >
                <div className={`avatar ${onlineUsers?.includes(u._id)?"online" : ""} w-12`}>
                  <div className="w-12 rounded-full">
                    <img src={u.profilePic} alt={u.fullName} />
                  </div>
                </div>
                <div className="flex flex-col flex-1">
                  <p className="font-semibold">{u.fullName}</p>
                </div>
              </div>
            </div>
          ))
        ) : keyword ? (
          <h1>No User Found</h1>
        ) : (
          <h1>Start typing to search...</h1>
        )}
      </div>

      {/* Logout Button at the Bottom */}
      <div className="mt-auto">
        <button
          className="btn btn-circle border-none hover:bg-blue-600"
          onClick={logout}
          aria-label="Logout"
        >
          <IoExitOutline />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
