import { useState } from "react";
import Modal from "../shared/components/modal";
import Input from "../shared/components/inputField";
import Button from "../shared/components/button";
import { calculateDepositCharge, calculateWithdrawalCharge } from "../banking";

const DepositWithdrawal = ({ actionName, onCancel, onSave, errorMsg }) => {
  const [transaction, setTransaction] = useState({ amount: "", charges: 0 });

  const onInput = (e) => {
    let charges = 0;
    if (actionName === "deposit") {
      charges = calculateDepositCharge(+e.target.value);
    } else if (actionName === "withdrawal") {
      charges = calculateWithdrawalCharge(+e.target.value);
    }
    setTransaction({ amount: +e.target.value, charges: charges });
  };

  const submitTransaction = (e) => {
    e.preventDefault();
    onSave(transaction.amount, transaction.charges, actionName);
  };

  return (
    <Modal heading={actionName}>
      <form onSubmit={submitTransaction}>
        <Input
          value={transaction.amount}
          onChange={onInput}
          type="number"
          label="Amount"
          errorMsg={errorMsg}
          required
        />
        <Input value={transaction.charges} label="Charges" disabled />

        <Button onClick={onCancel}>Cancel</Button>
        <Button>{actionName}</Button>
      </form>
    </Modal>
  );
};

export default DepositWithdrawal;
