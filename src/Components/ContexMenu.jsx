const ContextMenu = ({ contextMenu, handleEdit }) => {
        return (contextMenu && (<div className="absolute bg-white shadow-lg rounded p-2 text-black" style={{ top: contextMenu.y, left: contextMenu.x }}>
            <button onClick={handleEdit}>✏️ Edit</button>
        </div>)
    
)  }



export default ContextMenu