import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useQuery } from "react-query";
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import { HotelType } from "../../../backend/src/shared/types";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import MaxPriceFilter from "../components/MaxPriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelType, setSelectedHotelType] = useState<string[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("");
  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    childCount: String(search.childCount),
    adultCount: String(search.adultCount),
    page: String(page),
    stars: selectedStars,
    types: selectedHotelType,
    facilities: selectedFacility,
    maxPrice,
    sortOption,
  };
  const { data: hotelData } = useQuery(["fetchHotels", searchParams], () =>
    apiClient.getHotels(searchParams)
  );

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let starRating = e.target.value;
    setSelectedStars((prevStars) =>
      e.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };
  const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let type = e.target.value;
    setSelectedHotelType((prevHotelType) =>
      e.target.checked
        ? [...prevHotelType, type]
        : prevHotelType.filter((t) => t !== type)
    );
  };
  const handleFacility = (e: React.ChangeEvent<HTMLInputElement>) => {
    let facility = e.target.value;
    setSelectedFacility((prevFacilities) =>
      e.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((t) => t !== facility)
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg bg-white border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypeFilter
            selectedHotelType={selectedHotelType}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacility={selectedFacility}
            onChange={handleFacility}
          />
          <MaxPriceFilter maxPrice={maxPrice} setMaxPrice={setMaxPrice} />
          {/* Todo Filters  */}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          {/* todo sort options  */}
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="p-2 border border-slate-700 rounded-sm"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDsc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>

        {hotelData?.data?.map((hotel: HotelType) => (
          <SearchResultCard key={hotel._id} hotel={hotel} />
        ))}

        <Pagination
          page={hotelData?.pagination.page || 1}
          pages={hotelData?.pagination?.pages || 1}
          onPageChange={(pageNumber) => setPage(pageNumber)}
        />
      </div>
    </div>
  );
};

export default Search;
