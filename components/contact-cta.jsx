import { Button } from "@/components/ui/button"
import { ArrowRight, Users, MessageSquare, Headphones } from "lucide-react"
import Link from "next/link"

export default function ContactCTA() {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-10 right-20 w-40 h-40 bg-gradient-to-br from-[#B93239]/5 to-transparent rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
                    <h2 className="text-4xl mb-8 text-gray-900 font-semibold">Still Have Questions?</h2>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Users className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Join Our Community</h3>
                            <p className="text-gray-600 text-sm">Connect with other vendors and project owners</p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <MessageSquare className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat Support</h3>
                            <p className="text-gray-600 text-sm">Get instant help during business hours</p>
                        </div>

                        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Headphones className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
                            <p className="text-gray-600 text-sm">Speak directly with our support team</p>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-[#B93239]/10 to-[#A02A31]/10 rounded-3xl p-8">
                        <h3 className="text-2xl mb-4 text-gray-900 font-semibold">Ready to Get Started?</h3>
                        <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                            Join thousands of vendors and project owners who trust Nexus Built for their construction needs.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button
                                asChild
                                size="lg"
                                className="bg-[#B93239] hover:bg-[#A02A31] text-white px-10 h-14 text-lg shadow-lg hover:shadow-xl transition-all group"
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
                                className="border-2 border-[#B93239] text-[#B93239] hover:bg-[#B93239] hover:text-white px-10 h-14 text-lg bg-transparent"
                            >
                                <Link href="/signin">
                                    Sign In to Browse Vendors
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
