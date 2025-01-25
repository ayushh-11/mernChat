import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

function UseGetUser() {
    const [user, setUser] = useState([])
    useEffect( () => {
        axios.defaults.withCredentials = true;
        axios.get("http://localhost:5000/api/chats")
            .then(response => {
                setUser(response.data);
                return {response}
            })
    }, [])
    return {user}
}

export default UseGetUser