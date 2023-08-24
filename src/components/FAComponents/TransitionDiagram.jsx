import React, {useContext} from "react";
import {MainContext} from "../../context/MainContext.jsx";

export const TransitionDiagram = () => {
  const {fa} = useContext(MainContext);
  const {transitionSets} = fa;
  if (transitionSets.length > 0) {
    return (
      <div
        className={'h-full p-4 w-full box-border flex flex-col items-center border-blue-500 border-2 rounded-tl-md rounded-tr-md'}>
        <div className={'grid grid-cols-5 gap-6 w-fit'}>
          {transitionSets?.map((set, key) => {
            return (
              <div key={key}
                   className={'h-full p-4 w-full flex flex-col border-blue-500 border-2 rounded-tl-md rounded-tr-md gap-2'}>
                {set.map((s, key) => {
                  return (
                    <div key={key} className={'w-fit text-white bg-blue-950 text-center px-2 py-1 rounded-md'}>
                      {s.startState && <span className={'text-xs text-center'}>Start state <br/></span>}
                      {s.finalState && <span className={'text-xs text-center'}>Final State <br/></span>}
                      {s.transitState}&nbsp; -&gt; &nbsp;
                      {s.transitAlphabet}&nbsp;
                      =&nbsp;{s.transitResult.map((res, key) => (
                      <span key={key}>{res}{s.transitResult.length - 1 !== key && ', '}</span>)
                    )
                    }
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    );
  }
};