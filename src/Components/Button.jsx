const Button = ({ text, onClick, color = "bg-yellow-400", hoverColor = "bg-yellow-500" }) => (
    <button className={`${color} text-rose-600 py-2 px-4 rounded-full font-semibold hover:${hoverColor}`} onClick={onClick}>
      {text}
    </button>
  );
  
  export default Button;