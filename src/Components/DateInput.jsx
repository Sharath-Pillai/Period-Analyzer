const DateInput = ({ label, value, onChange }) => (
    <div className="bg-rose-400 p-2 rounded w-full max-w-md flex items-center justify-between">
      <label className="font-semibold">{label}:</label>
      <input type="date" value={value} className="ml-2 text-black p-1 rounded" onChange={onChange} />
    </div>
  );
  
  export default DateInput;