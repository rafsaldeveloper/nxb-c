"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
    Building2,
    User,
    Mail,
    Phone,
    Edit3,
    Save,
    X,
    Paperclip,
    Camera,
    Star,
    ArrowLeft,
    CheckCircle,
    Settings,
    Info,
    Shield,
    Search,
    Award, CreditCard
} from "lucide-react"
import { deleteBusinessServices, deleteVendorLicense, getBusinessAddress, getBusinessServices, getServiceTypes, getVendorBusiness, getVendorLicences, getVendorProfileData, setBusinessServices, updateBusinessAddress, updateVendorBusiness, updateVendorProfileData, uploadVendorLicense, vendorSubscriptionStatus } from "@/lib/api/commonApi"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { isValidUaePhone, toUaePhoneDigits, UAE_PHONE_ERROR, UAE_PHONE_PLACEHOLDER } from "@/lib/utils/uae-phone"

const experienceOptions = ["1-2 years", "3-5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"]

const businessTypeOptions = [
    { value: "sole_proprietorship", label: "Sole Proprietorship" },
    { value: "partnership", label: "Partnership" },
    { value: "llc", label: "LLC" },
    { value: "corporation", label: "Corporation" },
]



export default function VendorProfilePage() {
    const [isEditing, setIsEditing] = useState(false)
    const [editedData, setEditedData] = useState({})
    const [activeTab, setActiveTab] = useState("personal")
    const [isSaving, setIsSaving] = useState(false)
    const [saveMessage, setSaveMessage] = useState("")
    const { toast } = useToast();
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('')
    const [subscriptionData, setSubscriptionData] = useState({})

    // rendering profile sections
    const [personalData, setPersonalData] = useState({ firstName: "", lastName: "", email: "", phone: "", status: "" })
    const [businessData, setBusinessData] = useState({ businessName: "", businessType: "", experience: "", description: "" })
    const [addressData, setAddressData] = useState({ address: "", city: "", state: "", zipCode: "" })
    const [servicesData, setServicesData] = useState({ services: [] });
    const [vendorSelectedServices, setVendorSelectedServices] = useState([]);
    const [businessGuid, setBusinessGuid] = useState("")
    const [certifications, setCertifications] = useState([]);

    const handleInputChange = (field, value) => {
        setEditedData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSave = async () => {
        setIsSaving(true)

        try {
            let response
            switch (activeTab) {
                case "personal":
                    if (!isValidUaePhone(editedData.phone)) {
                        toast({
                            title: "Invalid phone number",
                            description: UAE_PHONE_ERROR,
                            variant: "destructive",
                        })
                        return
                    }
                    let payloadPersonal = {
                        firstName: editedData.firstName,
                        lastName: editedData.lastName,
                        phoneNo: toUaePhoneDigits(editedData.phone),
                    }
                    const responseFromProfile = await updateVendorProfileData(payloadPersonal);
                    console.log("responseFromProfile", responseFromProfile);
                    if (responseFromProfile.data.isSuccess) {
                        toast({
                            title: responseFromProfile.data.message,
                            variant: "success",
                        })
                        getVendorPersonalDetail();
                    } else {
                        toast({
                            title: responseFromProfile.data.message,
                            variant: "destructive",
                        })
                    }
                    break
                case "business":
                    let payloadBusiness = {
                        businessName: editedData.businessName,
                        businessType: editedData.businessType,
                        yearsOfExperience: editedData.experience,
                        businessDescrption: editedData.description,
                        licenseNumber: editedData.licenseNumber,
                        insuranceNumber: editedData.insuranceNumber
                    }
                    const responseFrombusiness = await updateVendorBusiness(payloadBusiness);
                    console.log("responseFrombusiness", responseFrombusiness);
                    if (responseFrombusiness.data.isSuccess) {
                        toast({
                            title: responseFrombusiness.data.message,
                            variant: "success",
                        })
                        getVendorBusinessDetail();
                    } else {
                        toast({
                            title: responseFrombusiness.data.message,
                            variant: "destructive",
                        })
                    }
                    break
                case "businessAddress":
                    let payloadBusinessAddress = {
                        streetAddress: editedData.address,
                        city: editedData.city,
                        state: editedData.state,
                        zipCode: editedData.zipCode,
                    }
                    const responseFromBusinessAddress = await updateBusinessAddress(payloadBusinessAddress);
                    if (responseFromBusinessAddress.data.isSuccess) {
                        toast({
                            title: responseFromBusinessAddress.data.message,
                            variant: "success",
                        })
                        getVendorBusinessAddress();
                    } else {
                        toast({
                            title: responseFromBusinessAddress.data.message,
                            variant: "destructive",
                        })
                    }
                    break
                case "services":
                    setIsEditing(false)
                    setSearchQuery('');
                    break
                case "certifications":
                    setIsEditing(false);
                    toast({
                        title: "Certifications updated.",
                        variant: "success",
                    });
                default:
                    break
            }

            if (response?.ok) {
                setIsEditing(false)
                setSaveMessage("Profile updated successfully!")
                setTimeout(() => setSaveMessage(""), 3000)
            } else {
                setSaveMessage("Failed to update profile.")
                setTimeout(() => setSaveMessage(""), 3000)
            }
        } catch (error) {
            console.error(error)
            setSaveMessage("An error occurred while saving.")
            setTimeout(() => setSaveMessage(""), 3000)
        } finally {
            setIsSaving(false)
        }
    }

    const handleServiceToggle = async (serviceId, isChecked) => {
        console.log("Toggled service:", serviceId, "Checked:", isChecked);
        let payload = { serviceId: serviceId, businessGuid: businessGuid }
        console.log("payload", payload);
        try {
            if (isChecked) {
                const checkTheService = await setBusinessServices(payload);
                console.log("checkTheService", checkTheService);
                if (checkTheService.data.isSuccess) {
                    toast({
                        title: checkTheService.data.message,
                        description: `${serviceId} has been added to your services.`,
                        variant: "success",
                    });
                } else {
                    toast({
                        title: checkTheService.data.message,
                        description: `${serviceId} has been added to your services.`,
                        variant: "destructive",
                    });
                }

            } else {
                const deleteTheService = await deleteBusinessServices(payload);
                console.log(payload)
                toast({
                    title: deleteTheService.data.message,
                    description: `${serviceId} has been removed from your services.`,
                    variant: "destructive",
                });
            }
            getVendorSelectedServices();

        } catch (err) {
            console.error("Error updating service:", err);
        }
    };

    const getVendorPersonalDetail = async () => {
        try {
            const reponseVendorProfile = await getVendorProfileData();
            if (reponseVendorProfile.data.result) {
                setPersonalData({
                    firstName: reponseVendorProfile?.data?.result?.firstName || "",
                    lastName: reponseVendorProfile?.data?.result?.lastName || "",
                    email: reponseVendorProfile?.data?.result?.emailAddress || "",
                    phone: reponseVendorProfile?.data?.result?.phoneNo || "",
                    status: reponseVendorProfile?.data?.result?.status || "",
                })
            } else {
                console.error("No vendor personal data found.");
            }
        } catch (error) {
            console.error("Error fetching vendor personal details:", error);
        }
    }

    const getVendorBusinessDetail = async () => {
        try {
            const responseVendorBusiness = await getVendorBusiness();
            if (responseVendorBusiness.data.result) {
                setBusinessData({
                    businessName: responseVendorBusiness?.data?.result?.businessName || "",
                    businessType: responseVendorBusiness?.data?.result?.businessType || "",
                    experience: responseVendorBusiness?.data?.result?.yearsOfExperience || "",
                    description: responseVendorBusiness?.data?.result?.businessDescrption || "",
                    licenseNumber: responseVendorBusiness?.data?.result?.licenseNumber || "",
                    insuranceNumber: responseVendorBusiness?.data?.result?.insuranceNumber || "",
                })
                setBusinessGuid(responseVendorBusiness?.data?.result?.businessGuid)
            } else {
                console.error("No vendor business data found.");
            }

        } catch (error) {
            console.error("Error fetching vendor business details:", error);
        }
    }

    const getVendorBusinessAddress = async () => {
        try {
            const responseVendorBusinessAddress = await getBusinessAddress();
            if (responseVendorBusinessAddress.data.result) {
                setAddressData({
                    address: responseVendorBusinessAddress?.data?.result?.streetAddress || "",
                    city: responseVendorBusinessAddress?.data?.result?.city || "",
                    state: responseVendorBusinessAddress?.data?.result?.state || "",
                    zipCode: responseVendorBusinessAddress?.data?.result?.zipCode || "",
                })
            } else {
                console.error("No vendor business address data found.");
            }
        } catch (error) {
            console.error("Error fetching vendor business address details:", error);
        }
    }

    // const certifications = [
    //     {
    //         id: 1,
    //         name: "ISO 9001",
    //         fileUrl: "/uploads/iso9001.pdf"
    //     },
    //     {
    //         id: 2,
    //         name: "Cyber Security Compliance",
    //         fileUrl: "/uploads/cyber-cert.pdf"
    //     }
    // ]

    const getVendorSelectedServices = async () => {
        try {
            const responseVendorSelectedServices = await getBusinessServices();
            if (responseVendorSelectedServices.data.result) {
                setVendorSelectedServices(responseVendorSelectedServices?.data?.result || [])
            } else {
                console.error("No vendor services data found.");
            }
        } catch (error) {
            console.error("Error fetching vendor services details:", error);
        }
    }

    const getVendorServicesDetail = async () => {
        try {
            const getEachServiceType = await getServiceTypes();
            // console.log("getEachServiceType", getEachServiceType);
            if (getEachServiceType.data.result) {
                setServicesData(getEachServiceType.data.result);
            } else {
                console.error("No vendor services data found.");
            }
        } catch (error) {
            console.error("Error fetching vendor services details:", error);
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        getAllVendorLicences();

    }

    const handleAddCertification = () => {
        const newCert = {
            id: Date.now(), // temp unique ID
            name: `Certification ${certifications.length + 1}`,
            fileUrl: "" // could open a file picker here
        };

        setCertifications((prev) => [...prev, newCert]);
    };

    const handleRemoveCertification = async (certId) => {
        if (certId) {
            try {
                const responseDeleteVendorLicense = await deleteVendorLicense(certId);
                console.log("responseDeleteVendorLicense", responseDeleteVendorLicense);
                if (responseDeleteVendorLicense.data.isSuccess) {
                    toast({
                        title: responseDeleteVendorLicense.data.message,
                        variant: "success",
                    });
                } else {
                    toast({
                        title: responseDeleteVendorLicense.data.message,
                        variant: "destructive",
                    });
                }
                setCertifications((prev) => prev.filter((cert) => cert.fileGuid !== certId));
                getAllVendorLicences();
            } catch (error) {
                console.error("Error deleting vendor license:", error);
            }
        }
        setCertifications((prev) => prev.filter((cert) => cert.fileGuid !== certId));

    };

    const handleCertificationChange = (id, field, value) => {
        setCertifications((prev) =>
            prev.map((cert) =>
                cert.id === id ? { ...cert, [field]: value } : cert
            )
        );
    };

    const showVendorSubscriptionStatus = async () => {
        try {
            const resVenSubStatus = await vendorSubscriptionStatus();
            if (resVenSubStatus.data.isSuccess) {
                setSubscriptionData(resVenSubStatus.data.result);
            }

        } catch (error) {
            console.error(error)
        }
    }

    const handleUploadCertification = async (cert) => {
        if (!cert || !cert.fileName) {
            toast({
                title: "⚠️ Please provide both a name and a file",
                variant: "destructive",
            });
            return;
        }

        const formData = new FormData();
        formData.append("AttachmentName", cert.fileName);
        formData.append("Attachment", cert.file);

        try {
            const response = await uploadVendorLicense(formData);
            // console.log("Uploaded:", response.data);
            toast({
                title: `✅${response.data.message}`,
                variant: "success",
            });

            // Optionally refresh list from API
            getAllVendorLicences();
        } catch (error) {
            console.error("Upload failed:", error);
            toast({
                title: `❌ Upload failed: ${error.message || "Unknown error"}`,
                variant: "destructive",
            });
        }
    };

    const getAllVendorLicences = async () => {
        try {
            const responseVendorLicence = await getVendorLicences();
            if (responseVendorLicence.data.isSuccess) {
                setCertifications(responseVendorLicence?.data?.result || []);
            } else {
                console.error("No vendor licence data found.");
            }
        } catch (error) {
            console.error("Error fetching vendor licence details:", error);
        }
    }

    const renderPersonalInfo = () => (
        <div className="space-y-6">
            {/* Profile Picture */}
            <div className="flex items-center ">
                <div className="relative">
                    {/* <Avatar className="w-24 h-24">
                        <AvatarImage
                            src={vendorData.profileImage || "/placeholder.svg"}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                        <AvatarFallback>
                            {vendorData.firstName[0]}
                            {vendorData.lastName[0]}
                        </AvatarFallback>
                    </Avatar> */}
                    {/* {isEditing && (
                        <Button
                            size="sm"
                            className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-[#B80D2D] hover:bg-[#9A0B26]"
                        >
                            <Camera className="h-4 w-4" />
                        </Button>
                    )} */}
                </div>
                <div className="">
                    <h3 className="text-xl font-bold text-gray-900">
                        {personalData?.firstName} {personalData?.lastName}
                    </h3>
                    <p className="text-gray-600">{personalData.businessName}</p>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center space-x-1">
                            {/* <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{personalData.rating}</span> */}
                        </div>
                        <Badge className={personalData.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"} >
                            {personalData.status === "Active" ? "Active" : "Blocked"}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Personal Details */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                        id="firstName"
                        value={isEditing ? editedData.firstName : personalData?.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                        id="lastName"
                        value={isEditing ? editedData.lastName : personalData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="email"
                            type="email"
                            value={isEditing ? editedData.email : personalData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="phone"
                            type="tel"
                            value={isEditing ? editedData.phone : personalData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder={UAE_PHONE_PLACEHOLDER}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
            </div>
            {isEditing && (
                <div className="  p-4 flex justify-end gap-2">
                    {saveMessage && (
                        <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-lg mr-auto">
                            <CheckCircle className="h-4 w-4 text-green-300" />
                            <span className="text-sm text-green-700">{saveMessage}</span>
                        </div>
                    )}
                    <Button onClick={() => handleCancel()} variant="outline">
                        <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button
                        onClick={() => handleSave(activeTab)}
                        className="bg-[#B80D2D] text-white"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    )

    const renderBusinessInfo = () => (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                        id="businessName"
                        value={isEditing ? editedData.businessName : businessData?.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select
                        value={isEditing ? editedData.businessType : businessData?.businessType}
                        onValueChange={(value) => handleInputChange("businessType", value)}
                        disabled={!isEditing}
                    >
                        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                            <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                            {businessTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="licenseNumber"
                            value={isEditing ? editedData.licenseNumber : businessData?.licenseNumber}
                            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="insuranceNumber">Insurance Number</Label>
                    <div className="relative">
                        <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                            id="insuranceNumber"
                            value={isEditing ? editedData.insuranceNumber : businessData.insuranceNumber}
                            onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
                            disabled={!isEditing}
                            className={`pl-10 ${!isEditing ? "bg-gray-50" : ""}`}
                        />
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select
                        value={isEditing ? editedData.experience : businessData?.experience}
                        onValueChange={(value) => handleInputChange("experience", value)}
                        disabled={!isEditing}
                    >
                        <SelectTrigger className={!isEditing ? "bg-gray-50" : ""}>
                            <SelectValue placeholder="Select experience" />
                        </SelectTrigger>
                        <SelectContent>
                            {experienceOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                    {option}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {/* <div className="space-y-2">
                    <Label htmlFor="foundedYear">Founded Year</Label>
                    <Input
                        id="foundedYear"
                        value={isEditing ? editedData.foundedYear : vendorData.foundedYear}
                        onChange={(e) => handleInputChange("foundedYear", e.target.value)}
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div> */}
                <div className="space-y-2">
                    <Label htmlFor="description">Business Description *</Label>
                    <Textarea
                        id="description"
                        value={isEditing ? editedData.description : businessData?.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        disabled={!isEditing}
                        rows={4}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                </div>
            </div>
            {isEditing && (
                <div className="  p-4 flex justify-end gap-2">
                    {saveMessage && (
                        <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-lg mr-auto">
                            <CheckCircle className="h-4 w-4 text-green-300" />
                            <span className="text-sm text-green-700">{saveMessage}</span>
                        </div>
                    )}
                    <Button onClick={() => handleCancel()} variant="outline">
                        <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button
                        onClick={() => handleSave(activeTab)}
                        className="bg-[#B80D2D] text-white"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    )

    const renderBusinessAddress = () => (
        <div className="space-y-6">
            <div className="space-y-4">
                <Label>Business Address *</Label>
                <div className="space-y-4">
                    <Input
                        value={isEditing ? editedData.address : addressData?.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        placeholder="Street address"
                        disabled={!isEditing}
                        className={!isEditing ? "bg-gray-50" : ""}
                    />
                    <div className="grid md:grid-cols-3 gap-4">
                        <Input
                            value={isEditing ? editedData.city : addressData?.city}
                            onChange={(e) => handleInputChange("city", e.target.value)}
                            placeholder="City"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                        <Input
                            value={isEditing ? editedData.state : addressData?.state}
                            onChange={(e) => handleInputChange("state", e.target.value)}
                            placeholder="State"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                        <Input
                            value={isEditing ? editedData.zipCode : addressData?.zipCode}
                            onChange={(e) => handleInputChange("zipCode", e.target.value)}
                            placeholder="ZIP Code"
                            disabled={!isEditing}
                            className={!isEditing ? "bg-gray-50" : ""}
                        />
                    </div>
                </div>
            </div>
            {isEditing && (
                <div className="  p-4 flex justify-end gap-2">
                    {saveMessage && (
                        <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-lg mr-auto">
                            <CheckCircle className="h-4 w-4 text-green-300" />
                            <span className="text-sm text-green-700">{saveMessage}</span>
                        </div>
                    )}
                    <Button onClick={() => handleCancel()} variant="outline">
                        <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button
                        onClick={() => handleSave(activeTab)}
                        className="bg-[#B80D2D] text-white"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    )

    const renderServices = () => {

        // Filter services based on search query
        const filteredSearchServices = servicesData.filter((service) =>
            service.categoryName.toLowerCase().includes(searchQuery.toLowerCase())
        )

        return (
            <div className="space-y-6">
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Services You Offer</h3>
                    <p className="text-gray-600">Select all services that your business provides to customers</p>
                </div>

                {!isEditing && (
                    <div className="mb-6">
                        <Label className="text-base font-medium">Current Services:</Label>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {vendorSelectedServices.map((service) => {
                                const matched = servicesData.find(
                                    (s) => s.id === service.serviceId
                                )

                                return (
                                    <Badge
                                        key={service.serviceId}
                                        className="bg-[#B80D2D] text-white px-3 py-1"
                                    >
                                        {matched?.categoryName || `Service #${service.serviceId}`}
                                    </Badge>
                                )
                            })}
                        </div>
                    </div>
                )}

                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B80D2D] focus:border-transparent outline-none"
                    />
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredSearchServices.length > 0 ? (
                        filteredSearchServices.map((service) => {
                            const isSelected = vendorSelectedServices.some(
                                (s) => s.serviceId === service.id && s.status === "Active"
                            )
                            return (
                                <div
                                    key={service.id}
                                    className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors ${isSelected
                                        ? "bg-[#B80D2D]/5 border-[#B80D2D]"
                                        : "hover:bg-gray-50 border-gray-200"
                                        } ${!isEditing ? "opacity-60" : "hover:bg-gray-50"}`}
                                >
                                    <Checkbox
                                        id={service.id.toString()}
                                        checked={isSelected}
                                        onCheckedChange={(checked) =>
                                            isEditing && handleServiceToggle(service.id, checked)
                                        }
                                        disabled={!isEditing}
                                        className="data-[state=checked]:bg-[#B80D2D] data-[state=checked]:border-[#B80D2D]"
                                    />

                                    <Label
                                        htmlFor={service.id.toString()}
                                        className={`flex-1 ${isEditing ? "cursor-pointer" : "cursor-default"}`}
                                    >
                                        {service.categoryName}
                                    </Label>
                                </div>
                            )
                        })
                    ) : (
                        <div className="col-span-full text-center py-8 text-gray-500">
                            No services found matching "{searchQuery}"
                        </div>
                    )}
                </div>

                {isEditing && (
                    <div className="p-4 flex justify-end gap-2">
                        <Button onClick={() => handleCancel()} variant="outline">
                            <X className="h-4 w-4 mr-2" /> Cancel
                        </Button>
                        <Button
                            onClick={() => handleSave(activeTab)}
                            className="bg-[#B80D2D] text-white"
                        >
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>
        )
    }

    const renderCertifications = () => (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Certifications</h3>
                <p className="text-gray-600">Attach all certifications your business holds</p>
            </div>

            {/* Current certifications (read-only) */}
            {!isEditing && (
                <div className="mb-6">
                    <Label className="text-base font-medium">Current Certifications:</Label>
                    <div className="space-y-3 mt-3">
                        {(!certifications || certifications.length === 0) && (
                            <p className="text-gray-500 text-sm">No certifications uploaded</p>
                        )}
                        {certifications?.map((cert, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between border rounded-lg p-3 bg-gray-50"
                            >
                                <div className="flex items-center gap-3">
                                    <Paperclip className="w-4 h-4 text-gray-500" />
                                    <span className="font-medium text-gray-800">{cert.fileName}</span>
                                </div>
                                {cert.filePath && (
                                    <a
                                        href={cert.filePath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-[#B80D2D] hover:underline"
                                    >
                                        View File
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Editable list */}
            {isEditing && (
                <div className="space-y-3">
                    {(!certifications || certifications.length === 0) && (
                        <p className="text-blue-600 text-sm">No certifications added yet</p>
                    )}

                    {certifications?.map((cert, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 border rounded-lg p-3 bg-blue-50 hover:bg-blue-100 transition-colors"
                        >
                            <Input
                                type="text"
                                placeholder="Certification Name"
                                value={cert.fileName || ""}
                                onChange={(e) =>
                                    handleCertificationChange(cert.id, "fileName", e.target.value)
                                }
                                className="w-1/3"
                            />

                            <Input
                                type="file"
                                onChange={(e) =>
                                    handleCertificationChange(
                                        cert.id,
                                        "file",
                                        e.target.files?.[0] || null
                                    )
                                }
                                className="w-1/3"
                            />

                            <Button
                                size="sm"
                                disabled={!!cert.filePath}
                                className="bg-[#B80D2D] text-white w-1/4"
                                onClick={() => handleUploadCertification(cert)}
                            >
                                Upload
                            </Button>

                            <Button
                                size="sm"
                                variant="outline"
                                className="w-1/4"
                                onClick={() => handleRemoveCertification(cert.fileGuid)}
                            >
                                Remove
                            </Button>
                        </div>
                    ))}

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleAddCertification}
                    >
                        + Add Certification
                    </Button>
                </div>
            )}

            {isEditing && (
                <div className="p-4 flex justify-end gap-2">
                    <Button onClick={() => handleCancel()} variant="outline">
                        <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button
                        onClick={() => handleSave("certifications")}
                        className="bg-[#B80D2D] text-white"
                    >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    );

    const renderSubscriptionPlan = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-3">
                <h3 className="text-lg font-bold text-gray-900">Subscription Plan</h3>
                <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${subscriptionData?.status == "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {subscriptionData?.status}
                </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <p className="text-sm text-gray-500">Subscription Type</p>
                    <p className="text-base font-medium text-gray-800">
                        {subscriptionData?.subscriptionType}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Price at Purchase</p>
                    <p className="text-base font-medium text-gray-800">
                        ${subscriptionData?.priceAtPurchase}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Start Date</p>
                    <p className="text-base font-medium text-gray-800">
                        {new Date(subscriptionData?.startDate).toLocaleDateString()}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">End Date</p>
                    <p className="text-base font-medium text-gray-800">
                        {new Date(subscriptionData?.endDate).toLocaleDateString()}
                    </p>
                </div>
                <div className="hidden">
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-base font-mono text-gray-700 break-all">
                        {subscriptionData?.orderGuid}
                    </p>
                </div>
                <div className="hidden">
                    <p className="text-sm text-gray-500">Vendor Subscription ID</p>
                    <p className="text-base font-mono text-gray-700 break-all">
                        {subscriptionData?.vendorSubscriptionGuid}
                    </p>
                </div>
                <div className="hidden">
                    <p className="text-sm text-gray-500">Subscription GUID</p>
                    <p className="text-base font-mono text-gray-700 break-all">
                        {subscriptionData?.subscriptionGuid}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-base font-medium text-gray-800">
                        {new Date(subscriptionData?.updatedOn).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );


    const tabs = [
        { id: "personal", label: "Personal Info", icon: User },
        { id: "business", label: "Business Info", icon: Info },
        { id: "businessAddress", label: "Business Address", icon: Building2 },
        { id: "services", label: "Services", icon: Settings },
        { id: "certifications", label: "Certification", icon: Award },
        { id: "subscriptions", label: "Subscription", icon: CreditCard },
    ]

    const handleEditClick = () => {
        setIsEditing(true);
        // Initialize editedData based on active tab
        switch (activeTab) {
            case "personal":
                setEditedData({
                    firstName: personalData.firstName,
                    lastName: personalData.lastName,
                    email: personalData.email,
                    phone: personalData.phone,
                });
                break;
            case "business":
                setEditedData({
                    businessName: businessData.businessName,
                    businessType: businessData.businessType,
                    experience: businessData.experience,
                    description: businessData.description,
                    licenseNumber: businessData.licenseNumber,
                    insuranceNumber: businessData.insuranceNumber,
                });
                break;
            case "businessAddress":
                setEditedData({
                    address: addressData.address,
                    city: addressData.city,
                    state: addressData.state,
                    zipCode: addressData.zipCode,
                });
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        getVendorPersonalDetail();
        getVendorBusinessDetail();
        getVendorBusinessAddress();
        getVendorServicesDetail();
        getVendorSelectedServices();
        getAllVendorLicences();
        showVendorSubscriptionStatus();
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pb-32">
            {/* Header */}

            {/* Action Bar
            {isEditing && (
                <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-4 flex justify-end gap-2 z-50">
                    {saveMessage && (
                        <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-lg mr-auto">
                            <CheckCircle className="h-4 w-4 text-green-300" />
                            <span className="text-sm text-green-700">{saveMessage}</span>
                        </div>
                    )}
                    <Button onClick={handleCancel} variant="outline">
                        <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving} className="bg-[#B80D2D] text-white">
                        {isSaving ? "Saving..." : <> <Save className="h-4 w-4 mr-2" /> Save Changes</>}
                    </Button>
                </div>
            )} */}

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
                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <Card className="border-0 shadow-lg bg-white sticky top-8">
                            <CardContent className="p-6">
                                <nav className="space-y-2">
                                    {tabs.map((tab) => {
                                        const Icon = tab.icon
                                        return (
                                            <button
                                                key={tab.id}
                                                disabled={isEditing}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id
                                                    ? "bg-[#B80D2D] text-white"
                                                    : "text-gray-600 hover:bg-gray-100"
                                                    }   ${isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                                <span className="font-medium">{tab.label}</span>
                                            </button>
                                        )
                                    })}
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Card className="border-0 shadow-lg bg-white">
                            <CardHeader className="flex flex-row items-center justify-between px-8 py-4 w-full">
                                {/* Left: Title */}
                                <CardTitle className="lg:text-[30px] text-[24px] font-bold text-gray-900">
                                    Vendor Profile
                                </CardTitle>
                                {/* Right: Edit Button */}
                                {!isEditing && activeTab !== "subscriptions" && (
                                    <Button
                                        size="sm"
                                        className="bg-[#B80D2D] text-white hover:bg-[#9A0B26]"
                                        onClick={handleEditClick}
                                    >
                                        <Edit3 className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                )}
                            </CardHeader>

                            <CardContent className="p-8">
                                {activeTab === "personal" && renderPersonalInfo()}
                                {activeTab === "business" && renderBusinessInfo()}
                                {activeTab === "businessAddress" && renderBusinessAddress()}
                                {activeTab === "services" && renderServices()}
                                {activeTab === "certifications" && renderCertifications()}
                                {activeTab === "subscriptions" && renderSubscriptionPlan()}
                            </CardContent>
                        </Card>
                    </div>

                </div>
            </div>
        </div>
    )
}
