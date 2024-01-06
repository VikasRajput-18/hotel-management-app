import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { HotelRating } from "../components/SearchResultCard";
import GuestInfo from "../components/GuestInfo";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const { data: hotelData } = useQuery(
    ["fetchHotelDetails", hotelId],
    () => apiClient.getHotelDetails(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotelData) {
    return <></>;
  }

  return (
    <div className="space-y-6">
      <div className="">
        <span className="flex">
          <HotelRating starRating={hotelData?.starRating} />
        </span>
        <h1 className="text-3xl font-bold">{hotelData.name}</h1>
      </div>

      <div className="flex flex-wrap gap-4">
        {hotelData.imageUrls.map((image) => (
          <div className="max-h-[400px] flex-[300px]" key={image}>
            <img
              src={image}
              alt={hotelData.name}
              className="rounded-md w-full object-cover h-full object-center"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
        {hotelData.facilities.map((facility) => (
          <div
            key={facility}
            className="border border-slate-300 rounded-sm p-3"
          >
            {facility}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
        <div className="whitespace-pre-line">{hotelData.description}</div>
        <div className="h-fit">
          <GuestInfo
            pricePerNight={hotelData.pricePerNight}
            hotelId={hotelData._id}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
