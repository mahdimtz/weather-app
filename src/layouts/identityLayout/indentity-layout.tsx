import Stack from '@mui/material/Stack'
import React from 'react'
import { Outlet } from 'react-router-dom'

const IdentityLayout:React.FC = () => {
  return (
    <Stack
    width={"100vw"}
    height={"100vh"}
    justifyContent={"center"}
    alignItems={"center"}
    direction={"column"}
   
  >
      <Outlet/>
    
  </Stack>
  )
}

export default IdentityLayout