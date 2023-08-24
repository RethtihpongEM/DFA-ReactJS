import React, { useContext } from 'react'
import { UtilContext } from '../context/UtilContext'

export const Header = () => {
  const {navBarSelect} = useContext(UtilContext)
  return (
    <div className='min-[1880px]:px-96
    lg:px-16
    md:px-6 px-6 min-h-[64px] w-full py-6 pl-6 bg-slate-500 text-white font-semibold text-2xl'>
      {navBarSelect}
    </div>
  )
}
