import { MdChevronRight, MdOutlineSearch } from "react-icons/md";

export default function Header({ search, setSearch }) {
  const handleInputChange = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };

  return (
    <div className="flex flex-row w-full justify-between items-center p-2 shrink-0 px-8 bg-[white]">
      <span className="w-max flex flex-row justify-start text-left items-center gap-2 select-none">
        <p className="text-xs text-[#bfc7d1]">HOME</p>
        <MdChevronRight className="text-[16px] text-[#bfc7d1]" />
        <p className="text-xs text-[#486985]">Dashboard</p>
      </span>

      <div className="flex flex-row items-center gap-4 w-[300px] h-max relative">
        <input
          type="text"
          value={search}
          placeholder="Search ..."
          className="w-full p-2 pl-10 border rounded text-xs"
          onChange={handleInputChange}
        />
        <div className="absolute left-3 flex items-center pointer-events-none">
          <MdOutlineSearch />
        </div>
      </div>
    </div>
  );
}