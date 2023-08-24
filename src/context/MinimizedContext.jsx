import React, { createContext, useEffect, useState } from "react";

export const MinimizedContext = createContext();
export const MinimizedProvider = ({ children }) => {
  //states
  const [states, setStates] = useState([]);
  //alphabets
  const [alphabets, setAlphabets] = useState([]);

  const [transitionTable, setTransitionTable] = useState(
    Array.from({ length: 1 }, () => Array.from({ length: 1 }, () => "q0"))
  );

  //dfa components
  const [dfa, setDfa] = useState({
    states: states,
    alphabets: alphabets,
    startState: [],
    finalStates: [],
    amountState: states.length,
    amountAlphabet: alphabets.length,
    transitions: transitionTable,
  });

  const [error, setError] = useState({});
  let newStates = [];
  let transitions = [];

  const [showModal, setShowModal] = useState(false);

  //minimized Result
  const [minimizedResult, setMinimizeResult] = useState();

  const initializeTransitionTable = (row, column, value = "q0") => {
    setTransitionTable(
      Array.from({ length: row }, () =>
        Array.from({ length: column }, () => value)
      )
    );
    setDfa({
      ...dfa,
      transitions: Array.from({ length: row }, () =>
        Array.from({ length: column }, () => value)
      ),
    });
  };

  const handleTransistionTable = (row, column, value) => {
    //temporary copy from transitionTable
    let copy = [...transitionTable];
    //change value
    copy[row][column] = value;
    //update transitionTable value
    setTransitionTable(copy);
    setDfa({ ...dfa, transitions: copy });
  };

  const generateStates = (amountState = 1) => {
    //clear all states from the array
    while (states.length > 0) {
      states.pop();
      setDfa({ ...dfa, states: states, amountState: states.length });
    }

    //insert all states to array
    for (let i = 0; i < amountState; i++) {
      setStates(states, states.push(`q${i}`));
      setDfa({ ...dfa, states: states, amountState: states.length });
    }
  };

  const generateAlphabets = (amountAlphabet = 1) => {
    //clear all alphabets from the array
    while (alphabets.length > 0) {
      alphabets.pop();
      setDfa({
        ...dfa,
        alphabets: alphabets,
        amountAlphabet: alphabets.length,
      });
    }
    //insert all alphabets to array
    for (let i = 0; i < amountAlphabet; i++) {
      setAlphabets(alphabets, alphabets.push(`${i}`));
      setDfa({
        ...dfa,
        alphabets: alphabets,
        amountAlphabet: alphabets.length,
      });
    }
  };

  const handleStartState = (event) => {
    dfa.startState.pop();
    const { value } = event.target;
    if (!dfa.startState.includes(value)) {
      dfa.startState.push(value);
    }

    setDfa({ ...dfa });
  };

  //copy all transition as objects
  const handleTransitions = () => {
    while (transitions.length > 0) {
      transitions.pop();
    }
    for (let i = 0; i < states.length; i++) {
      const transition = {
        state: states[i],
        transition: transitionTable[i],
      };
      transitions.push(transition);
    }
  };

  //find the state that cannot access from start state
  const findInaccessibleState = () => {
    while (newStates.length > 0) {
      newStates.pop();
    }
    let inaccessibleState = [];
    let i = 0;
    let j, k;
    while (i < states.length) {
      //row
      if (!dfa.startState.includes(states[i])) {
        for (j = 0; j < transitions.length; j++) {
          //column
          if (states[i] !== transitions[j].state) {
            for (k = 0; k < alphabets.length; k++) {
              if (states[i] == transitions[j].transition[k]) {
                j = states.length;
                break;
              }
            }
          }
        }
        if (j === states.length && k === alphabets.length) {
          // console.log(states[i]);
          inaccessibleState.push(states[i]);
        }
      }
      i++;
    }
    let tempTransition = [];
    transitions.map((element) => {
      if (!inaccessibleState.includes(element.state)) {
        tempTransition.push(element);
      }
    });
    transitions = tempTransition;
    let tempState = [];
    states.map((state) => {
      if (!inaccessibleState.includes(state)) {
        tempState.push(state);
      }
    });
    setStates(tempState);
    newStates = tempState;
  };

  //state pairs that are marked (if one is final state and another is not then it is marked)
  const markedPairs = [];
  const unmarkedPairs = [];

  //all state pairs
  const DfaPairs = [];

  const minimizedTransistionTable = [];

  // generate all possible states pair without repitition
  const generateDfaPairs = () => {
    while (DfaPairs.length > 0) {
      DfaPairs.pop();
    }
    for (let i = 0; i < newStates.length; i++) {
      for (let j = 1; j < newStates.length; j++) {
        if (newStates[i] !== newStates[j] && i !== j) {
          if (!checkIfExist(DfaPairs, newStates[i], newStates[j])) {
            DfaPairs.push([newStates[i], newStates[j]]);
          }
        }
      }
    }
  };

  function checkIfHaveFinalState(value1, value2) {
    if (dfa.finalStates.includes(value1) ^ dfa.finalStates.includes(value2)) {
      return true;
    } else {
      return false;
    }
  }

  function findTransistion(state, alphabet) {
    return transitions.find((x) => x.state === state).transition[`${alphabet}`];
  }

  function clearUnmarkedPair() {
    while (unmarkedPairs.length > 0) {
      unmarkedPairs.pop();
    }
  }

  function findMarkedPairs() {
    let isMarked = false;
    unmarkedPairs.map((pair) => {
      for (let i = 0; i < alphabets.length; i++) {
        if (
          checkIfExist(
            markedPairs,
            findTransistion(pair[0], i),
            findTransistion(pair[1], i)
          )
        ) {
          markedPairs.push([pair[0], pair[1]]);
          isMarked = true;
          break;
        }
      }
    });
    //Clear Unmarked Pair
    clearUnmarkedPair();
    //Copy from Dfa pair to unmark pair array only the pair that doesnt exist in mark pair
    DfaPairs.map((pair) => {
      if (!checkIfExist(markedPairs, pair[0], pair[1])) {
        unmarkedPairs.push([pair[0], pair[1]]);
      }
    });
    if (isMarked) {
      findMarkedPairs(unmarkedPairs);
    }
  }

  function clearMarkedPair() {
    while (markedPairs.length > 0) {
      markedPairs.pop();
    }
  }

  //Check if the pair exist in a certain array
  function checkIfExist(DFAPairs, value1, value2) {
    let k = 0;
    while (k < DFAPairs.length) {
      if (
        DFAPairs[k][0] + DFAPairs[k][1] === value1 + value2 ||
        DFAPairs[k][0] + DFAPairs[k][1] === value2 + value1
      ) {
        break;
      } else {
        k++;
      }
    }
    if (k === DFAPairs.length) {
      return false;
    } else {
      return true;
    }
  }

  function generateMinimizedResult() {
    while (minimizedTransistionTable.length > 0) {
      minimizedTransistionTable.pop();
    }
    let i = 0;
    let equivalenceStates = [];
    while (i < newStates.length) {
      let j = 0;
      if (!equivalenceStates.includes(newStates[i])) {
        for (j = 0; j < unmarkedPairs.length; j++) {
          if (
            newStates[i] === unmarkedPairs[j][0] ||
            newStates[i] === unmarkedPairs[j][1]
          ) {
            break;
          }
        }
        if (j === unmarkedPairs.length) {
          let transition = [];
          for (let k = 0; k < alphabets.length; k++) {
            transition.push(findTransistion(newStates[i], k));
          }
          let temp = {
            state: newStates[i],
            transitionTable: transition,
          };
          minimizedTransistionTable.push(temp);
        } else {
          for (let index = 0; index < 2; index++) {
            if (!equivalenceStates.includes(unmarkedPairs[j][index])) {
              equivalenceStates.push(unmarkedPairs[j][index]);
            }
          }
        }
      }
      i++;
    }
    let result = [];
    let index = 0;
    while (index < equivalenceStates.length) {
      let isCheck = false;
      for (let i = 0; i < result.length; i++) {
        if (result[i].includes(equivalenceStates[index])) {
          isCheck = true;
          break;
        }
      }
      if (!isCheck) {
        let tmp = [];
        for (let i = 0; i < unmarkedPairs.length; i++) {
          if (unmarkedPairs[i].includes(equivalenceStates[index])) {
            for (let j = 0; j < 2; j++) {
              if (!tmp.includes(unmarkedPairs[i][j])) {
                tmp.push(unmarkedPairs[i][j]);
              }
            }
          }
        }
        result.push(tmp);
      }
      index++;
    }
    //insert all to the new table
    for (let i = 0; i < result.length; i++) {
      let transition = [];
      for (let k = 0; k < alphabets.length; k++) {
        transition.push(findTransistion(result[i][0], k));
      }
      let temp = {
        state: result[i],
        transitionTable: transition,
      };
      minimizedTransistionTable.push(temp);
    }
    setMinimizeResult(minimizedTransistionTable);
  }

  const minimizedDfa = () => {
    //find inaccessible state and remove from the transition table
    findInaccessibleState();

    //Generate all possible pair of states
    generateDfaPairs();

    //Make sure that the array are clean
    clearMarkedPair();
    clearUnmarkedPair();

    //Step 1
    //Mark those that one is final and another is another
    DfaPairs.map((pair) => {
      if (checkIfHaveFinalState(pair[0], pair[1])) {
        markedPairs.push([pair[0], pair[1]]);
      } else {
        unmarkedPairs.push([pair[0], pair[1]]);
      }
    });

    //Step 2
    //Keep find marked pair until no new pairs is created
    findMarkedPairs();

    //Step 3
    //Group the unmarked pair and makred pair states
    generateMinimizedResult();
  };

  const handleSubmit = () => {
    handleTransitions();
    minimizedDfa();
    console.log("DFA");
    console.log(dfa);
    console.log("Before Minimized");
    console.log(transitions);
    console.log("After minimized: ");
    console.log(minimizedTransistionTable);
  };

  const handleFinalState = (event) => {
    const { value, checked } = event.target;
    if (!checked) {
      // remove one start state
      const index = dfa.finalStates.indexOf(value);
      dfa.finalStates.splice(index, 1);
    } else {
      if (!dfa.finalStates.includes(value)) {
        dfa.finalStates.push(value);
      }
    }
    setDfa({ ...dfa });
  };

  return (
    <MinimizedContext.Provider
      value={{
        newStates,
        states,
        setStates,
        alphabets,
        setAlphabets,
        generateStates,
        generateAlphabets,
        setDfa,
        dfa,
        handleStartState,
        handleFinalState,
        transitionTable,
        setTransitionTable,
        handleTransistionTable,
        initializeTransitionTable,
        transitions,
        handleSubmit,
        handleTransitions,
        findInaccessibleState,
        minimizedTransistionTable,
        showModal,
        setShowModal,
        error,
        setError,
        minimizedResult,
        setMinimizeResult,
      }}
    >
      {children}
    </MinimizedContext.Provider>
  );
};
