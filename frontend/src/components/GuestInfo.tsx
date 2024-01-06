import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../contexts/SearchContext";
import { useAppContext } from "../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInforFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
};

const GuestInfo = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GuestInforFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const navigate = useNavigate();
  const location = useLocation();

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (values: GuestInforFormData) => {
    search.saveSearchValues(
      "",
      values.checkIn,
      values.checkOut,
      values.adultCount,
      values.childCount
    );
    navigate("/sign-in", { state: { form: location } });
  };
  const onSubmit = (values: GuestInforFormData) => {
    search.saveSearchValues(
      "",
      values.checkIn,
      values.checkOut,
      values.adultCount,
      values.childCount
    );
    navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-gradient-to-br from-blue-400 via-blue-200 to-blue-300 gap-4">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
        }
        className="grid grid-cols-1 gap-4 items-center"
      >
        <div className="flex flex-col gap-2">
          <div>
            <DatePicker
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              required
              startDate={checkIn}
              endDate={checkOut}
              maxDate={maxDate}
              minDate={minDate}
              placeholderText="Check-in Date"
              className="min-w-full g-whiye p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div>
            <DatePicker
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsStart
              required
              startDate={checkIn}
              endDate={checkOut}
              maxDate={maxDate}
              minDate={minDate}
              placeholderText="Check-Out Date"
              className="min-w-full g-whiye p-2 focus:outline-none"
              wrapperClassName="min-w-full"
            />
          </div>
          <div className="flex items-center bg-white gap-2 px-2 py-1">
            <label className="flex items-center">
              Adults :
              <input
                type="number"
                className="w-full focus:outline-none p-1 flex-1 font-bold"
                min={1}
                max={20}
                {...register("adultCount", {
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be atleast one adult",
                  },
                  valueAsNumber: true,
                })}
              />
            </label>
            <label className="flex items-center">
              Children :
              <input
                type="number"
                className="w-full focus:outline-none p-1 flex-1 font-bold"
                {...register("childCount", {
                  valueAsNumber: true,
                })}
                min={0}
                max={20}
              />
            </label>
          </div>
          {errors.adultCount && (
            <span className="text-red-500 font-semibold text-sm">
              {errors.adultCount.message}
            </span>
          )}
        </div>
        {isLoggedIn ? (
          <button className="bg-blue-600 hover:bg-blue-500 text-white h-full p-2 font-bold">
            Book Now
          </button>
        ) : (
          <button className="bg-blue-600 text-center hover:bg-blue-500 text-white h-full p-2 font-bold">
            Sign in to book
          </button>
        )}
      </form>
    </div>
  );
};

export default GuestInfo;
