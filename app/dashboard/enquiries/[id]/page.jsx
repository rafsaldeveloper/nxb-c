"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Paperclip, Calendar, Phone, Mail, User, FileText, Clock, Star, MapPin, Building, TrendingUp, Shield, AlertCircle, MessageSquare } from "lucide-react"
import { attachmentFromCustomer, getIndividualCustomerEnquiry, getQuotesByEnquiry } from "@/lib/api/commonApi"
import { useToast } from "@/hooks/use-toast"
import EnquiryAttachments from "@/components/enquiry-attachments"

export default function IndCustEnq() {
  const { id } = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [enquiryData, setEnquiryData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [attachments, setAttachments] = useState([]);
  const [attachmentsLoading, setAttachmentsLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [quotesLoading, setQuotesLoading] = useState(false);


  const fetchEnquiry = async () => {
    setIsLoading(true)
    try {
      const res = await getIndividualCustomerEnquiry(id)
      setEnquiryData(res.data.result)
    } catch (err) {
      console.error(err)
      toast({ title: "Error fetching enquiry", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFetchAttachments = async (enqGuid) => {
    setAttachmentsLoading(true);
    try {
      const getCustomerAttachment = await attachmentFromCustomer(enqGuid);
      console.log(getCustomerAttachment.data.result)
      setAttachments(getCustomerAttachment.data.result)
    } catch (error) {
      console.error(error);
    } finally {
      setAttachmentsLoading(false);
    }
  }

  const fetchIntrestedVendorData = async (enqGuid) => {
    setQuotesLoading(true);
    try {
      const res = await getQuotesByEnquiry(enqGuid);
      console.log("Quotes:", res.data.result);
      setQuotes(res.data.result);
    } catch (error) {
      console.error(error);
      toast({ title: "Error fetching quotes", variant: "destructive" });
    } finally {
      setQuotesLoading(false);
    }
  };


  useEffect(() => {
    if (id) fetchEnquiry();
    handleFetchAttachments(id);
    fetchIntrestedVendorData(id);
  }, [id])

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const getTimeAgo = (dateString) => {
    const now = new Date()
    const date = new Date(dateString)
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60))
    if (diffInHours < 24) return `${diffInHours}h ago`
    return `${Math.floor(diffInHours / 24)}d ago`
  }

  const priorityColors = {
    high: "bg-red-100 text-red-700",
    medium: "bg-orange-100 text-orange-700",
    low: "bg-green-100 text-green-700",
  }

  const statusColors = {
    Open: "bg-yellow-100 text-yellow-800",
    Completed: "bg-green-100 text-green-800",
    Closed: "bg-blue-100 text-blue-800",
  }

  if (isLoading || !enquiryData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading enquiry...</p>
      </div>
    )
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
                className={`h-1 ${priorityColors[enquiryData.priorityLevel]} rounded-t`}
              ></div>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl font-bold text-gray-900 mb-3">
                      {enquiryData.serviceRequired}
                    </CardTitle>
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className={`${priorityColors[enquiryData.priorityLevel]} px-3 py-1`}>
                        {enquiryData.priorityLevel.toUpperCase()}
                      </Badge>
                      <Badge className={`${statusColors[enquiryData.status]} px-3 py-1`}>
                        {enquiryData.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>Posted: {getTimeAgo(enquiryData.addedOn)}</span>
                    </div>
                    <div className="text-xl font-bold text-[#B80D2D]">
                      AED {enquiryData.totalAmount}
                    </div>
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
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {enquiryData.description}
                </p>
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


            {/* Quick Actions */}
            <Card className="border-0 hidden shadow-lg bg-white">
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
              </CardContent>
            </Card>

            {/* Quotes List */}
            {quotes.length >= 1 && (
              <div className="border-0 shadow-lg p-3 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                <div className="flex items-center space-x-2">
                  <Shield></Shield>
                  <h2 className="lg:text-[26px] text-[20px] text-black font-medium">Vendor's Quoted :</h2>
                </div>
                <div className="space-y-6 mt-6">
                  {quotes.sort((a, b) => new Date(b.updatedOn || b.addedOn) - new Date(a.updatedOn || a.addedOn)).map((quote) => (
                    <Card
                      key={quote.quoteGuid}
                      className="border-0  border hover:shadow-xl transition-all duration-300 bg-white overflow-hidden"
                    >
                      {/* Quote Header */}
                      <CardHeader className="pb-4">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
                          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-2">
                                <h3 className="lg:text-[30px] text-[24px] font-bold text-gray-900">
                                  {quote.businessName}
                                </h3>
                                {/* Verified / Premium Badges */}
                                {quote.vendorVerified && (
                                  <Badge className="bg-green-100 text-green-700 border-green-200 border">
                                    Verified
                                  </Badge>
                                )}
                                {quote.vendorPremium && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white border-0">
                                    Premium
                                  </Badge>
                                )}
                                {/* ✅ Updated badge if updatedOn ≠ addedOn */}
                                {quote.updatedOn &&
                                  new Date(quote.updatedOn).getTime() !==
                                  new Date(quote.addedOn).getTime() && (
                                    <Badge className="bg-blue-100 text-blue-700 border-blue-200 border">
                                      Updated
                                    </Badge>
                                  )}
                              </div>

                              {/* Vendor Info */}
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                {/* <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{quote.vendorRating || 4.9}</span>
                                <span>({quote.vendorReviews || 156} reviews)</span>
                              </div> */}
                                {/* <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{quote.vendorLocation || "Dubai"}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Building className="h-4 w-4" />
                                <span>{quote.vendorExperience || 12} years exp.</span>
                              </div> */}
                              </div>
                            </div>
                          </div>


                          {/* Quote Price / Timeline */}
                          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
                            <div className="text-right">
                              <div className="text-3xl font-bold text-[#B93239]">
                                AED {quote.quotePrice.toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500">
                                Timeline: {quote.timeLine} business days
                              </div>
                            </div>
                            {/* Heart / Bookmark Button if needed */}
                          </div>
                        </div>
                      </CardHeader>

                      {/* Quote Content */}
                      <CardContent className="pt-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Details */}
                        <div className="col-span-1 lg:col-span-2 space-y-3">
                          {/* Work Description */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <FileText className="h-4 w-4 mr-2 text-[#B93239]" />
                              Work Description
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{quote.description}</p>
                          </div>

                          {/* Materials & Equipment */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <TrendingUp className="h-4 w-4 mr-2 text-[#B93239]" />
                              Materials & Equipment
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{quote.matAndEqup}</p>
                          </div>

                          {/* Warranty */}
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-[#B93239]" />
                              Warranty Information
                            </h4>
                            <p className="text-gray-700 leading-relaxed">{quote.warrantyInfo}</p>
                          </div>

                          {/* Additional Notes */}
                          {quote.notes && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <AlertCircle className="h-4 w-4 mr-2 text-[#B93239]" />
                                Additional Notes
                              </h4>
                              <p className="text-gray-700 leading-relaxed">{quote.notes}</p>
                            </div>
                          )}
                          {/* ✅ Vendor Attachments */}
                          {quote.attachment && quote.attachment.length > 0 && (
                            <div>
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Paperclip className="h-4 w-4 mr-2 text-[#B93239]" />
                                Vendor Attachments
                              </h4>
                              <EnquiryAttachments
                                attachments={[{
                                  filePath: quote.attachment,
                                  fileName: quote.attachmentName,
                                  fileType: quote.attachmentType,
                                }]}
                              />
                            </div>
                          )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                          {/* Quote Details */}
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold text-gray-900 mb-3">Quote Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-600">
                                  {new Date(quote.updatedOn).getTime() !== new Date(quote.addedOn).getTime()
                                    ? "Updated:"
                                    : "Submitted:"}
                                </span>
                                <span className="font-medium">
                                  {new Date(quote.updatedOn).getTime() !== new Date(quote.addedOn).getTime()
                                    ? getTimeAgo(quote.updatedOn)
                                    : getTimeAgo(quote.addedOn)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Timeline:</span>
                                <span className="font-medium">{quote.timeLine} business days</span>
                              </div>
                            </div>
                          </div>


                          {/* Contact Vendor */}
                          <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                            <h4 className="font-semibold text-blue-900 mb-3">Contact Vendor</h4>
                            <div className="space-y-3 text-sm text-blue-700">
                              <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4" />
                                <span>{quote.phoneNo}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4" />
                                <span>{quote.emailAddress}</span>
                              </div>
                            </div>
                          </div>


                          {/* Actions
                        <div className="space-y-3">
                          <Button className="w-full bg-gradient-to-r from-[#B93239] to-[#A02A31] hover:from-[#A02A31] hover:to-[#8B1E25] text-white">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Accept Quote
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-[#B93239] text-[#B93239] hover:bg-[#B93239] hover:text-white bg-transparent"
                          >
                            <User className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Send Message
                          </Button>
                        </div> */}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

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
                <p><strong>Name:</strong> {enquiryData.customerName}</p>
                <p><strong>Email:</strong> {enquiryData.emailAddress}</p>
                <p><strong>Phone:</strong> {enquiryData.phoneNumber}</p>
                <p><strong>Service:</strong> {enquiryData.serviceRequired}</p>
                <p><strong>Added On:</strong> {formatDate(enquiryData.addedOn)}</p>
                <p><strong>Status</strong> {enquiryData.status}</p>
                <p><strong>Status Updated On:</strong> {formatDate(enquiryData.statusOn)}</p>
                <p><strong>Status Notes:</strong> {enquiryData.statusNotes}</p>
              </CardContent>
            </Card>

            {/* Competition */}
            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-900">
                  <User className="h-5 w-5 mr-2" />
                  Total Vendor Intersted
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

          </div>
        </div>
      </div>
    </div>
  )
}
