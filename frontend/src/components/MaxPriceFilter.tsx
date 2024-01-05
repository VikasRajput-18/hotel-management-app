type Props = {
  maxPrice: string;
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>;
};

const MaxPriceFilter = ({ maxPrice, setMaxPrice }: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Max Price</h4>
      <select
        className="border border-slate-700 rounded-sm px-2"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      >
        <option value={""}>Select Max Price</option>
        <option value={"1000"}>1000</option>
        <option value={"2000"}>2000</option>
        <option value={"3000"}>3000</option>
        <option value={"4000"}>4000</option>
      </select>
    </div>
  );
};

export default MaxPriceFilter;
