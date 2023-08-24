import React, {useContext} from 'react'
import {MainContext} from '../../context/MainContext'

export const StartState = () => {
  const {fa, handleStartState} = useContext(MainContext);
  const {faStates, faStartState} = fa;
  if (faStates.length > 0) {
    return (
      <div
        className='h-full p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center items-center'>
        <div className='flex flex-col gap-2 items-center'>
          <div>
            Start State
          </div>
          <div className={'grid grid-cols-4 gap-4'}>
            {faStates?.map((fs, key) => {
              return (
                <div key={key} className={'flex items-center gap-1'}>
                  <input onChange={() => {
                    handleStartState(fs)
                  }} checked={faStartState === fs} type="checkbox"/>
                  <label htmlFor="">{fs}</label>
                </div>
              )
            })}
          </div>
        </div>
        <div className={'w-[40%] whitespace-nowrap py-0.5 text-center text-blue-600 font-semibold text-sm rounded-[20px] bg-blue-300'}>
          {faStartState}
        </div>
      </div>
    )
  }
}
