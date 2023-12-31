import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForms";
import { hotelTypes } from "../../config/hotel-options-config";

const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => {
          return (
            <label
              key={type}
              className={`cursor-pointer text-sm rounded-full px-4 py-2 font-semibold
            ${
              typeWatch && typeWatch.includes(type)
                ? "bg-blue-300"
                : "bg-gray-200"
            }
            `}
            >
              <input
                type="checkbox"
                value={type}
                className="opacity-0"
                {...register("type", {
                  validate: (type) => {
                    if (type && type.length > 0) {
                      return true;
                    } else {
                      return "At least one type is requried";
                    }
                  },
                })}
              />
              <span>{type}</span>
            </label>
          );
        })}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
