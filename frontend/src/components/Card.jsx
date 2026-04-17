export default function Card({children, onClick}) {
    return (
        // <div onClick={onClick} className="bg-white p-4 rounded-2xl shadow-md cursor-pointer hover:shadow-xl hover:scale-[1.02] transition">
        //     {children}
        // </div>
        <div onClick={onClick} className="bg-white p-4 rounded-2xl shadow-md cursor-pointer
        hover:shadow-[0_20px_40px_rgba(0, 0, 0, 0.15)]
        hover:-translate-y-2 transition-all duration-300">
            {children}
        </div>
    )
}