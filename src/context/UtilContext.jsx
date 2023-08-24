import React, { createContext, useState } from 'react'
import Axios from "axios"
import {useQuery} from "@tanstack/react-query"

export const UtilContext = createContext(); 
export const UtilProvider = ({children}) => {
  const [navBarSelect, setNavBarSelect] = useState('Construct FA');
  
  return (
    <UtilContext.Provider value={{ 
      navBarSelect,
      setNavBarSelect
     }}>
      {children}
     </UtilContext.Provider>
  )
}
