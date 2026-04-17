export default function Input({ placeholder, type, onChange }) {
    return (
        <input placeholder={placeholder} onChange={onChange} type={type}
        className="w-full p-3 border rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-black transition"
        />
    )
}