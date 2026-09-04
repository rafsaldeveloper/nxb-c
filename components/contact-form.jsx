"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Send, CheckCircle, Clock, Shield } from "lucide-react"
import { websiteContactForm } from "@/lib/api/commonApi"
import { useToast } from "@/hooks/use-toast"
import { isValidUaePhone, normalizeUaePhone, UAE_PHONE_ERROR, UAE_PHONE_PLACEHOLDER } from "@/lib/utils/uae-phone"

export default function ContactForm({
    heading = "Send Us a Message",
    description = "Use the form below and our team will get back to you within 24 hours",
    defaultSubject = "",
    subjectReadOnly = false,
    submitLabel = "Submit Message",
}) {
    const [formData, setFormData] = useState({
        cName: "",
        cEmail: "",
        cContact: "",
        cSubject: defaultSubject,
        cMessage: "",
    })
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!isValidUaePhone(formData.cContact)) {
            toast({
                title: "Invalid phone number",
                description: UAE_PHONE_ERROR,
                variant: "destructive",
            })
            return
        }

        setIsSubmitting(true)
        try {
            const dataReturned = await websiteContactForm({
                ...formData,
                cContact: normalizeUaePhone(formData.cContact),
            });
            if (!dataReturned.data.isSuccess) {
                toast({
                    title: "Submission failed",
                    description: dataReturned.data.message || "We could not send your message. Please try again.",
                    variant: "destructive",
                })
                return
            }

            setIsSubmitted(true)
            toast({
                title: dataReturned.data.message,
                variant: "success"
            })
            setFormData({
                cName: "",
                cEmail: "",
                cContact: "",
                cSubject: defaultSubject,
                cMessage: "",
            })
        } catch (error) {
            console.error(error)
            toast({
                title: "Submission failed",
                description: error.response?.data?.message || "We could not send your message. Please try again.",
                variant: "destructive",
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const features = [
        {
            icon: Clock,
            title: "24hr Response",
            description: "We'll get back to you within 24 hours",
        },
        {
            icon: Shield,
            title: "Secure & Private",
            description: "Your information is safe with us",
        },
        {
            icon: CheckCircle,
            title: "Expert Support",
            description: "Direct access to our team",
        },
    ]

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Background effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#B93239]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B93239]/15 rounded-full blur-3xl"></div>

            {/* Animated message icons */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
                <div className="absolute top-1/4 left-1/4 text-6xl animate-pulse">💬</div>
                <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse delay-1000">📝</div>
                <div className="absolute bottom-1/3 left-1/3 text-4xl animate-pulse delay-500">✉️</div>
                <div className="absolute bottom-1/4 right-1/3 text-5xl animate-pulse delay-1500">📨</div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-16" data-aos="fade-up">
                    <h2 className="text-4xl mb-6 text-white font-semibold">{heading}</h2>
                    <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
                        {description}
                    </p>
                </div>

                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        {/* Form */}
                        <div className="lg:col-span-2" data-aos="fade-right">
                            <Card className="bg-white/10 backdrop-blur-lg border border-white/20 overflow-hidden">
                                <CardHeader className="bg-white/5 border-b border-white/10">
                                    <CardTitle className="text-2xl text-white flex items-center">
                                        <Send className="h-6 w-6 mr-3 text-[#B93239]" />
                                        Contact Form
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="lg:p-8 px-3 py-6">
                                    {isSubmitted ? (
                                        <div className="text-center py-12">
                                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <CheckCircle className="h-10 w-10 text-white" />
                                            </div>
                                            <h3 className="text-2xl text-white mb-4 font-semibold">Message Sent Successfully!</h3>
                                            <p className="text-gray-300 text-lg">
                                                Thank you for reaching out. We'll get back to you within 24 hours.
                                            </p>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="cName" className="text-white text-sm font-medium">
                                                        Full Name *
                                                    </Label>
                                                    <Input
                                                        id="cName"
                                                        name="cName"
                                                        type="text"
                                                        required
                                                        value={formData.cName}
                                                        onChange={handleInputChange}
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] h-12"
                                                        placeholder="Enter your full name"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="cEmail" className="text-white text-sm font-medium">
                                                        Email Address *
                                                    </Label>
                                                    <Input
                                                        id="cEmail"
                                                        name="cEmail"
                                                        type="email"
                                                        required
                                                        value={formData.cEmail}
                                                        onChange={handleInputChange}
                                                        className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] h-12"
                                                        placeholder="Enter your email address"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="cContact" className="text-white text-sm font-medium">
                                                    Contact *
                                                </Label>
                                                <Input
                                                    id="cContact"
                                                    name="cContact"
                                                    type="tel"
                                                    required
                                                    value={formData.cContact}
                                                    onChange={handleInputChange}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] h-12"
                                                    placeholder={UAE_PHONE_PLACEHOLDER}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="cSubject" className="text-white text-sm font-medium">
                                                    Subject *
                                                </Label>
                                                <Input
                                                    id="cSubject"
                                                    name="cSubject"
                                                    type="text"
                                                    required
                                                    value={formData.cSubject}
                                                    onChange={handleInputChange}
                                                    readOnly={subjectReadOnly}
                                                    className={`bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] h-12 ${subjectReadOnly ? "cursor-not-allowed opacity-80" : ""}`}
                                                    placeholder="What's this about?"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="cMessage" className="text-white text-sm font-medium">
                                                    Message *
                                                </Label>
                                                <Textarea
                                                    id="cMessage"
                                                    name="cMessage"
                                                    required
                                                    value={formData.cMessage}
                                                    onChange={handleInputChange}
                                                    rows={6}
                                                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-[#B93239] focus:ring-[#B93239] resize-none"
                                                    placeholder="Tell us more about your enquiry..."
                                                />
                                            </div>

                                            <Button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full bg-[#B93239] hover:bg-[#A02A31] text-white h-14 text-lg shadow-lg hover:shadow-xl transition-all group disabled:opacity-50"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                                                        Sending Message...
                                                    </>
                                                ) : (
                                                    <>
                                                        {submitLabel}
                                                        <Send className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                                    </>
                                                )}
                                            </Button>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Features */}
                        <div className="space-y-6" data-aos="fade-left" data-aos-delay="200">
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                                <h3 className="text-xl text-white mb-6 font-semibold">Why Contact Us?</h3>
                                <div className="space-y-6">
                                    {features.map((feature, index) => (
                                        <div key={index} className="flex items-start space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-[#B93239]/20 rounded-xl flex items-center justify-center">
                                                <feature.icon className="h-6 w-6 text-[#B93239]" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium mb-1">{feature.title}</h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick tips */}
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                                <h4 className="text-white font-medium mb-4">Quick Tips</h4>
                                <ul className="space-y-2 text-gray-300 text-sm">
                                    <li className="flex items-center">
                                        <div className="w-1.5 h-1.5 bg-[#B93239] rounded-full mr-3"></div>
                                        Be specific about your enquiry
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-1.5 h-1.5 bg-[#B93239] rounded-full mr-3"></div>
                                        Include relevant details
                                    </li>
                                    <li className="flex items-center">
                                        <div className="w-1.5 h-1.5 bg-[#B93239] rounded-full mr-3"></div>
                                        Check your email for our response
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
