import React, {useContext, useEffect, useState} from 'react'
import {MainContext} from '../../context/MainContext'

export const FinalStates = () => {
  const {fa, handleFinalState} = useContext(MainContext)
  const {faStates, faFinalStates} = fa;

  if (faStates.length > 0) {
    return (
      <div
        className={'h-full p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center'}>
        <div className={'flex flex-col gap-2 items-center'}>
          <div>
            Final State
          </div>
          <div className='grid grid-cols-4 gap-4'>
            {faStates?.filter(fs => fs !== 'Trap').map((fs, key) => {
              return (
                <div key={key} className='flex gap-1 items-center'>
                  <input checked={faFinalStates.includes(fs)} type="checkbox" onChange={(event) => {
                    handleFinalState(event)
                  }} value={fs} id={fs}/>
                  <label htmlFor={fs}>{fs}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className={'grid grid-cols-4 gap-4'}>
          {faFinalStates?.map((fss, key) => (
            <span className={'whitespace-nowrap py-0.5 text-center text-blue-600 font-semibold text-sm rounded-[20px] bg-blue-300'} key={key}>{fss}</span>
          ))}
        </div>
      </div>
    )
  }

}
