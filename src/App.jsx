import { useState,useEffect } from 'react'
import Button from './Components/Button'
import DateInput from './Components/DateInput'
import NameInput from './Components/NameInput'
import YearFilter from './Components/YearFilter'
import PeriodsTable from './Components/PeriodsTable'
import ContextMenu from './Components/ContexMenu'

function App() {
  const [name, setName] = useState("");
  const [savedName, setSavedName] = useState("");
  const [currDate, setCurrdate] = useState("");
  const [prevDate, setPrevdate] = useState("");
  const [periodHistory, setPeriodHistory] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedYear, setSelectedYear] = useState("All");
  const [contextMenu, setContextMenu] = useState(null);

  useEffect(() => {
    const storedName = localStorage.getItem("savedName");
    const storedData = localStorage.getItem("periodHistory");

    if (storedName) setSavedName(storedName);
    if (storedData) setPeriodHistory(JSON.parse(storedData));
  }, []);

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${d.getDate().toString().padStart(2, "0")}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d.getFullYear()}`;
  };

  const handleName = (e) => setName(e.target.value);
  const handleCPDate = (e) => setCurrdate(e.target.value);
  const handlePPDate = (e) => setPrevdate(e.target.value);
  const handleYearFilterChange = (e) => setSelectedYear(e.target.value);

  const calculateAdditionalData = (curr, prev) => {
    const currDateObj = new Date(curr);
    const prevDateObj = new Date(prev);

    if (isNaN(currDateObj) || isNaN(prevDateObj)) return { cycleDays: "-", formattedOvulationDate: "-", dbop: "-" };

    let cycleDays = Math.round((currDateObj - prevDateObj) / (1000 * 60 * 60 * 24));
    cycleDays = cycleDays > 0 ? cycleDays : "-";

    const ovulationDate = new Date(currDateObj);
    ovulationDate.setDate(ovulationDate.getDate() - 14);
    const formattedOvulationDate = formatDate(ovulationDate);

    let dbop = Math.round((ovulationDate - prevDateObj) / (1000 * 60 * 60 * 24));
    dbop = dbop > 0 ? dbop : "-";

    return { cycleDays, formattedOvulationDate, dbop };
  };

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (!currDate || !prevDate || !name) {
      setErrorMessage("Please enter a name and both dates!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const currDateObj = new Date(currDate);
    const prevDateObj = new Date(prevDate);

    if (currDateObj <= prevDateObj) {
      setErrorMessage("❌ Enter correct date: Current Period Date must be after Previous Period Date!");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const newData = {
      name: savedName || name,
      year: currDateObj.getFullYear(),
      month: currDateObj.toLocaleString("default", { month: "short" }).toUpperCase(),
      currDate: formatDate(currDate),
      prevDate: formatDate(prevDate),
      ...calculateAdditionalData(currDate, prevDate),
    };

    let updatedHistory;
    if (editingIndex !== null) {
      updatedHistory = [...periodHistory];
      updatedHistory[editingIndex] = newData;
      setEditingIndex(null);
    } else {
      updatedHistory = [...periodHistory, newData];
    }

    setPeriodHistory(updatedHistory);
    localStorage.setItem("periodHistory", JSON.stringify(updatedHistory));

    localStorage.setItem("savedName", name);
    setSavedName(name);


    setName("");
    setCurrdate("");
    setPrevdate("");
  };

  const handleRightClick = (e, index) => {
    e.preventDefault();
    setContextMenu({ x: e.pageX, y: e.pageY, rowIndex: index });
  };

  const handleEdit = () => {
    const dataToEdit = periodHistory[contextMenu.rowIndex];
    setCurrdate(dataToEdit.currDate.split("-").reverse().join("-")); // Convert to YYYY-MM-DD
    setPrevdate(dataToEdit.prevDate.split("-").reverse().join("-"));
    setEditingIndex(contextMenu.rowIndex);
    setContextMenu(null);
  };

  const getUniqueYears = () => {
    const years = periodHistory.map((entry) => entry.year);
    return ["All", ...new Set(years)].sort((a, b) => (a === "All" ? -1 : a - b));
  };

  const filteredHistory = selectedYear === "All"
    ? periodHistory
    : periodHistory.filter((entry) => entry.year === Number(selectedYear));


  return (
   
      <div className="p-4 bg-green-200 text-white min-h-screen" onClick={() => setContextMenu(null)}>
        <h1 className="text-4xl font-bold text-center">React Periods Analyzer</h1>
        {errorMessage && <p className="text-center text-red-500 font-semibold bg-red-200 p-2 rounded">{errorMessage}</p>}

        <form className="flex flex-col gap-6 mt-6 items-center">
          <NameInput name={name} onChange={handleName} />
          <DateInput label="Current Period Date" value={currDate} onChange={handleCPDate}/>
          <DateInput label="Previous Period Date" value={prevDate} onChange={handlePPDate}/>
          <Button text="Add Details" onClick={handleAddOrUpdate} color = "bg-yellow-400" hoverColor = "bg-yellow-500"  />
        </form>

        <h2 className="text-center text-2xl font-semibold text-rose-500 underline mt-10">Periods History Log</h2>
        <YearFilter selectedYear={selectedYear} years={getUniqueYears()} onChange={handleYearFilterChange} />

        <h4 className="text-lg font-semibold  text-black">Name: <span className='text-pink-400'>{savedName}</span></h4>
        <PeriodsTable history={filteredHistory} onRightClick={handleRightClick}  />
        <ContextMenu contextMenu={contextMenu} handleEdit={handleEdit} />

        <p className="text-xs font-bold text-blue-800 mt-4">*Note:</p>
        <p className="text-sm font-bold text-pink-600">PC= CPD - PPD</p>
        <p className="text-sm font-bold text-pink-600">OD= CPD - 14Days</p>
        <p className="text-sm font-bold text-pink-600">DBOP= OD - PPD</p>
        <p className="text-xs font-bold text-white text-center mt-10">Copy Right @ sharath</p>
      </div>

  )
}

export default App
