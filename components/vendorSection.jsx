import { Button } from "@/components/ui/button"
import { Search, MessageSquare, Settings, CreditCard, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function VendorsSection() {
    const vendorBenefits = [
        {
            icon: Search,
            title: "Appear in customer searches based on your services",
            description: "Get discovered by project owners actively looking for your expertise",
        },
        {
            icon: MessageSquare,
            title: "Get enquiries directly to your dashboard",
            description: "Receive and manage all project enquiries in one centralized location",
        },
        {
            icon: Settings,
            title: "Manage your profile, services, and enquiries in one place",
            description: "Complete control over your business presence and customer interactions",
        },
        {
            icon: CreditCard,
            title: "Pay once and stay listed with no hidden fees",
            description: "Transparent pricing with no surprise charges or recurring costs",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white relative overflow-hidden">
            {/* Background patterns and effects */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-1/4 w-40 h-40 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-20 right-1/4 w-32 h-32 border border-white/15 rounded-full"></div>
                <div className="absolute top-1/2 right-10 w-24 h-24 border border-white/10 rounded-full"></div>
            </div>

            {/* Flowing lines */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left side - Content */}
                        <div data-aos="fade-right">
                            <h2 className="text-5xl mb-6 font-semibold leading-tight">
                                Vendors, Grow Your Business
                                <span className="block bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                    Here
                                </span>
                            </h2>
                            <p className="text-xl mb-12 opacity-90 leading-relaxed">
                                Project owners are searching for services you offer. Listing your business on Nexus Built helps you get
                                seen, get enquiries, and get results.
                            </p>

                            {/* Stats */}
                            {/* <div className="grid grid-cols-3 gap-6 mb-12">
                                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                    <div className="text-2xl font-bold mb-1">500+</div>
                                    <div className="text-sm opacity-80">Active Projects</div>
                                </div>
                                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                    <div className="text-2xl font-bold mb-1">90+</div>
                                    <div className="text-sm opacity-80">Categories</div>
                                </div>
                                <div className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                                    <div className="text-2xl font-bold mb-1">UAE</div>
                                    <div className="text-sm opacity-80">Focused</div>
                                </div>
                            </div> */}

                            <Button
                                asChild
                                size="lg"
                                className="bg-white text-[#B93239] hover:bg-gray-100 px-10 h-16 text-xl shadow-2xl hover:shadow-3xl transition-all group"
                            >
                                <Link href="/vendor/register">
                                    Become a Verified Vendor
                                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>

                        {/* Right side - Benefits */}
                        <div data-aos="fade-left" data-aos-delay="200">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8">
                                <h3 className="text-2xl mb-8 text-center font-semibold">Benefits for Vendors</h3>

                                <div className="space-y-6">
                                    {vendorBenefits.map((benefit, index) => (
                                        <div
                                            key={index}
                                            data-aos="fade-up"
                                            data-aos-delay={300 + index * 100}
                                            className="group flex items-start space-x-4 p-4 rounded-2xl hover:bg-white/10 transition-all duration-300"
                                        >
                                            <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                                                <benefit.icon className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-lg font-medium mb-2 group-hover:text-gray-100 transition-colors">
                                                    {benefit.title}
                                                </h4>
                                                <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Additional CTA inside the card */}
                                <div className="mt-8 pt-6 border-t border-white/20 text-center">
                                    <p className="text-white/80 mb-4">Ready to get started?</p>
                                    {/* <Button
                                        variant="outline"
                                        className="border-2 border-white/30 text-white hover:bg-white hover:text-[#B93239] backdrop-blur-sm px-8 h-12 bg-transparent"
                                    >
                                        Learn More About Vendor Benefits
                                    </Button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
