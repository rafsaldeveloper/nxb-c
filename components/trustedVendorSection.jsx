"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle, Award, User } from "lucide-react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import EmptyPremiumCTA from "@/components/emptyPremState"
import "swiper/css/pagination";

import { getAllThePremiumVendors } from '@/lib/api/commonApi'
import { useEffect, useState } from "react";

export default function TrustedVendorSection() {
    const [premiumVendors, setPremiumVendors] = useState([])
    const featuredVendors = [
        {
            name: "Premium Electric Solutions",
            category: "Electrical",
            rating: 4.9,
            reviews: 127,
            location: "Austin, TX",
            image:
                "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=250&fit=crop",
            specialty: "Commercial Wiring",
            verified: true,
            premium: true,
        },
        {
            name: "Apex Construction Group",
            category: "Construction",
            rating: 4.8,
            reviews: 203,
            location: "Dallas, TX",
            image:
                "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop",
            specialty: "General Contracting",
            verified: true,
            premium: false,
        },
        {
            name: "FlowTech Plumbing",
            category: "Plumbing",
            rating: 4.9,
            reviews: 89,
            location: "Houston, TX",
            image:
                "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
            specialty: "Emergency Repairs",
            verified: true,
            premium: true,
        },
    ];

    const getAllPremVendor = async () => {
        try {
            const allPremVendors = await getAllThePremiumVendors();
            console.log(allPremVendors.data)
            setPremiumVendors(allPremVendors.data.result || [])
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getAllPremVendor();
    }, [])

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-20 h-20 bg-gradient-to-br from-[#B93239]/10 to-transparent rounded-full"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-[#B93239]/5 to-transparent rounded-full blur-xl"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-2" data-aos="fade-up">
                    <h2 className="text-4xl mb-4 text-gray-900">
                        Trusted Vendors, Ready to Work
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        These businesses are approved and ready to take on your next project.

                    </p>
                </div>

                <div className="w-full pb-10 pt-5">
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 2500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        spaceBetween={30}
                        centeredSlides={true}
                        breakpoints={{
                            320: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                        }}
                        className="pb-12"
                    >
                        {premiumVendors.length === 0 ? (
                            <EmptyPremiumCTA />
                        ) : (
                            premiumVendors.map((vendor, i) => (
                                <SwiperSlide key={i} className="!h-auto my-14">
                                    <Card className={`relative p-6 mb-6 rounded-2xl border shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-between overflow-hidden group ${vendor.isPremium === "Yes"
                                        ? "bg-gradient-to-br from-white via-red-50/30 to-red-100/30 border-red-100/60 hover:border-red-300/50"
                                        : "bg-gradient-to-br from-white via-slate-50/50 to-gray-100/80 border-gray-200 hover:border-gray-300"
                                        }`}>
                                        {/* Decorative premium glow */}
                                        {vendor.isPremium === "Yes" && (
                                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-red-300/20 to-transparent rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>
                                        )}

                                        {/* Header Section */}
                                        <div className="flex justify-between items-start mb-6 relative z-10">
                                            <div className="pr-4">
                                                {/* Business Name */}
                                                <h3 className="text-2xl font-bold text-gray-900 tracking-tight mb-1 line-clamp-1">
                                                    {vendor.businessName}
                                                </h3>
                                                {/* Business Type */}
                                                {vendor.businessType && (
                                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                                                        {vendor.businessType}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex flex-col items-end gap-2 shrink-0">
                                                {/* Premium Tag */}
                                                {vendor.isPremium === "Yes" && (
                                                    <Badge className="bg-gradient-to-r from-slate-200 via-gray-100 to-slate-300 text-slate-800 border border-slate-300/60 shadow-sm flex items-center gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                                                        <Award className="w-3.5 h-3.5" /> Premium
                                                    </Badge>
                                                )}
                                                {/* Status */}
                                                <Badge
                                                    variant="outline"
                                                    className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider border shadow-sm ${vendor.businessStatus === "Active"
                                                        ? "bg-green-50 text-green-700 border-green-200"
                                                        : "bg-red-50 text-red-700 border-red-200"
                                                        }`}
                                                >
                                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 inline-block ${vendor.businessStatus === "Active" ? "bg-green-500" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"}`}></span>
                                                    {vendor.businessStatus}
                                                </Badge>
                                            </div>
                                        </div>

                                        <CardContent className="p-0 flex-grow flex flex-col relative z-10">
                                            {/* Description */}
                                            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                                                {vendor.businessDescrption}
                                            </p>

                                            {/* Experience */}
                                            <div className="flex items-center gap-3 mb-6 bg-white/60 p-3.5 rounded-xl border border-gray-100 shadow-sm backdrop-blur-sm">
                                                <div className="bg-gray-900 p-2 rounded-lg text-white shadow-md">
                                                    <CheckCircle className="w-4 h-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">Experience</span>
                                                    <span className="text-sm font-bold text-gray-900">
                                                        {vendor.yearsOfExperience || "Not specified"}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* CTAs */}
                                            <div className="flex justify-end gap-3 mt-auto pt-3 border-t border-gray-100/60">
                                                {/* Contact CTA (Hidden) */}
                                                <button className="hidden py-2 px-5 bg-white border border-gray-200 text-gray-700 text-sm rounded-full font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 items-center justify-center gap-2 shadow-sm">
                                                    Contact
                                                </button>

                                                {/* Register CTA */}
                                                <Link href={`/vendor/register`} className="block">
                                                    <button className="py-2 px-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-sm rounded-full font-medium shadow-sm hover:shadow-md hover:from-black hover:to-gray-900 transition-all duration-300 flex items-center justify-center">
                                                        Request Quote
                                                    </button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
            </div>
        </section>
    )
} 