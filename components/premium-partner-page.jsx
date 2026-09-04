"use client"

import ContactForm from "../components/contact-form"
import { ArrowRight, Home, Award, TrendingUp, AwardIcon, HelpCircle, Mail } from "lucide-react"

export default function PremiumPartnerPage() {
    const benefits = [
        {
            icon: Home,
            title: "Homepage Visibility",
            description: "Get listed in the Featured Vendors section seen by every visitor landing on Nexus Built.",
        },
        {
            icon: AwardIcon,
            title: "Premium Partner Badge",
            description: "Displayed on your vendor profile to establish trust and credibility instantly.",
        },
        {
            icon: TrendingUp,
            title: "Priority in Search Results",
            description: "Appear higher in category listings, helping you get discovered faster.",
        },
        {
            icon: Award,
            title: "Showcase Previous Work",
            description: "Add a visual gallery or highlight key projects (optional).",
        },
    ]

    const targets = [
        "Verified vendors looking to grow faster",
        "Service providers with proven experience",
        "Businesses ready to take a leadership position in their category",
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* Hero Section */}
            <section className="py-20 relative overflow-hidden bg-[#B93239]/90 ">
                {/* Background effects */}
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

                <div className="container mx-auto px-4 relative z-10" data-aos="fade-up">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">Become Premium Partner</h1>
                        <p className="text-xl md:text-2xl text-white mb-6">Get Featured. Get Chosen.</p>
                        <p className="text-lg text-white mb-8 leading-relaxed">Stand Out Where It Matters</p>
                        <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
                            Nexus Built is more than just a vendor directory — it's a platform built to connect serious professionals
                            with real business opportunities. If you're a verified vendor, you can now take your visibility one step
                            further by becoming a Premium Partner.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto" data-aos="fade-up">
                        <h2 className="text-4xl font-bold text-white mb-6">Why Become a Premium Partner?</h2>
                        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
                            Becoming a featured vendor means your business gets placed front and center across high-impact sections of
                            the site — where decision-makers are already searching.
                        </p>

                        <h3 className="text-2xl font-semibold text-white mb-8">Your Benefits:</h3>

                        <div className="grid md:grid-cols-2 gap-8">
                            {benefits.map((benefit, index) => (
                                <div
                                    key={index}
                                    className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="flex-shrink-0 w-12 h-12 bg-[#B93239]/20 rounded-xl flex items-center justify-center">
                                            <benefit.icon className="h-6 w-6 text-[#B93239]" />
                                        </div>
                                        <div>
                                            <h4 className="text-white font-semibold text-lg mb-2">{benefit.title}</h4>
                                            <p className="text-gray-300 text-sm leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Who It's For */}
            <section className="py-20 relative bg-white">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">🎯</div>
                    <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse delay-1000">✨</div>
                    <div className="absolute bottom-1/3 left-1/3 text-4xl animate-pulse delay-500">🚀</div>
                </div>

                <div className="container mx-auto px-4 relative z-10" data-aos="fade-up">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-4xl font-bold text-[#B93239] mb-6">Who It's For</h2>
                        <p className="text-black mb-12 leading-relaxed">
                            Premium Partnership is designed for ambitious vendors ready to level up their presence on Nexus Built.
                        </p>

                        <div className="space-y-4">
                            {targets.map((target, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-4 bg-black/10 backdrop-blur-lg border border-black/20 rounded-xl p-4"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-[#B93239] rounded-full flex items-center justify-center">
                                        <ArrowRight className="h-5 w-5 text-white" />
                                    </div>
                                    <p className="text-gray-800 text-lg">{target}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <ContactForm
                heading="Apply to Become a Premium Partner"
                description="Tell us about your business. Our team will review your request and contact you."
                defaultSubject="Premium Partner application"
                subjectReadOnly
                submitLabel="Submit Premium Application"
            />

            {/* Help Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 md:p-12" data-aos="fade-up">
                            <div className="flex items-center justify-center mb-8">
                                <div className="w-16 h-16 bg-[#B93239]/20 rounded-2xl flex items-center justify-center">
                                    <HelpCircle className="h-8 w-8 text-[#B93239]" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-6 text-center">Need Help?</h2>
                            <p className="text-gray-300 text-lg text-center mb-8 leading-relaxed">
                                Have questions before applying? Contact us and our team will be happy to help you get started.
                            </p>
                            <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                                <a
                                    href="mailto:support@nxbuilt.com"
                                    className="flex items-center space-x-3 bg-[#B93239] hover:bg-[#A02A31] text-white px-8 py-4 rounded-xl transition-all group"
                                >
                                    <Mail className="h-5 w-5" />
                                    <span>support@nxbuilt.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
