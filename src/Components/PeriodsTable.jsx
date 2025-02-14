const PeriodsTable = ({ history, onRightClick }) => (
    <table className="bg-yellow-200 w-full border-collapse mt-2 text-black">
        <thead className='text-xs sm:text-base font-semibold'>
            <tr className="bg-rose-400 text-center">
                <th className="border border-black p-1 xs:p-2">Year</th>
                <th className="border border-black">Month</th>
                <th className="border border-black">Current Periods Date (CPD)</th>
                <th className="border border-black">Previous Periods Date (PPD)</th>
                <th className="border border-black">Periods Cycle (PC)</th>
                <th className="border border-black">Ovulation Date (OD)</th>
                <th className="border border-black">Difference Between OD & PPD (DBOP)</th>
            </tr>
        </thead>

        <tbody>
            {history.length === 0 ? (
                <tr>
                    <td colSpan="7" className="text-center text-gray-500 py-4">No records found.</td>
                </tr>
            ) : (
                history.map((entry, index) => (
                    <tr key={index} onContextMenu={(e) => onRightClick(e, index)} className="text-center text-sm font-semibold">
                        <td className="border border-black p-1 xs:p-2">{entry.year}</td>
                        <td className="border border-black">{entry.month}</td>
                        <td className="border border-black">{entry.currDate}</td>
                        <td className="border border-black">{entry.prevDate}</td>
                        <td className="border border-black">{entry.cycleDays}</td>
                        <td className="border border-black">{entry.formattedOvulationDate}</td>
                        <td className="border border-black">{entry.dbop}</td>
                    </tr>
                ))
            )}
        </tbody>
    </table>)

export default PeriodsTable;