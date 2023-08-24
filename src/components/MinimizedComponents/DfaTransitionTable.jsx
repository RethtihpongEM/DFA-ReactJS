import React, { useContext } from "react";
import { MinimizedContext } from "../../context/MinimizedContext";
import { Table } from "flowbite-react";

export const DfaTransitionTable = () => {
  const { states, alphabets, handleTransistionTable } =
    useContext(MinimizedContext);
  return (
    <div
      className={
        "p-4 flex w-full rounded-tl-md rounded-tr-md  flex-col gap-2 bg-gray-200"
      }
    >
      <div className={"flex flex-col gap-1"}>
        <p className={"font-semibold"}>Transition Table</p>
        <ul className={"text-xs text-gray-500"}>
          <li>* The Header is the set of alphabets for transition</li>
          <li>* The select box is the resulting state</li>
        </ul>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>States</Table.HeadCell>
          {alphabets?.map((alphabet, key) => {
            return <Table.HeadCell key={key}>{alphabet}</Table.HeadCell>;
          })}
        </Table.Head>
        <Table.Body className="divide-y">
          {states?.map((state, stateKey) => {
            return (
              <Table.Row
                key={stateKey}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {state}
                </Table.Cell>
                {alphabets?.map((fa, alphabetKey) => {
                  return (
                    <Table.Cell
                      key={alphabetKey}
                      className="whitespace-nowrap font-medium text-gray-900 dark:text-white"
                    >
                      <select
                        name="transition"
                        id="transition"
                        onChange={(e) => {
                          handleTransistionTable(
                            stateKey,
                            alphabetKey,
                            e.target.value
                          );
                        }}
                      >
                        {states?.map((state, key) => {
                          return (
                            <option value={state} key={key}>
                              {state}
                            </option>
                          );
                        })}
                      </select>
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
