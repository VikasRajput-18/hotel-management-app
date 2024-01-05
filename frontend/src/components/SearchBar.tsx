import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(minDate.getFullYear() + 1);

  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-gradient-to-tr from-orange-500 via-yellow-500 to-red-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input
          placeholder="Where are you going?"
          className="text-md w-full focus:outline-none"
          value={destination}
          name="destination"
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div className="flex items-center bg-white gap-2 px-2 py-1">
        <label className="flex items-center">
          Adults :
          <input
            type="number"
            placeholder="Where are you going?"
            className="w-full focus:outline-none p-1 flex-1 font-bold"
            value={adultCount}
            min={1}
            max={20}
            onChange={(e) => setAdultCount(parseInt(e.target.value))}
          />
        </label>
        <label className="flex items-center">
          Children :
          <input
            type="number"
            placeholder="Where are you going?"
            className="w-full focus:outline-none p-1 flex-1 font-bold"
            value={childCount}
            min={0}
            max={20}
            onChange={(e) => setChildCount(parseInt(e.target.value))}
          />
        </label>
      </div>

      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date: Date) => setCheckIn(date)}
          selectsStart
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
          onChange={(date: Date) => setCheckOut(date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          maxDate={maxDate}
          minDate={minDate}
          placeholderText="Check-in Date"
          className="min-w-full g-whiye p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>

      <div className="flex items-center gap-1">
        <button className="w-2/3 bg-blue-600 text-white rounded-md h-full p-2 font-bold text-xl hover:bg-blue-500">
          Search
        </button>
        <button className="w-1/3 bg-red-600 text-white rounded-md h-full p-2 font-bold text-xl hover:bg-red-500">
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
