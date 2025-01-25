import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Home from './pages/Home.jsx'
import toast, { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext.jsx';
function App() {
  const {authUser} = useAuthContext()
  if(!authUser)
    localStorage.removeItem("chat-user")
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <BrowserRouter >
        <Routes>
          <Route path="/login" element={authUser ? <Navigate to="/" />  : <Login/>}></Route>
          <Route path="/signup" element={authUser ? <Navigate to="/" />  : <Signup/>}></Route>
          <Route path="/" element={authUser ? <Home />  : <Navigate to="/login" />}></Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}

export default App
