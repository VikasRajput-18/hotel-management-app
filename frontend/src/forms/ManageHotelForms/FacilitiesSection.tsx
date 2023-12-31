import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";
import { hotelFacilities } from "../../config/hotel-options-config";

const FacilitiesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Facilities</h2>
      <div className="flex flex-wrap gap-x-7 gap-y-3">
        {hotelFacilities.map((facility) => {
          return (
            <label
              key={facility}
              className="flex text-sm text-gray-700 w-44 gap-1 items-center"
            >
              <input
                type="checkbox"
                value={facility}
                {...register("facilities", {
                  validate: (facilities) => {
                    if (facilities && facilities.length > 0) {
                      return true;
                    } else {
                      return "At least one facility is requried";
                    }
                  },
                })}
              />
              <span>{facility}</span>
            </label>
          );
        })}
      </div>
      {errors.facilities && (
        <span className="text-red-500">{errors.facilities.message}</span>
      )}
    </div>
  );
};

export default FacilitiesSection;
