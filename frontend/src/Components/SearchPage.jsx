export default function Search() {
  return (
    <div className="searchPage w-full h-full flex bg-yellow-500">
      <div>
        <input
          type="search"
          placeholder="search"
          className="border border-gray-300"
        />
        <div>search accounts</div>
      </div>
      <div>search account bio</div>
    </div>
  );
}
