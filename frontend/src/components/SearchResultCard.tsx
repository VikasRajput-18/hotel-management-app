import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";
import { AiFillStar } from "react-icons/ai";
import ImageSwiper from "./ImageSwiper";
export const HotelRating = ({ starRating }: { starRating: number }) => {
  let maxSize = 5;

  return (
    <>
      {Array.from({ length: maxSize }).map((_, i) => {
        return (
          <AiFillStar
            key={i}
            className={i < starRating ? "fill-yellow-500" : "fill-gray-600"}
          />
        );
      })}
    </>
  );
};

type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8">
      <div className="w-[300px] h-[300px]">
        <ImageSwiper imageUrls={hotel?.imageUrls} />
      </div>
      <div className="grid grid-rows-[1fr_2fr_1fr]">
        <div>
          <div className="flex items-center">
            <span className="flex">
              <HotelRating starRating={hotel?.starRating} />
            </span>
            <span className="ml-1 text-sm flex items-center flex-wrap gap-1">
              {hotel?.type.slice(0, 3).map((type) => (
                <span
                  className="bg-gray-200 px-2 py-1 rounded-md text-sm"
                  key={type}
                >
                  {type}
                </span>
              ))}
            </span>
          </div>
        </div>
        <div>
          <Link
            to={`/detail/${hotel?._id}`}
            className="text-2xl font-bold cursor-pointer"
          >
            {hotel.name}
          </Link>
          <div className="line-clamp-4">
            <p>{hotel.description}</p>
          </div>
        </div>

        <div className="flex justify-between flex-wrap gap-5 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="bg-slate-300 rounded-lg p-2 text-xs font-bold whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3
                ? `+${hotel.facilities.length - 3} more`
                : ""}
            </span>
          </div>

          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${hotel.pricePerNight} per night</span>
            <Link
              to={`/detail/${hotel?._id}`}
              className="bg-blue-600 h-full text-white p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
            >
              View More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;
