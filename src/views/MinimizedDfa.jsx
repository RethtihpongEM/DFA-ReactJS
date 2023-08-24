import {useEffect, useContext, useState} from "react";

import {MinimizedContext} from "../context/MinimizedContext";
import {DfaTransitionTable} from "../components/MinimizedComponents/DfaTransitionTable.jsx";
import {MinimizedTableResulModal} from "../components/MinimizedComponents/MinimizeTableResultModal.jsx";
import {UtilContext} from "../context/UtilContext.jsx";

export const MinimizedDfa = () => {
  const {
    generateStates,
    states,
    dfa,
    generateAlphabets,
    alphabets,
    handleStartState,
    handleFinalState,
    initializeTransitionTable,
    handleSubmit,
    setShowModal,
  } = useContext(MinimizedContext);
  const {setNavBarSelect} = useContext(UtilContext)
  useEffect(() => {
    setNavBarSelect('Minimize DFA')
  })
  useEffect(() => {
    generateAlphabets();
    generateStates();
  }, []);
  return (
    <main className="flex flex-col gap-4">
      <section className="w-full">
        <div className={"flex flex-col gap-4"}>
          <div className={"h-full flex gap-4 w-full"}>
            <div className="w-full grid grid-cols-4 gap-4">
              {/* get number of states */}
              <div
                className="h-full p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center">
                <label className={"flex gap-1 items-center"} htmlFor="state">
                  <span>State:</span>
                  <input
                    min={1}
                    defaultValue={1}
                    type="number"
                    required
                    max={5}
                    onChange={(event) => {
                      generateStates(event.target.value);
                      initializeTransitionTable(
                        event.target.value,
                        alphabets.length
                      );
                    }}
                    className="border-2 border-blue-500 px-2 py-1 w-full"
                    id="state"
                    placeholder="Number of States..."
                  />
                </label>
                <div className={'grid grid-cols-4 gap-4'}>
                  {states?.map((fs, key) => {
                    return (
                      <span className={'text-center text-blue-600 font-semibold text-sm rounded-[20px] bg-blue-300'}
                            key={key}>
                            {fs}
                          </span>
                    );
                  })}{" "}
                </div>
              </div>

              {/* get number of alphabets */}
              <div
                className="h-full p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center">
                <label className={"flex items-center gap-1"} htmlFor="alphabet">
                  <span>Alphabet:</span>
                  <input
                    required
                    min="1"
                    defaultValue="1"
                    onChange={(event) => {
                      generateAlphabets(event.target.value);
                      initializeTransitionTable(
                        states.length,
                        event.target.value
                      );
                    }}
                    max="5"
                    type="number"
                    id="alphabet"
                    placeholder="Number of Alphabets"
                    className="border-2 border-blue-500 px-2 py-1 w-full"
                  />
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {alphabets?.map((fa, key) => {
                    return (
                      <span className={'text-center text-gray-950 font-semibold text-sm rounded-[20px] bg-gray-400'}
                            key={key}>
                            {" "}
                        {fa}
                        {alphabets.length - 1 !== key && ", "}
                          </span>
                    );
                  })}
                </div>
              </div>
              {states.length > 0 && (
                <>
                  {/* Start State */}
                  <div
                    className="h-full p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center">
                    <div className="flex flex-col gap-2 items-center">
                      <div>Start State</div>
                      <div className={'grid grid-cols-4 gap-4'}>
                        {states?.map((state, key) => {
                          return (
                            <div key={key} className="flex gap-1 items-center">
                              <input
                                type="checkbox"
                                onChange={(event) => {
                                  handleStartState(event);
                                }}
                                checked={dfa?.startState[0] == state}
                                value={state}
                                id={state}
                              />
                              <label htmlFor={state}>{state}</label>
                            </div>
                          );
                        })}
                      </div>
                      <div className={'w-[50%] whitespace-nowrap py-0.5 text-center text-blue-600 font-semibold text-sm rounded-[20px] bg-blue-300'}>
                        {dfa.startState[0]}
                      </div>
                    </div>
                  </div>
                  {/* Final State */}
                  <div
                    className={
                      "h-full p-4 border-2 rounded-tl-md rounded-tr-md border-blue-500 w-full shadow-lg flex flex-col gap-2 justify-center"
                    }
                  >
                    <div className={'flex flex-col gap-2 items-center'}>
                      <div>Final State</div>
                      <div className="grid grid-cols-4 gap-4">
                        {states?.map((state, key) => {
                          return (
                            <div key={key} className="flex gap-1 items-center">
                              <input
                                type="checkbox"
                                onChange={(event) => {
                                  handleFinalState(event);
                                }}
                                value={state}
                                id={state}
                              />
                              <label htmlFor={state}>{state}</label>
                            </div>
                          );
                        })}
                      </div>
                      <div className={'w-full grid grid-cols-4 gap-4'}>
                        {dfa.finalStates?.map((finalState, key) => (
                          <span className={'whitespace-nowrap py-0.5 text-center text-blue-600 font-semibold text-sm rounded-[20px] bg-blue-300'} key={key}>
                            {finalState}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      <DfaTransitionTable/>


      <MinimizedTableResulModal/>

      <button
        className={
          "transition duration-200 w-fit bg-blue-500 text-white px-2 py-1 rounded-md " +
          "hover:bg-blue-600"
        }
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          handleSubmit()
          setShowModal(true)
        }}
      >
        Submit
      </button>
    </main>
  )

};
