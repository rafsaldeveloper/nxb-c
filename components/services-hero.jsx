import { Button } from "@/components/ui/button"
import { Grid, Shield, Users } from "lucide-react"
import Link from "next/link"

export default function ServicesHero() {
    return (
        <section className="relative bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white py-24 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white/20 rotate-45 animate-pulse"></div>
                <div className="absolute top-20 right-20 w-24 h-24 border-2 border-white/15 rotate-12 animate-pulse delay-1000"></div>
                <div className="absolute bottom-20 left-1/4 w-28 h-28 border-2 border-white/10 rotate-45 animate-pulse delay-500"></div>
                <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rotate-12 animate-pulse delay-1500"></div>
            </div>

            {/* Floating service icons */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce delay-300">⚡</div>
                <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce delay-700">🔧</div>
                <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce delay-1000">🏗️</div>
                <div className="absolute bottom-1/4 right-1/3 text-5xl animate-bounce delay-500">🎨</div>
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            ></div>

            <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
                <div className="max-w-5xl mx-auto">
                    <h1 className="lg:text-6xl text-[38px] mb-8 text-white font-semibold leading-tight">
                        Find Services by
                        <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                            Trade Category
                        </span>
                    </h1>
                    <p className="text-2xl mb-12 max-w-4xl mx-auto opacity-90 leading-relaxed">
                        <span className="font-semibold">Verified Vendors. Real Work. All in One Place.</span>
                    </p>
                    <p className="text-lg mb-16 max-w-4xl mx-auto opacity-85 leading-relaxed">
                        Looking for trusted professionals in construction or fit-out works? Nexus Built brings together verified
                        vendors across 90-plus service categories — from electrical and HVAC to interiors, civil works, and smart
                        automation.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-3xl mx-auto mb-16">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-[#B93239] hover:bg-gray-100 px-10 h-14 text-lg shadow-xl hover:shadow-2xl transition-all"
                        >
                            <Link href="#featured-categories">Browse Categories</Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-[#B93239] bg-transparent px-10 h-14 text-lg"
                        >
                            <Link href="/signup">Create Customer Account</Link>
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-90">
                        <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                            <Grid className="h-5 w-5" />
                            <span>90+ Service Categories</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                            <Shield className="h-5 w-5" />
                            <span>100% Verified Vendors</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
                            <Users className="h-5 w-5" />
                            <span>Trusted Professionals</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
