import React, { useState } from "react";
import Header from "../shared/components/header";
import Button from "../shared/components/button";

import Welcome from "./welcome";
import StatementTable from "./statementTable";
import DepositeWithdrawal from "./depositeWithdrawal";
import LoanFd from "./loanFd";

const DashBoard = () => {
  const [user, setUser] = useState({ name: "", balance: 0 });
  const [toggleModal, setToggleModal] = useState({
    deposite: false,
    withdrawal: false,
  });
  const [transactions, setTransactions] = useState([]);
  const [errorMsg, setErrorMsg] = useState();

  const initialSetUser = (name, balance) => {
    setUser({
      name: name,
      balance: +balance,
    });
    setTransactions([
      {
        type: "Deposite",
        amount: balance,
        charge: 0,
        interest: 0,
        balance: balance,
      },
    ]);
  };

  const onDeposite = (amount, charges) => {
    let balance = user.balance + amount - charges;

    setUser({ name: user.name, balance: balance });
    setTransactions([
      ...transactions,
      {
        type: "Deposite",
        amount: amount,
        charge: charges,
        interest: 0,
        balance: balance,
      },
    ]);
    setToggleModal({ ...toggleModal, deposite: false });
  };

  const onWithdrawal = (amount, charges) => {
    let balance = user.balance - amount - charges;
    if (balance <= 1000) {
      setErrorMsg("Insufficient Balance.");
      // alert(" A minimum balance of 1000 is required in your account")
      return;
    }
    setUser({ name: user.name, balance: balance });
    setErrorMsg("");
    setTransactions([
      ...transactions,
      {
        type: "Withdrawal",
        amount: amount,
        charge: charges,
        interest: 0,
        balance: balance,
      },
    ]);
    setToggleModal({ ...toggleModal, withdrawal: false });
  };

  const onLoan = (amount, remainbal) => {
    let balance = user.balance - amount - remainbal;
    setUser({ name: user.name, balance: balance });

    setTransactions([
      ...transactions,
      {
        type: "Loan",
        amount: amount,
        charge: 0,
        interest: amount - remainbal,
        balance: balance,
      },
    ]);
    setToggleModal({ ...toggleModal, loan: false });

  };

  return (
    <section>
      <Header name={user.name} balance={user.balance} />
      <section className="flex justify-between max-w-4xl mx-auto my-14">
        <Button
          onClick={() => setToggleModal({ ...toggleModal, deposite: true })}
        >
          Deposite
        </Button>
        <Button
          onClick={() => setToggleModal({ ...toggleModal, withdrawal: true })}
        >
          Withdrawal
        </Button>
        <Button 
        onClick={() => setToggleModal({ ...toggleModal, loan: true })}
        >Loan</Button>
        <Button>FD</Button>
      </section>

      {!user.name && <Welcome initialSetUser={initialSetUser} />}
      <StatementTable transactions={transactions} />
      {toggleModal.deposite && (
        <DepositeWithdrawal
          actionName="Deposite"
          onSave={onDeposite}
          onCancel={() => setToggleModal({ ...toggleModal, deposite: false })}
        />
      )}

      {toggleModal.withdrawal && (
        <DepositeWithdrawal
          actionName="Withdrawal"
          onSave={onWithdrawal}
          onCancel={() => setToggleModal({ ...toggleModal, withdrawal: false })}
          errorMsg={errorMsg}
        />
      )}

     {toggleModal.loan&& <LoanFd
        actionName="Loan"
        onSave={onLoan}
        onCancel={() => setToggleModal({ ...toggleModal, withdrawal: false })}
      />}
    </section>
  );
};

export default DashBoard;
