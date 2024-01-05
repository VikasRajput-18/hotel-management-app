import { hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedHotelType: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HotelTypeFilter = ({ selectedHotelType, onChange }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Property Rating</h4>
      {hotelTypes.map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedHotelType.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelTypeFilter;
