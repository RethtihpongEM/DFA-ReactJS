import React, {useContext, useEffect} from 'react'
import {MainContext} from '../context/MainContext'
import {TransitionDiagram} from "../components/FAComponents/TransitionDiagram.jsx";
import * as domain from "domain";
import {UtilContext} from "../context/UtilContext.jsx";

export const Classify = () => {
  const {setNavBarSelect} = useContext(UtilContext);
  const {fa, nfa} = useContext(MainContext);
  const {faStates, faAlphabets, faStartState, faFinalStates} = fa;
  useEffect(() => {
    setNavBarSelect('Classify FA');
  })
  return (
    <main className={'flex flex-col gap-4'}>
      <section className='flex flex-col gap-2 w-1/2'>
        <div className='flex'>
          <p className='font-semibold'>Your States Q:&nbsp;</p>
          <p>
            {faStates?.map((fs, key) => {
              return (
                <span key={key}>{fs} {faStates.length - 1 !== key && ', '}</span>
              )
            })}
          </p>
        </div>
        <div className='flex'>
          <p className='font-semibold'>Your Alphabets:&nbsp;</p>
          <p>
            {faAlphabets?.map((fa, key) => {
              return (
                <span key={key}>
                  {fa}{faAlphabets.length - 1 !== key && ', '}
                </span>
              )
            })}
          </p>
        </div>

        <div>
          <span className='font-semibold'>Start State:</span> {faStartState}
        </div>
        <div className='flex'>
          <p className='font-semibold'>
            Final state: &nbsp;
          </p>
          <p>
            {faFinalStates?.map((ffs, key) => {
              return (
                <span key={key}>{ffs}{faFinalStates.length - 1 !== key && ', '}</span>
              )
            })}
          </p>
        </div>


        <div className='bg-blue-950 rounded-md px-12 py-2 text-white'>
          <span>{`This is ${nfa ? 'an NFA' : 'a DFA'}`}</span>
        </div>
      </section>
      <section className={''}>
        <TransitionDiagram/>
      </section>
    </main>
  )
}