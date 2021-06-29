import { makeContext } from "../utils/makeContext";
import { useEffect, useState } from "react";
import { useAuth } from "contexts/Auth";

import { User } from "types/user";

export type UserDataType = {
  id: User["id"];
  email?: User["email"];
  name?: User["name"];
  surname?: User["surname"];
};

type UserContextProps = {
  userForm: UserDataType;
  setUserFormData: (formData: UserDataType) => void;
  resetUserForm: () => void;
};

const { useConsumer, Provider } = makeContext<UserContextProps>(() => {
  const auth = useAuth();

  const [userForm, setUserFormData] = useState<UserDataType>({
    id: "",
    email: "",
    name: "",
    surname: "",
  });

  const resetUserForm = () => {
    setUserFormData({
      id: "",
      email: "",
      name: "",
      surname: "",
    });
  };

  useEffect(() => {
    if (!auth?.user) return;
  }, [auth?.user]);

  return {
    userForm,
    resetUserForm,
    setUserFormData
  };
});

export const UsersProvider = Provider;
export const useUsers = useConsumer;
