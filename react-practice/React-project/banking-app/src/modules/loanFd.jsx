import Modal from "../shared/components/modal";
import Input from "../shared/components/inputField";
import Button from "../shared/components/button";
import { calculateRemainingLoan, calculateFDTotal } from "../banking";
import { useEffect, useState } from "react";
import Select from "../shared/components/selectfIeld.jsx";

const LoanFd = ({ actionName, onCancel, onSave }) => {
  const [transaction, setTransaction] = useState({
    amount: "",
    duration: 1,
    remainBal: 0,
  });

  useEffect(() => {
    let remain = 0;
    if (actionName === "loan") {
      remain = calculateRemainingLoan(transaction.amount, transaction.duration);
    } else if (actionName === "FD") {
      remain = calculateFDTotal(transaction.amount, transaction.duration);
    }
    setTransaction({ ...transaction, remainBal: remain });
  }, [transaction.amount, transaction.duration]);

  const onInput = (e) => {
    setTransaction({ ...transaction, amount: +e.target.value });
  };
  const onselect = (e) => {
    setTransaction({ ...transaction, duration: +e.target.value });
  };

  const submitTransaction = (e) => {
    e.preventDefault();
    onSave(transaction.amount, transaction.remainBal, actionName);
  };

  return (
    <Modal heading={actionName}>
      <form onSubmit={submitTransaction}>
        <Input
          value={transaction.amount}
          onChange={onInput}
          type="number"
          label="Amount"
          required
        />
        <Select
          value={transaction.duration}
          onChange={onselect}
          label="duration"
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </Select>
        <Input value={transaction.remainBal} label="Balance" disabled />

        <Button onClick={onCancel}>Cancel</Button>
        <Button>confirm</Button>
      </form>
    </Modal>
  );
};

export default LoanFd;
