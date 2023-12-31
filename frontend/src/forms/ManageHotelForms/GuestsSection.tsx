import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";

const GuestsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Guests</h1>
      <div className="px-8 py-4 flex items-center gap-4 rounded-md bg-gray-200">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Adults
          <input
            type="number"
            {...register("adultCount", {
              required: "Adult Count is required",
            })}
            min={1}
            className="border border-gray-300 rounded w-full py-2 px-2 font-normal"
          />
          {errors.adultCount && (
            <span className="text-red-500">{errors.adultCount.message}</span>
          )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Children
          <input
            type="number"
            {...register("childCount", {
              required: "Child Count is required",
            })}
            min={0}
            className="border border-gray-300 rounded w-full py-2 px-2 font-normal"
          />
          {errors.childCount && (
            <span className="text-red-500">{errors.childCount.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default GuestsSection;
