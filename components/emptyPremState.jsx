import Link from "next/link";

export default function EmptyPremiumCTA() {
    return (
        <div
            className="w-full flex flex-col items-center justify-center py-4 px-6 
                       bg-gradient-to-br from-gray-50 to-white rounded-3xl  
                       text-center"
            data-aos="fade-up"
        >
            {/* Icon Circle */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B93239]/15 to-[#A02A31]/10 
                            flex items-center justify-center mb-6">
                <svg
                    className="w-10 h-10 text-[#B93239]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 17l4.5 2.4-1.1-5.2 4-3.5-5.3-.5L12 5l-2.1 5.2-5.3.5 4 3.5-1.1 5.2L12 17z"
                    />
                </svg>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Become a Premium Vendor
            </h3>

            {/* Subtitle */}
            <p className="text-gray-600 max-w-md text-lg leading-relaxed mb-6">
                Stand out from thousands of vendors, get featured here, and boost your
                visibility to potential customers.
            </p>

            {/* Highlight Tagline */}
            <div
                className="text-[#B93239] font-semibold text-lg md:text-xl 
                           bg-[#B93239]/10 px-6 py-2 rounded-full mb-8"
            >
                Showcase your business and get more leads 🚀
            </div>

            {/* CTA Button */}
            <Link
                href="/premium-partner"
                className="mt-4 h-12 px-8 bg-gradient-to-r from-[#B93239] to-[#A02A31]
                               text-white rounded-xl font-semibold shadow-lg hover:shadow-xl
                               hover:from-[#A02A31] hover:to-[#8B1E25] transition-all inline-flex items-center justify-center"
            >
                Upgrade to Premium
            </Link>
        </div>
    );
}
