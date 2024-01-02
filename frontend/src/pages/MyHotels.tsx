import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const MyHotels = () => {
  const { showToast } = useAppContext();
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.getMyHotels, {
    onError: () =>
      showToast({ message: "Error fetching Hotels", type: "ERROR" }),
  });

  if (!hotelData) {
    return <span className="my-3 text-xl">No Hotels found</span>;
  }

  return (
    <section className="space-y-5">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
          to="/add-hotel"
        >
          Add Hotel
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {hotelData.map((hotel) => (
          <div
            key={hotel._id}
            className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5 hover:bg-slate-50"
          >
            <img
              src={hotel.imageUrls[0]}
              alt={hotel.name}
              className="aspect-video object-cover rounded-lg"
            />
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <p className="whitespace-pre-line">{hotel.description}</p>
            <div className="flex flex-wrap gap-2">
              <div className="border border-slate-300 gap-1 rounded-md bg-slate-100 p-3 flex items-center justify-center px-4">
                <BsMap />
                {hotel.city}, {hotel.country}
              </div>

              <div className="border border-slate-300 gap-1 rounded-md bg-slate-100 p-3 flex items-center justify-center px-4">
                <BiMoney />${hotel.pricePerNight} per night
              </div>

              <div className="border border-slate-300 gap-1 rounded-md bg-slate-100 p-3 flex items-center justify-center px-4">
                <BiHotel />
                {hotel.adultCount} adults,
                {hotel.childCount} children
              </div>
              <div className="border border-slate-300 gap-1 rounded-md bg-slate-100 p-3 flex items-center justify-center px-4">
                <BiStar className="text-yellow-600" />
                {hotel.starRating} Star Rating
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold">Hotel Type :</h3>
              {hotel?.type?.map((type, ind) => {
                return (
                  <span
                    className="bg-slate-200 px-3 py-2 rounded-md inline-block"
                    key={ind}
                  >
                    {type}
                  </span>
                );
              })}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold">Facilities :</h3>
              {hotel?.facilities?.map((facility, ind) => {
                return (
                  <span
                    className="bg-slate-200 px-3 py-2 rounded-md inline-block"
                    key={ind}
                  >
                    {facility}
                  </span>
                );
              })}
            </div>

            <span className="ml-auto">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500"
              >
                View Details
              </Link>
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyHotels;
