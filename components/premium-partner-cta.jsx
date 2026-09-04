import { Button } from "@/components/ui/button"
import { ArrowRight, Crown, Star, TrendingUp, Award } from 'lucide-react'
import Link from "next/link"

export default function PremiumPartnerCTA() {
    const premiumBenefits = [
        {
            icon: Crown,
            title: "Homepage Featured",
            description: "Get prominent placement on our homepage",
        },
        {
            icon: Award,
            title: "Verified Badge",
            description: "Display premium verification badge",
        },
        {
            icon: TrendingUp,
            title: "Priority Positioning",
            description: "Appear first in search results",
        },
        {
            icon: Star,
            title: "Enhanced Profile",
            description: "Stand out with premium styling",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/15 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full animate-pulse delay-500"></div>
            </div>

            {/* Premium icons */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce delay-300">👑</div>
                <div className="absolute top-1/3 right-1/4 text-5xl animate-bounce delay-700">⭐</div>
                <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce delay-1000">🏆</div>
                <div className="absolute bottom-1/4 right-1/3 text-5xl animate-bounce delay-500">💎</div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="max-w-6xl mx-auto" data-aos="fade-up">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left side - Content */}
                        <div className="text-left">
                            <h2 className="lg:text-5xl text-3xl mb-6 font-semibold leading-tight">
                                Looking to Stand Out
                                <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                    Even More?
                                </span>
                            </h2>
                            <p className="text-xl mb-8 opacity-90 leading-relaxed">
                                Become a Premium Partner and get featured on the homepage with a verified badge and priority positioning.
                            </p>

                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-[#B93239] hover:bg-gray-100 px-10 h-16 text-xl shadow-2xl hover:shadow-3xl transition-all group"
                            >
                                <Link href="/premium-partner">
                                    Become a Premium Partner
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>

                        {/* Right side - Benefits */}
                        <div data-aos="fade-left" data-aos-delay="200">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                                <div className="flex items-center justify-center mb-8">
                                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center">
                                        <Crown className="h-8 w-8 text-white" />
                                    </div>
                                </div>

                                <h3 className="text-2xl mb-8 text-center font-semibold">Premium Benefits</h3>

                                <div className="grid grid-cols-2 gap-6">
                                    {premiumBenefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            data-aos="fade-up"
                                            data-aos-delay={300 + index * 100}
                                            className="text-center p-4 rounded-2xl hover:bg-white/10 transition-all duration-300"
                                        >
                                            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                                                <benefit.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <h4 className="text-lg font-medium mb-2">{benefit.title}</h4>
                                            <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional info */}
                                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                                    <p className="text-white/80 text-sm">
                                        Premium applications are reviewed by the Nexus Built team.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
