import { useMutation, useQueryClient } from "react-query";

import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();

  const mutation = useMutation(apiClient.logoutUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({ message: "Signed Out!", type: "SUCCESS" });
    },
    onError(errors: Error) {
      showToast({ message: errors.message, type: "ERROR" });
    },
  });

  const handleLogout = () => {
    mutation.mutate();
  };
  return (
    <button
      onClick={handleLogout}
      className="bg-white rounded-sm text-blue-600 flex items-center justify-center px-3 font-bold hover:bg-gray-100 "
    >
      Sign out
    </button>
  );
};

export default SignOutButton;
