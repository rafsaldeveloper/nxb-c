import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Award } from "lucide-react"
import Link from "next/link"

export default function JoinNetworkCTA() {
    return (
        <section className="py-20 bg-gradient-to-br from-[#B93239] via-[#A02A31] to-[#8B1E25] text-white relative overflow-hidden">
            {/* Background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/15 rounded-full"></div>
            </div>

            <div className="container mx-auto px-4 text-center relative z-10">
                <div className="max-w-4xl mx-auto" data-aos="fade-up">
                    <h2 className="text-4xl mb-6 font-semibold">Join the Network</h2>
                    <p className="text-xl mb-12 opacity-90 max-w-3xl mx-auto leading-relaxed">
                        Whether you're a business owner, a supplier, or a skilled contractor — Nexus Built helps you show up, stand
                        out, and succeed.
                    </p>

                    {/* Stats */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <Users className="h-12 w-12 mx-auto mb-4 text-white" />
                            <div className="text-2xl font-bold mb-2">Growing Network</div>
                            <div className="text-white/80">Join thousands of professionals</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <Award className="h-12 w-12 mx-auto mb-4 text-white" />
                            <div className="text-2xl font-bold mb-2">Verified Quality</div>
                            <div className="text-white/80">All vendors manually reviewed</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                            <ArrowRight className="h-12 w-12 mx-auto mb-4 text-white" />
                            <div className="text-2xl font-bold mb-2">Real Results</div>
                            <div className="text-white/80">Connect, engage, and grow</div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="bg-white text-[#B93239] hover:bg-gray-100 px-10 h-16 text-xl shadow-2xl hover:shadow-3xl transition-all group"
                        >
                            <Link href="/signup">
                                Create Your Account
                                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="border-2 border-white text-white hover:bg-white hover:text-[#B93239] px-10 h-16 text-xl backdrop-blur-sm bg-transparent"
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
