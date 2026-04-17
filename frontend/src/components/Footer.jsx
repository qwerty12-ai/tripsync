export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-200 py-3 text-center">
            <p className="text-s text-gray-600 tracking-wide">
                © {new Date().getFullYear()} <span className="font-semibold text-gray-800">TripSync</span>. All rights reserved.
            </p>
        </footer>
    )
}