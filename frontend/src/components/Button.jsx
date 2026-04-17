export default function Button({ children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="w-full bg-black text-white py-3 rounded-xl 
            hover:bg-gray-800 transition-all hover:scale-[1.02] font-semibold tracking-wide duration-200 shadow-md active:scale-[0.98]"
        >
            {children}
        </button>
    )
}