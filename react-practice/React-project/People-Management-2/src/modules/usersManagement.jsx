import { useEffect, useState } from "react";
import Header from "../shared/components/header";
import UserForm from "./userForm";
import UsersList from "./usersList";

const UsersManagement = () => {
  const [isOpenFormModal, setIsOpenFormModal] = useState(false);
  const [userData, setUserData] = useState([]);
  const [initialUserInput, setInitialUserInput] = useState({});
  const [editUserIndex, setEditUserIndex] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/users");

        if (!response.ok) {
          //throw new Error("something went wrong data not found");
          console.log('error here');
        }

        if (response.ok) {
          const usersData = await response.json();
          setUserData(usersData);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);

  const toggleFormModal = () => {
    setIsOpenFormModal(!isOpenFormModal);
    setInitialUserInput({
      name: "",
      age: "",
      email: "",
      mobile_number: "",
    });
  };

  const userInputSave = async (aUser) => {
    if (initialUserInput.id) {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${aUser.id}`,
          {
            method: "PUT",
            body: JSON.stringify(aUser),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const updatedUserIndex = userData.findIndex(
            (user) => user.id === initialUserInput.id
          );
          const newUserList = [...userData];
          newUserList[updatedUserIndex] = aUser;
          setUserData(newUserList);
        }
        if (!response.ok) {
          throw new Error("Failed to save user");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          body: JSON.stringify(aUser),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to save user");
        }

        const newUser = await response.json();
        setUserData([...userData, newUser]);
      } catch (error) {
        console.log(error);
      }
    }
    toggleFormModal();
  };

  const deleteUserData = async (aUser) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${aUser.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const deleteUserIndex = userData.findIndex(
          (user) => user.id === aUser.id
        );
        const newUserList = [...userData];
        newUserList.splice(deleteUserIndex, 1);
        setUserData(newUserList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onEdit = (aUser,index) => {
    setIsOpenFormModal(!isOpenFormModal);
    setInitialUserInput(aUser);
    setEditUserIndex(index)
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
    let findIndex = editUserIndex;
    if (action === "next") {
      findIndex++;
    } else {
      findIndex--;
    }
    setEditUserIndex(findIndex)
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
          userDataLength={userData.length}
          index={editUserIndex}
        />
      )}
    </>
  );
};
export default UsersManagement;
