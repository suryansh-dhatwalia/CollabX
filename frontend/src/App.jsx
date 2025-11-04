import React from 'react'; 
import { useState } from 'react'
import './App.css'
import AppRoutes from './routes/AppRoutes.jsx'
import { UserProvider } from './context/user.context.jsx';
import 'remixicon/fonts/remixicon.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <UserProvider>
    <AppRoutes />
    </UserProvider>
    
    </>

  )
}

export default App
