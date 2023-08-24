import React, {createContext, useState} from 'react'

export const MainContext = createContext();
export const MainProvider = ({children}) => {
  const [error, setError] = useState({});
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [epsilonCheck, setEpsilonCheck] = useState(false);
  const [nfa, setNfa] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);

  // fa definitions
  const [fa, setFa] = useState({
    faStates: [],
    faAlphabets: [],
    faStartState: '',
    faFinalStates: [],
    transitionSets: Array.from({length: rows}, (_, rowIndex) => Array.from({length: cols}, (_, colIndex) => {
      return {
        transitState: `q${rowIndex}`,
        transitAlphabet: String.fromCharCode(colIndex + 97),
        // transitResult: ['q0'],
        transitResult: [],
        startState: true,
        finalState: true,
      }
    })),
  });


  
  const [inputString, setInputString] = useState('');

  const clearFaState = () => {
    fa.faStates = [];
    fa.faStartState = '';
    fa.faFinalStates = [];
    setFa({...fa});
  }

  const clearTransition = () => {
    fa.transitionSets = Array.from({length: rows}, (_, rowIndex) => Array.from({length: cols}, (_, colIndex) => {
      return {
        transitState: `q${rowIndex}`,
        transitAlphabet: String.fromCharCode(colIndex + 97),
        transitResult: [],
        startState: fa.faStartState === `q${rowIndex}`,
        finalState: fa.faFinalStates.includes(`q${rowIndex}`)
      }
    }))

    setFa({...fa})
  }

  const generateStates = (event) => {
    setError({...error, stateError: ''});
    clearFaState();
    clearTransition();
    setFa({...fa});

    // if 0 clear states
    if (Number(event.target.value) <= 0) {
      setRows(0);
      clearFaState();
    }
    // if (Number(event.target.value) > 0 && Number(event.target.value) <= 5) {
    if (Number(event.target.value) > 0) {
      setRows(Number(event.target.value));
      // set rows and columns
      for (let i = 0; i < Number(event.target.value); i++) {
        // insert new states
        fa.faStates.push(`q${i}`)
        // update default transition values
        fa.transitionSets = Array.from({length: Number(event.target.value)}, (_, rowIndex) => Array.from({length: cols}, (_, colIndex) => {
          return {
            transitState: `q${rowIndex}`,
            transitAlphabet: String.fromCharCode(colIndex + 97),
            // transitResult: [`q0`],
            transitResult: [],
            startState: `q${rowIndex}` === fa.faStartState,
            finalState: false
          }
        }))

        // update state
        setFa({
          ...fa, faStartState: `q0`, // set a default value for start state
        })
      }
    }
    // else if (Number(event.target.value) >= 6) {
    //   setError({...error, stateError: 'Cannot exceed 5 states'})
    //   clearFaState();
    //   clearTransition();
    // }
  }

  const adjustEpsilon = () => {
    setError({...error, nfaError: ''})
    // remove epsilon
    if (epsilonCheck) {
      const index = fa.faAlphabets.indexOf('$');
      fa.faAlphabets.splice(index, 1);
      setEpsilonCheck(false);
      setFa({...fa})
      classifyFA()
      clearTransition();
    }
    // add epsilon
    if (!epsilonCheck) {
      // removeTrap()
      setEpsilonCheck(true)
      fa.faAlphabets.push('$')

      fa.transitionSets = Array.from({length: rows}, (_, rowIndex) => Array.from({length: fa.faAlphabets.length}, (_, colIndex) => {
        return {
          transitState: `q${rowIndex}`,
          transitAlphabet: colIndex !== fa.faAlphabets.length - 1 ? String.fromCharCode(colIndex + 97) : '$',
          // transitResult: [`q0`],
          transitResult: [],
          startState: fa.faStartState === `q${rowIndex}`,
          finalState: fa.faFinalStates.includes(`q${rowIndex}`)
        }
      }))

      classifyFA()
      setFa({...fa})
    }
  }

  const clearFaAlphabets = () => {
    setEpsilonCheck(false);
    setNfa(false)
    fa.faAlphabets = []
    setFa({...fa});
  }

  const generateAlphabets = (event) => {
    setError({...error, alphabetError: ''});
    // to reinitialize alphabets and transition every time the number of alphabets changes
    clearFaAlphabets();
    clearTransition();
    setFa({...fa})
    // if 0 clear alphabets
    if (Number(event.target.value) <= 0) {
      setCols(0);
      clearFaAlphabets();
    }

    // if (Number(event.target.value) > 0 && Number(event.target.value) <= 5) {
    if (Number(event.target.value) > 0 && Number(event.target.value) <= 26) {
      setCols(Number(event.target.value));

      for (let i = 0; i < Number(event.target.value); i++) {
        // insert new alphabets
        fa.faAlphabets.push(String.fromCharCode(i + 97)) // convert from integer to character
        // update default transition values
        fa.transitionSets = Array.from({length: rows}, (_, rowIndex) => Array.from({length: Number(event.target.value)}, (_, colIndex) => {
          return {
            transitState: `q${rowIndex}`,
            transitAlphabet: String.fromCharCode(colIndex + 97),
            transitResult: [],
            startState: `q${rowIndex}` === fa.faStartState,
            finalState: fa.faFinalStates === `q${rowIndex}`
          }
        }))
        // update state
        setFa({...fa});
      }
    } else if (Number(event.target.value) >= 27) {
      setError({...error, alphabetError: 'Cannot exceed 26 alphabets'})
      clearFaAlphabets()
      clearTransition()
    }
  }

  const handleStartState = (value) => {
    const {transitionSets} = fa;
    // update start state value
    transitionSets.forEach(tr => {
      tr.forEach(set => {
        if (set.transitState !== value) {
          set.startState = false
        } else {
          set.startState = true;
        }
      })
    })

    setFa({...fa, faStartState: value});
  }

  const updateTrFinalState = () => {
    const {transitionSets, faFinalStates} = fa;
    faFinalStates.forEach(ffs => {
      transitionSets.forEach(tr => {
        tr.filter(set => set.transitState === ffs).forEach(set => set.finalState = true)
      })
    })
  }

  const removeTrFinalState = (value) => {
    const {transitionSets} = fa;
    transitionSets.forEach(tr => {
      tr.forEach(set => {
        if (set.transitState === value) {
          set.finalState = false;
        }
      })
    })
  }

  const handleFinalState = (event) => {
    const {value, checked} = event.target;
    const {faFinalStates} = fa;
    if (!checked) {
      // remove one state
      const index = faFinalStates.indexOf(value);
      faFinalStates.splice(index, 1);
      removeTrFinalState(value);
    } else {
      if (!faFinalStates.includes(value)) {
        faFinalStates.push(value)
        updateTrFinalState()
      }
    }
    setFa({...fa})
  }

  const classifyFA = () => {
    const {transitionSets, faAlphabets} = fa;
    let flag = false;
    let sum = 0;

    if (faAlphabets.includes('$')) { // check if alphabet set includes an epsilon
      setNfa(true)
      flag = true;
    } else {
      // Check the total transition
      // If it has this exact amount, TF = Q * Sigma => DFA
      // If over or less => NFA
      transitionSets.forEach(tr => tr.forEach(set => {
        sum += set.transitResult.length;
        if (sum !== fa.faStates.length * fa.faAlphabets.length) {
          setNfa(true)
          flag = true
        } else {
          setNfa(false)
          flag = false
        }
      }))
    }
    if (!flag) {
      setNfa(false);
    }
  }

  const handleTransition = (result, state, alphabet, event) => {
    const {checked} = event.target;
    const {transitionSets} = fa;
    const {row} = state;
    const {col} = alphabet;

    const currentTr = transitionSets[row][col];
    // push transition result
    if (checked && !currentTr.transitResult.includes(result)) {
      currentTr.transitResult.push(result)
      // classify FA
      classifyFA()
    } else { // remove transition result
      currentTr.transitResult.splice(currentTr.transitResult.indexOf(result), 1);
      // classify FA
      classifyFA()
    }
    setFa({...fa})
  }

  const handleString = (event) => { // capture input string
    setError({...error, stringError: ''})
    setIsAccepted(false)
    const {value} = event.target;
    setInputString(value)
  }

  const checkString = () => {
    const {faAlphabets} = fa;
    let i = inputString.length - 1;
    let flag = true;
    // check whether input string fits the existing set of alphabets => return boolean value
    while (i >= 0) {
      if (!faAlphabets.includes(inputString[i])) {
        return false;
      }
      i--;
    }
    return flag;
  }

  function getStartState() {
    const {transitionSets} = fa;
    let startState = [];
    // get the value of start state from the transition function
    // which will be used as the starting node to validate input
    // strings
    transitionSets.forEach(tr => {
      tr.forEach(set => {
        if (set.startState) {
          startState.push(set);
        }
      })
    })
    return startState;
  }

  const findState = (state) => {
    const {transitionSets} = fa
    let result = [];
    // find a state according to the parameter which then
    // will be set as a node to be used to validate the next value
    // of the input string
    transitionSets.forEach(tr => {
      tr.forEach(set => {
        if (set.transitState === state) {
          set.startState = true; // this start state basically indicates as to what node/state the transition should use
          result.push(set);
        } else {
          set.startState = false;
        }
      })
    })
    return result;
  }


  let newStates = [getStartState()]; // initial node to start from, used for validating nfa only
  let containEps = false; // to check whether one of the state's row contain an epsilon transition

  const validateNFA = (string, resultState /*state after iteration*/) => {
    let tmpString = string; // variable to hold string
    let result = resultState; // state after iteration
    // Recursion base case
    if (tmpString.length === 0 && !containEps) {
      newStates = [findState(fa.faStartState)] // set the initial state back to the original start state after finished validating
      // check if one of the final results is of the Final States set
      result.every(res => {
        if (fa.faFinalStates.includes(res)) {
          setIsAccepted(fa.faFinalStates.includes(res))
          return false;
        }
        return true;
      })
      result = []
      return;
    }

    setError({...error, stringError: ''})

    // verify if FA has final states
    if (fa.faFinalStates.length <= 0) {
      setError({...error, stringError: 'Missing Final States'});
      return;
    }

    if (!checkString()) { // verify if string is valid and is of alphabet set
      setError({...error, stringError: 'Some input alphabets are not included in your alphabet set'})
      setIsAccepted(false);
    } else {
      // algorithm from here
      containEps = false;

      result = []

      // loop to get resulting states after each transition by using the initial state
      newStates.forEach(state => state.forEach(st => {
        // push resulting state according to input string
        if (st.transitAlphabet === tmpString[0]) {
          st.transitResult.forEach(res => {
            if (!result.includes(res)) {
              result.push(res)
            }
          })
        }
        // if state has epsilon transition, add that transition result
        if (st.transitAlphabet === '$' && st.transitResult.length > 0) {
          st.transitResult.forEach(res => {
            containEps = true;
            if (!result.includes(res)) {
              result.push(res)
            }
          })
        }
      }))

      // check for any epsilon transitions after first iteration
      // this block only runs if the resulting states from the first iteration
      // does not contain any epsilon transition
      if (!containEps) {
        // update the initial state as the state obtained from the first iteration
        result.forEach(res => {
          newStates.push(findState(res))
        })
        // find if those states has epsilon transition
        newStates.forEach(st => {
          st.forEach(set => {
            if (set.transitAlphabet === '$' && set.transitResult.length > 0) {
              set.transitResult.forEach(res => {
                containEps = true;
                if (!result.includes(res)) {
                  result.push(res)
                }
              })
            }
          })
        })
        // this block runs if it contains the transition
        if (containEps) {
          newStates = []
          result.forEach(res => {
            newStates.push(findState(res))
          })
          validateNFA(tmpString, result)
        }
      }

      // slice 1 char at head of string since we've already computed that character
      tmpString = tmpString.slice(1);

      // runs if the first iteration has an epsilon transition
      if (containEps) {
        newStates = []
        // push the resulting states as new start state
        result.forEach(res => {
          newStates.push(findState(res));
        })
        // validateNFA(tmpString, newStates)
        validateNFA(tmpString, result)
      }

      // will run if the resulting state after the iteration has no epsilon transition
      newStates = []

      // push resulting state as starting state
      result.forEach(res => {
        newStates.push(findState(res))
      })
      validateNFA(tmpString, result)
    }
  }

  const validateDFA = () => {
    setError({...error, stringError: ''})
    if (fa.faFinalStates.length <= 0) {
      setError({...error, stringError: 'Missing Final States'});
      return;
    }

    if (!checkString()) { // verify if string is valid and is of alphabet set
      setError({...error, stringError: 'Some input alphabets are not included in your alphabet set'})
      setIsAccepted(false);
    } else {
      let i = 0;
      let newState = getStartState(); // set the initial state as the start state
      let result;

      // loops until there's no characters left
      while (i <= inputString.length - 1) {
        // check if input is in the start state
        if (newState.some(set => set.transitAlphabet === inputString[i])) {
          // store the resulting state after the transition
          result = newState.find(set => set.transitAlphabet === inputString[i])
          // update start state values
          newState.forEach(set => set.startState = false)
        }
        // set the new start state value as the result state
        newState = findState(result.transitResult[0])
        i++;
      }
      // reset state back to original start state when finished computing
      newState = findState(fa.faStartState);
      setIsAccepted(fa.faFinalStates.includes(result.transitResult[0]))
    }
  }

  const submitForm = () => {
    const {faStates, faAlphabets, faStartState, faFinalStates, transitionSets} = fa;
    console.log("Start state: ")
    console.log(faStartState)
    console.log("States set: ")
    console.log(faStates)
    console.log("Alphabets set: ")
    console.log(faAlphabets)
    console.log("Transitions set: ")
    console.log(transitionSets)
    console.log("Final states: ")
    console.log(faFinalStates)
  }

  return (<MainContext.Provider value={{
    validateNFA,
    handleTransition,
    isAccepted,
    setIsAccepted,
    inputString,
    setInputString,
    handleString,
    validateDFA,
    epsilonCheck,
    setEpsilonCheck,
    nfa,
    setNfa,
    setRows,
    setCols,
    adjustEpsilon,
    error,
    setError,
    handleFinalState,
    fa,
    setFa,
    handleStartState,
    generateAlphabets,
    generateStates,
    submitForm,
  }}>
    {children}
  </MainContext.Provider>)
}
