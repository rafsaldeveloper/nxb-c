"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  User,
  FileText,
  MapPin,
  DollarSign,
  Clock,
  Building2,
  Paperclip,
  Send,
  Users,
} from "lucide-react"
import QuoteModal from '@/components/vendorFormDialog'
import { attachmentForVendor, getIndividualVendorEnquiry, submitVendorQuoteForm } from "@/lib/api/commonApi"
import { useToast } from "@/hooks/use-toast"
import EnquiryAttachments from "@/components/enquiry-attachments"

// Mock enquiry data (in real app, this would come from API based on ID)


export default function EnquiryDetailPage() {
  const { id } = useParams();
  const { toast } = useToast();
  const [quoteData, setQuoteData] = useState({
    price: "",
    timeline: "",
    description: "",
    materials: "",
    warranty: "",
    additionalNotes: "",
  })
  const [attachmentsLoading, setAttachmentsLoading] = useState(false);
  const [enquiryData, setEnquiryData] = useState({})
  const [attachments, setAttachments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))

    if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const handleInputChange = (field, value) => {
    setQuoteData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const priorityConfig = {
    high: {
      label: "High",
      color: "bg-red-100 text-red-700 border-red-300",
    },
    medium: {
      label: "Medium",
      color: "bg-orange-100 text-orange-700 border-orange-300",
    },
    low: {
      label: "Low",
      color: "bg-green-100 text-green-700 border-green-300",
    }
  }

  const getFileIcon = (fileType) => {
    if (fileType.startsWith("image/")) {
      return "🖼️"
    } else if (fileType === "application/pdf") {
      return "📄"
    }
    return "📎"
  }

  const fetchIndividualVendorEnquiry = async () => {
    setIsLoading(true);
    try {
      const response = await getIndividualVendorEnquiry(id);
      const RetData = response.data;
      setEnquiryData(RetData.result)
      console.log(RetData)
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleFetchAttachments = async (enqGuid) => {
    setAttachmentsLoading(true);
    try {
      const getVendorAttachment = await attachmentForVendor(enqGuid);
      console.log(getVendorAttachment.data.result)
      setAttachments(getVendorAttachment.data.result)
    } catch (error) {
      console.error(error);
    } finally {
      setAttachmentsLoading(false);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await fetchIndividualVendorEnquiry()
      }
    }
    handleFetchAttachments(id);


    fetchData()

    if (!modalOpen) {
      fetchData()
    }
  }, [id, modalOpen])

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-gray-500 text-lg">Loading enquiry...</p>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-7xl py-8">
        {/* Back Button */}
        <div className="mb-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 text-gray-700 hover:bg-gray-200"
            onClick={() => router.back()}
          >
            ← Back
          </Button>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enquiry Overview */}
            <Card className="border-0 shadow-lg bg-white">
              <div
                className={`h-1 ${enquiryData?.priorityLevel === "High" ? "bg-red-500" : enquiryData?.priorityLevel === "Medium" ? "bg-orange-500" : "bg-slate-500"}`}
              ></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{enquiryData?.serviceRequired}</CardTitle>
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className={`${priorityConfig[enquiryData?.priorityLevel]?.color} border px-3 py-1 font-medium`}>
                        {priorityConfig[enquiryData?.priorityLevel]?.label}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>Posted: {getTimeAgo(enquiryData?.addedOn)}</span>
                    </div>
                    <div className="text-xl font-bold text-[#B80D2D]">{enquiryData?.totalAmount}</div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Project Description */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#B80D2D]" />
                  Project Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{enquiryData?.description}</p>
              </CardContent>
            </Card>

            {/* Attachments */}
            {enquiryData.attachmentCount > 0 && (
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Paperclip className="h-5 w-5 mr-2 text-[#B80D2D]" />
                    Attachments ({enquiryData.attachmentCount})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {attachmentsLoading ? (
                    <p className="text-gray-500 text-center">Loading attachments...</p>
                  ) : (
                    <EnquiryAttachments attachments={attachments} />
                  )}
                </CardContent>
              </Card>
            )}

            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-3 gap-3 flex justify-center flex-wrap lg:flex-nowrap items-center">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open(`tel:${enquiryData.phoneNumber}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#f8e7ea] hover:text-[#B80D2D] bg-transparent"
                  onClick={() => window.open(`mailto:${enquiryData.emailAddress}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>

                {enquiryData.hasVendorQuote ? (
                  <Button
                    variant="outline"
                    className="w-full border-[#B80D2D] bg-[#B80D2D] text-white hover:text-white hover:bg-[#930a24]"
                    onClick={() => setModalOpen(true)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    View Quote
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="w-full border-[#B80D2D] bg-[#B80D2D] text-white hover:text-white hover:bg-[#930a24]"
                    onClick={() => setModalOpen(true)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Quotation
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card className="border-0 shadow-lg bg-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-[#B80D2D]" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <User className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{enquiryData.customerName}</p>
                    <p className="text-sm text-gray-500">Customer</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <Mail className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{enquiryData.emailAddress}</p>
                    <p className="text-sm text-gray-500">Email Address</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <Phone className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{enquiryData.phoneNumber}</p>
                    <p className="text-sm text-gray-500">Phone Number</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 hidden">
                  <div className="p-2 bg-[#B80D2D]/10 rounded-lg">
                    <MapPin className="h-4 w-4 text-[#B80D2D]" />
                  </div>
                  <div className="">
                    <p className="font-medium text-gray-900">{enquiryData.location}</p>
                    <p className="text-sm text-gray-500">Location</p>
                  </div>
                </div>
                
              </CardContent>
            </Card>

            {/* Competition */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <Users className="h-5 w-5 mr-2" />
                  Competition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-700 mb-2">{enquiryData.totalQuotes}</div>
                  <p className="text-blue-600 mb-4">Other vendor{enquiryData.totalQuotes > 1 ? "s" : ""} interested</p>
                  <div className="bg-blue-200 rounded-lg p-3">
                    <p className="text-sm text-blue-800 font-medium">
                      {enquiryData.hasVendorQuote
                        ? "You've already submitted a quote"
                        : "Be the first to respond for better chances!"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 shadow-lg bg-white hidden">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  className="w-full bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => window.open(`tel:${enquiryData.phone}`)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Customer
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#B80D2D] text-[#B80D2D] hover:bg-[#B80D2D] hover:text-white bg-transparent"
                  onClick={() => window.open(`mailto:${enquiryData.email}`)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quote form as Modal */}
          <QuoteModal modalOpen={modalOpen} hasResponded={enquiryData?.hasVendorQuote} enquiryGuid={enquiryData?.enquiryGuid} setModalOpen={setModalOpen} />

        </div>
      </div>
    </div>
  )
}
