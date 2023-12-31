import { useMutation } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import ManageHotelForms from "../forms/ManageHotelForms/ManageHotelForms";
import * as apiClient from "../api-client";

const AddHotel = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving Hotel", type: "ERROR" });
    },
  });

  const handleSave = (formData: FormData) => {
    mutate(formData);
  };

  return <ManageHotelForms onSave={handleSave} isLoading={isLoading} />;
};

export default AddHotel;
