"use client";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Crown, Zap, Target } from 'lucide-react'
import Link from "next/link"
import { useEffect, useState } from "react"
import { getSubscriptionPlans } from "@/lib/api/commonApi";

export default function PricingPlans() {

    const [prices, setPrices] = useState({});



    const subPlain = async () => {
        const result = await getSubscriptionPlans();
        console.log("subscription plans", result.data.result);
        setPrices(result.data.result);
    }

    useEffect(() => {
        subPlain();
    }, []);

    const plans = [
        {
            name: "Monthly Plan",
            description: "Perfect for short-term visibility",
            price: prices.monthlyPrice || "0",
            period: "month",
            originalPrice: null,
            savings: null,
            icon: Zap,
            color: "from-blue-500 to-blue-600",
            popular: false,
            features: [
                "Verified vendor listing",
                "Enquiry dashboard access",
                "Customer profile exposure",
            ],
            buttonText: "Start Monthly",
            buttonVariant: "outline",
        },
        {
            name: "Quarterly Plan",
            description: "Ideal for steady growth",
            price: prices.quarterlyPrice || "0",
            period: "3 months",
            originalPrice: "897",
            savings: "Save 15%",
            icon: Target,
            color: "from-green-500 to-green-600",
            popular: true,
            features: [
                "All monthly features",
                "Better listing position",
                "Optional Premium badge upgrade",
            ],
            buttonText: "Start Quarterly",
            buttonVariant: "default",
        },
        {
            name: "Yearly Plan",
            description: "Best value for serious vendors",
            price: prices.annualPrice || "0",
            period: "year",
            originalPrice: "3,588",
            savings: "Save 30%",
            icon: Crown,
            color: "from-purple-500 to-purple-600",
            popular: false,
            features: [
                "All features unlocked",
                "Homepage visibility",
                "Premium Partner badge included",
            ],
            buttonText: "Start Yearly",
            buttonVariant: "outline",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-slate-50 via-gray-50 to-white relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-gradient-to-br from-[#B93239]/8 to-transparent rounded-full blur-2xl"></div>
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-[#B93239]/12 to-transparent rounded-full blur-xl"></div>

            {/* Floating pricing symbols */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-20 left-10 text-4xl">💰</div>
                <div className="absolute top-40 right-20 text-3xl">📈</div>
                <div className="absolute bottom-40 left-1/4 text-5xl">⭐</div>
                <div className="absolute bottom-20 right-10 text-3xl">🎯</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl mb-6 text-gray-900 font-semibold">Pricing Options</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Transparent pricing with no hidden fees. Choose the plan that works best for your business.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div key={index}>
                            <div

                                data-aos="fade-up"
                                data-aos-delay={index * 150}
                                className={`group transform hover:scale-105 transition-all duration-300 ${plan.popular ? "relative" : ""
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                                        <Badge className="bg-gradient-to-r from-[#B93239] to-[#A02A31] text-white border-0 shadow-lg px-4 py-1 text-sm">
                                            Recommended
                                        </Badge>
                                    </div>
                                )}

                                <Card
                                    className={`overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 bg-white relative h-full ${plan.popular ? "ring-2 ring-[#B93239] ring-opacity-50" : ""
                                        }`}
                                >
                                    <CardHeader className="text-center pb-8 pt-8">
                                        {/* Icon with gradient background */}
                                        <div className="relative mb-6 mx-auto">
                                            <div
                                                className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-xl`}
                                            >
                                                <plan.icon className="h-8 w-8 text-white" />
                                            </div>
                                            {/* Glow effect */}
                                            <div
                                                className={`absolute inset-0 w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl opacity-20 blur-lg group-hover:opacity-40 transition-opacity duration-300`}
                                            ></div>
                                        </div>

                                        <CardTitle className="text-2xl mb-2 text-gray-900 group-hover:text-[#B93239] transition-colors duration-300">
                                            {plan.name}
                                        </CardTitle>
                                        <p className="text-gray-600 mb-6">{plan.description}</p>

                                        {/* Pricing */}
                                        <div className="mb-6">
                                            <div className="flex items-center justify-center mb-2">
                                                <span className="text-sm text-gray-500 mr-2">AED</span>
                                                <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                                                <span className="text-gray-500 ml-2">/ {plan.period}</span>
                                            </div>
                                            {/* {plan.savings && (
                                                <div className="flex items-center justify-center space-x-2">
                                                    <span className="text-sm text-gray-400 line-through">AED {plan.originalPrice}</span>
                                                    <Badge className="bg-green-100 text-green-700 border-0 text-xs">
                                                        {plan.savings}
                                                    </Badge>
                                                </div>
                                            )} */}
                                        </div>
                                    </CardHeader>

                                    <CardContent className="px-8 pb-8">
                                        {/* Features */}
                                        <div className="space-y-4 mb-8">
                                            {plan.features.map((feature, featureIndex) => (
                                                <div key={featureIndex} className="flex items-center space-x-3">
                                                    <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                                                        <Check className="h-3 w-3 text-green-600" />
                                                    </div>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA Button */}
                                        <Button
                                            asChild
                                            className={`relative z-10 w-full h-12 text-lg shadow-lg hover:shadow-xl transition-all group/btn ${plan.buttonVariant === "default"
                                                ? "bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white"
                                                : "border-2 border-[#B93239] text-[#B93239] hover:bg-[#B93239] hover:text-white bg-transparent"
                                                }`}
                                        >
                                            <Link href="/vendor/register">
                                                {plan.buttonText}
                                                <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </CardContent>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-[#B93239]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
                                </Card>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
