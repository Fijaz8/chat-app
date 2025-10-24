import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import Settingspage from './Pages/Settingspage'
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage'
import ProfilePage from './Pages/ProfilePage'
import { useAuthStore } from './Store/useAuthStore'
import { useEffect } from 'react'
function App() {
 const {authUser,checkAuth} =useAuthStore()
 useEffect(()=>{
  checkAuth()
 },[checkAuth]) 
 

 console.log(authUser)
 
 return (
    <div  >
      <Navbar/>
      <Routes>
        <Route path='/'  element={<HomePage/>}/>
        <Route path='/signup'  element={<SignupPage/>}/>
        <Route path='/login'  element={<LoginPage/>}/>
        <Route path='/settings'  element={<Settingspage/>}/>
        <Route path='/profile'  element={<ProfilePage/>}/>

      </Routes>
  
    </div>
  )
}

export default App
