const YearFilter = ({ selectedYear, years, onChange }) => (
    <div className="mt-4 flex justify-center items-center">
      <label className="text-black font-semibold mr-2">Filter by Year:</label>
      <select className="text-black p-1 rounded" value={selectedYear} onChange={onChange}>
        {years.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
  
  export default YearFilter;