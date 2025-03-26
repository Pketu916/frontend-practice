import Modal from "../shared/components/modal";
import Input from "../shared/components/inputField";
import Button from "../shared/components/button";
import { useRef, useState } from "react";

const Welcome = ({ initialSetUser }) => {
  const userName = useRef();
  const startingBalance = useRef();
  const [errorMessage, setErrorMessage] = useState();

  const onSave = (e) => {
    e.preventDefault();
    if (userName.current.value.trim() === "") {
      setErrorMessage("Enter Valid Name");
      return;
    }

    initialSetUser(
      userName.current.value,
      startingBalance.current.value,
      "deposit"
    );
    setErrorMessage("");
  };

  return (
    <Modal heading="Welcome">
      <form onSubmit={onSave}>
        <Input ref={userName} label="Name" required errorMsg={errorMessage} />
        <Input type="number" ref={startingBalance} label="Balance" required />
        <Button>SAVE</Button>
      </form>
    </Modal>
  );
};

export default Welcome;
