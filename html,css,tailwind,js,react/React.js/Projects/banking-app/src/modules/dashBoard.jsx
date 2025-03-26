import React, { useEffect, useState } from "react";
import Header from "../shared/components/header";
import Button from "../shared/components/button";

import Welcome from "./welcome";
import StatementTable from "./statementTable";
import DepositWithdrawal from "./depositWithdrawal";
import LoanFd from "./loanFd";

const DashBoard = () => {
  const [toggleModal, setToggleModal] = useState({
    deposit: false,
    withdrawal: false,
    loan: false,
    FD: false,
  });
  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState();


  const initialSetUser = (name, balance, deposit) => {
    setTransactions([
      {
        name: name,
        type: deposit,
        amount: balance,
        charges: 0,
        interest: 0,
        balance: +balance,
      },
    ]);
    setToggleModal({ ...toggleModal, welcome: false });
  };

  const addTransaction = (actionName, amount, charges, interest, balance) => {
    setTransactions([
      ...transactions,
      {
        type: actionName,
        amount: amount.toFixed(2),
        charges: charges.toFixed(2),
        interest: Math.abs(interest),
        balance: balance.toFixed(2),
      },
    ]);
    setToggleModal({ ...toggleModal, [actionName]: false });
  };

  const onDeposit = (amount, charges, actionName) => {
    const previousBalance = +transactions.at(-1).balance;

    let newBalance = previousBalance + amount - charges;

    addTransaction(actionName, amount, charges, 0, newBalance);
  };

  const onWithdrawal = (amount, charges, actionName) => {
    const previousBalance = +transactions.at(-1).balance;

    let newBalance = previousBalance - amount - charges;

    if (newBalance <= 1000) {
      setErrorMsg("Insufficient Balance. Minimum balance required: 1000");
      return;
    }

    setErrorMsg("");
    addTransaction(actionName, amount, charges, 0, newBalance);
  };

  const onLoan = (amount, remainBal, actionName) => {
    const previousBalance = +transactions.at(-1).balance;
    let newBalance = previousBalance - remainBal;
    const interest = (amount - remainBal).toFixed(2);

    addTransaction(actionName, amount, 0, interest, newBalance);
  };

  const onFD = (amount, remainBal, actionName) => {
    const previousBalance = +transactions.at(-1).balance;
    let newBalance = previousBalance + remainBal;
    const interest = (amount - remainBal).toFixed(2);

    addTransaction(actionName, amount, 0, interest, newBalance);
  };

  return (
    <section>
      <Header
        name={transactions[0] ? transactions[0].name : ""}
        balance={transactions[0] ? transactions.at(-1).balance : 0}
      />
      <section className="flex justify-between max-w-6xl mx-auto my-14">
        <Button
          onClick={() => setToggleModal({ ...toggleModal, deposit: true })}
        >
          Deposit
        </Button>
        <Button
          onClick={() => setToggleModal({ ...toggleModal, withdrawal: true })}
        >
          Withdrawal
        </Button>
        <Button onClick={() => setToggleModal({ ...toggleModal, loan: true })}>
          Loan
        </Button>
        <Button onClick={() => setToggleModal({ ...toggleModal, FD: true })}>
          FD
        </Button>
      </section>

      {transactions.length == 0 && <Welcome initialSetUser={initialSetUser} />}
      <StatementTable transactions={transactions} />
      {toggleModal.deposit && (
        <DepositWithdrawal
          actionName="deposit"
          onSave={onDeposit}
          onCancel={() => setToggleModal({ ...toggleModal, deposit: false })}
        />
      )}

      {toggleModal.withdrawal && (
        <DepositWithdrawal
          actionName="withdrawal"
          onSave={onWithdrawal}
          onCancel={() =>
            setToggleModal(
              { ...toggleModal, withdrawal: false },
              setErrorMsg("")
            )
          }
          errorMsg={errorMsg}
        />
      )}

      {toggleModal.loan && (
        <LoanFd
          actionName="loan"
          onSave={onLoan}
          onCancel={() => setToggleModal({ ...toggleModal, loan: false })}
        />
      )}
      {toggleModal.FD && (
        <LoanFd
          actionName="FD"
          onSave={onFD}
          onCancel={() => setToggleModal({ ...toggleModal, FD: false })}
        />
      )}
    </section>
  );
};

export default DashBoard;
