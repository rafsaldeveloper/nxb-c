import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Target, Award } from "lucide-react"
import Link from "next/link"

export default function AboutHero() {
    return (
        <section className="relative bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white py-24 overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rotate-45"></div>
                <div className="absolute top-20 right-20 w-16 h-16 border-2 border-white/15 rotate-12"></div>
                <div className="absolute bottom-20 left-1/4 w-24 h-24 border-2 border-white/10 rotate-45"></div>
                <div className="absolute bottom-10 right-10 w-12 h-12 border-2 border-white/20 rotate-12"></div>
            </div>

            {/* Dotted Pattern */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                }}
            ></div>

            <div className="container mx-auto px-4 text-center relative z-10" data-aos="fade-up">
                <div className="max-w-4xl mx-auto">
                    <h1 className="lg:text-6xl text-[38px] mb-8 text-white font-semibold leading-tight">
                        About Us
                        <span className="block bg-gradient-to-r md:text-[36px] from-white to-gray-200 bg-clip-text text-transparent">
                            Where Trade Meets Opportunity
                        </span>
                    </h1>
                    <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
                        Nexus Built is a UAE-based digital platform designed to bring real value to the construction and fit-out
                        industry. We help project owners, contractors, and service providers connect with verified professionals
                        across 90-plus categories.
                    </p>

                    {/* Key stats */}
                    <div className="flex flex-wrap justify-center items-center gap-8 text-sm opacity-90 mb-12">
                        <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                            <Users className="h-5 w-5" />
                            <span>UAE-Based Platform</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                            <Target className="h-5 w-5" />
                            <span>90+ Categories</span>
                        </div>
                        <div className="flex items-center space-x-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                            <Award className="h-5 w-5" />
                            <span>Verified Professionals</span>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-[#B93239] hover:bg-gray-100 px-10 h-14 text-lg shadow-xl hover:shadow-2xl transition-all group"
                        >
                            <Link href="/signup">
                                Create Your Account
                                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-[#B93239] px-10 h-14 text-lg backdrop-blur-sm bg-transparent"
                        >
                            <Link href="/vendor/register">
                                Become a Verified Vendor
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
