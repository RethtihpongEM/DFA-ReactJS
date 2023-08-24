import React, { useContext } from "react";
import { MinimizedContext } from "../../context/MinimizedContext";
import { Table } from "flowbite-react";

export const MinimizedTable = () => {
  const { minimizedResult, alphabets, dfa} =
    useContext(MinimizedContext);
  return (
    <div>
      <Table>
        <Table.Head>
          <Table.HeadCell>States</Table.HeadCell>
          {alphabets?.map((alphabet, key) => {
            return <Table.HeadCell key={key}>{alphabet}</Table.HeadCell>;
          })}
        </Table.Head>
        <Table.Body className="divide-y">
          {minimizedResult?.map((element, stateKey) => {
            return (
              <Table.Row
                key={stateKey}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell
                  className={`whitespace-nowrap font-medium text-gray-900 dark:text-white flex`}
                >
                  <div>
                    {dfa.finalStates.includes(element.state) && "Final State: "}
                    {dfa.startState.includes(element.state) && "Start State: "}
                  </div>
                  <div>[ {element.state} ]</div>
                </Table.Cell>
                {alphabets?.map((alphabet, alphabetKey) => {
                  return (
                    <Table.Cell
                      key={alphabetKey}
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                      {element.transitionTable[alphabet]}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};
