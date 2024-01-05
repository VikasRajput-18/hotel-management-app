export type PaginationProps = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChange }: PaginationProps) => {
  const pageNumbers = Array.from({ length: pages }).map((_, i) => i + 1);

  return (
    <div className="flex justify-center">
      <ul className="flex border border-slate-300 rounded-md overflow-hidden">
        {pageNumbers.map((num) => (
          <li
            className={`${
              num === page ? "bg-blue-600 text-white" : ""
            } px-2 py-1 cursor-pointer`}
            key={num}
          >
            <button onClick={() => onPageChange(num)}>{num}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
