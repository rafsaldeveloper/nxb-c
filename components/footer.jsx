import { Building2, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid md:grid-cols-4 gap-8">
                    <div>
                        <div className="flex items-center space-x-2">
                            <Image src="/assets/header images/nexus_white_no_bg.png" width={80} height={80} />
                        </div>
                        <p className="text-gray-400 ps-2">
                            Your trusted partner for all construction needs. Connecting you with quality vendors and professionals.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/terms-and-conditions">Terms and Conditions</Link></li>
                            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                            <li><Link href="/refund-policy-page">Refund Policy</Link></li>
                            <li><Link href="/shipping-policy">Shipping Policy</Link></li>
                            <li><Link href="/support-policy">Support Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/premium-partner">Premium Partner</Link></li>
                            <li><Link href="/pricing-plans">Pricing Plans</Link></li>
                            <li><Link href="/about">About Us</Link></li>
                            <li><Link href="/services">Our Services</Link></li>
                            {/* <li><a href="/">Careers</a></li> */}
                            <li><Link href="/contactUs">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Contact Info</h3>
                        <div className="space-y-2 text-gray-400">
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <a href="tel:+971 50 105 2626" className="hover:underline">
                                   +971 50 105 2626
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:info@nxbuilt.com" className="hover:underline">
                                    info@nxbuilt.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MapPin className="h-4 w-4" />
                                <a
                                    href="https://www.google.com/maps?q=Dubai,+United+Arab+Emirates"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:underline"
                                >
                                    Dubai, United Arab Emirates
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 flex lg:flex-row flex-col items-center justify-center space-x-2">
                    <p>&copy; 2026 NexusBuilt. All rights reserved. crafted by</p>
                    <Image
                        src="/assets/Flashyminds-TM-White.png"
                        alt="Your Company Logo"
                        width={100}
                        height={40}
                    />
                </div>

            </div>
        </footer>
    )
}
