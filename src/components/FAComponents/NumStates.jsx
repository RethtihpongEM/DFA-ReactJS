import React, {useContext} from 'react'
import {MainContext} from '../../context/MainContext'

export const NumStates = () => {
  const {fa, generateStates, error} = useContext(MainContext);
  const {faStates} = fa;
  return (
    <div
      className='h-full p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center'>
      {/* get number of states */}
      <label className={"flex gap-1 items-center"} htmlFor="state">
        <span>State:</span>
        <input
          min={"0"} type="number" required
          onChange={event => {
            generateStates(event)
          }}
          value={faStates.length}
          className="border-2 border-blue-500 px-2 py-1 w-full" id="state" placeholder='Number of States...'/>
      </label>
      <div className='flex flex-col gap-2'>
        <div className={'grid grid-cols-4 gap-4'}>
          {faStates?.map((fs, key) => {
            return <span key={key} className={'text-center text-blue-600 font-semibold text-sm rounded-[20px] bg-blue-300'}>{fs}</span>
          })}
        </div>
      </div>
    </div>
  )
}
