import React, { useState } from "react";
import Button from "../shared/components/button";
import Modal from "../shared/components/modal";

const StatementTable = ({ transactions }) => {
  const [transaction, setTransaction] = useState();
  const tableHeading = [
    "Sr. No",
    "Type",
    "Amount",
    "Charge",
    "Interest",
    "Balance",
    "Action",
  ];

  const onView = (index) => {
    setTransaction(transactions[index]);
  };

  const trGreen = "bg-green-400 text-center border";
  const trRed = "bg-red-400 text-center border";

  return (
    <>
      <div className="max-w-6xl mx-auto my-6 font-mono">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              {tableHeading.map((th, index) => (
                <th key={index} className="border px-4 py-2">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr
                key={index}
                className={
                  transaction.type === "deposit" ||
                  transaction.type === "FD"
                    ? trGreen
                    : trRed
                }
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{transaction.type}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.charges}</td>
                <td className="border px-4 py-2">{transaction.interest}</td>
                <td className="border px-4 py-2">{transaction.balance}</td>
                <td className="border px-4 py-2">
                  <Button onClick={() => onView(index)}>View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transaction && (
        <Modal heading="Transaction" onCancel={() => setTransaction()}>
          <div className="text-white">
            <p className="m-2 font-mono text-lg">Type: {transaction.type}</p>
            <p className="m-2 font-mono text-lg">Amount: {transaction.amount}</p>
            <p className="m-2 font-mono text-lg">Charge: {transaction.charges}</p>
            <p className="m-2 font-mono text-lg">Interest: {transaction.interest}</p>
          </div>
          <Button onClick={() => setTransaction()}>Cancel</Button>
        </Modal>
      )}
    </>
  );
};

export default StatementTable;
