import { useState } from "react";
import Header from "../shared/components/header";
import UserForm from "./userForm";
import UsersList from "./usersList";
import users from "../Users";

const UsersManagement = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [userData, setUserData] = useState(users);
  const [initialUserInput, setInitialUserInput] = useState();

  const toggleFormModal = () => {
    setIsOpenFormModal(!isOpenFormModal);
    setInitialUserInput({
      id: "",
      name: "",
      age: "",
      email: "",
      mobile_number: "",
    });
  };

  const userInputSave = (aUser) => {
    if (initialUserInput.id) {
      const updatedUserIndex = userData.findIndex(
        (user) => user.id === initialUserInput.id
      );
      const newUserList = [...userData];
      newUserList[updatedUserIndex] = aUser;
      setUserData(newUserList);
      return;
    } else {
      const latestUserId =
        userData.length > 0 ? userData[userData.length - 1].id + 1 : 1;
      setUserData([...userData, { ...aUser, id: latestUserId }]);
    }
    toggleFormModal();
  };

  const deleteUserData = (aUser) => {
    const deleteUserIndex = userData.findIndex((user) => user.id === aUser.id);
    const newUserList = [...userData];
    newUserList.splice(deleteUserIndex, 1);
    setUserData(newUserList);
  };

  const onEdit = (aUser) => {
    setIsOpenFormModal(!isOpenFormModal);
    setInitialUserInput(aUser);
  };

  const formValidation = (inputValue) => {
    let error = {};
    const filteredUsers = userData.filter(
      (aUser) => aUser.id !== initialUserInput.id
    );

    if (filteredUsers.some((aUser) => aUser.email === inputValue.email)) {
      error.email = "Email must be unique.";
    }

    if (
      filteredUsers.some(
        (aUser) => aUser.mobile_number === inputValue.mobile_number
      )
    ) {
      error.mobile_number = "Mobile Number must be unique.";
    }
    return error;
  };

  const nextPrev = (aId, action) => {
    let findUser = "";
    let findIndex = userData.findIndex((user) => user.id === aId);
    if (action === "next") {
      findIndex++;
    } else {
      findIndex--;
    }
    findUser = userData.find((_, index) => index === findIndex);
    setInitialUserInput(findUser);
  };

  return (
    <>
      <Header
        heading="User Management"
        onClick={toggleFormModal}
        buttonName="+ Add User"
      />
      <UsersList users={userData} deleteUser={deleteUserData} onEdit={onEdit} />

      {isOpenFormModal && (
        <UserForm
          openForm={toggleFormModal}
          userInputSave={userInputSave}
          initialUserInput={initialUserInput}
          formValidation={formValidation}
          nextPrev={nextPrev}
          userData={userData}
        />
      )}
    </>
  );
};
export default UsersManagement;
