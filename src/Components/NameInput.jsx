const NameInput = ({ name, onChange }) => (
    <div className="bg-rose-400 p-2 rounded w-full max-w-md flex items-center justify-between">
      <label className="font-semibold">Name:</label>
      <input type="text" value={name} className="ml-2 text-black p-1 rounded flex-1 sm:flex-none" onChange={onChange} />
    </div>
  );
  
export default NameInput;