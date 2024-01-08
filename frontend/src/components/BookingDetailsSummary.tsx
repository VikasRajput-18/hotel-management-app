import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location :
        <p className="font-bold">{` ${hotel.name}, ${hotel.city}, ${hotel.country}`}</p>
      </div>

      <div className="flex justify-between flex-wrap">
        <div>
          Check-in
          <p className="font-bold">{checkIn.toDateString()}</p>
        </div>
        <div>
          Check-out
          <p className="font-bold">{checkOut.toDateString()}</p>
        </div>
      </div>

      <div className="border-t border-b py-2">
        Total length of stay :
        <p className="font-bold">{numberOfNights} nights</p>
      </div>
      <div>
        Guests
        <p className="font-bold">
          {adultCount} adults & {childCount} children
        </p>
      </div>
    </div>
  );
};

export default BookingDetailsSummary;
