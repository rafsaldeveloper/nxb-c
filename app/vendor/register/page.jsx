"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Shield,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  AlertTriangle,
} from "lucide-react"

import VendorOTPBox from "@/components/vendorOTPDialog"
import { submitVendorRegistration, vendorRegister } from "@/lib/api/auth"
import { useToast } from "@/hooks/use-toast"
import { getServiceTypes } from "@/lib/api/commonApi"
import { isValidUaePhone, toUaePhoneDigits, UAE_PHONE_ERROR, UAE_PHONE_PLACEHOLDER } from "@/lib/utils/uae-phone"
import { title } from "process"

const serviceOptions = [
  { id: 1, label: "Roofing Services" },
  { id: 2, label: "Ceiling Installation" },
  { id: 3, label: "Flooring Services" },
  { id: 4, label: "Electrical Services" },
  { id: 5, label: "Plumbing Services" },
  { id: 6, label: "HVAC Services" },
  { id: 7, label: "Painting Services" },
  { id: 8, label: "Carpentry Services" },
  { id: 9, label: "Masonry Services" },
  { id: 10, label: "Landscaping Services" },
];


const experienceOptions = ["1-2 years", "3-5 years", "6-10 years", "11-15 years", "16-20 years", "20+ years"]

export default function VendorRegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const [vendGuid, setVendGuid] = useState('');
  const [formData, setFormData] = useState({
    // Personal Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    // Business Info
    businessName: "",
    businessType: "",
    licenseNumber: "",
    insuranceNumber: "",
    experience: "",
    description: "",
    address: "",
    country: "",
    city: "",
    state: "",
    zipCode: "",
    // Services
    services: [],
    licenseName: "",
    licenseFile: null,
    // Payment
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    billingAddress: "",
    // Terms
    agreeToTerms: false,
    agreeToPrivacy: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
  const [errors, setErrors] = useState({})
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    specialChar: false
  });
  const [serviceList, setServiceList] = useState([])

  // Filter the services based on the search term
  const filteredServices = serviceList.filter((service) =>
    service.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // console.log(filteredServices)

  // Password validation function
  const validatePassword = (password) => {
    const validation = {
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    }
    setPasswordValidation(validation)
    return Object.values(validation).every(Boolean)
  }

  // Form validation functions
  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!isValidUaePhone(formData.phone)) {
      newErrors.phone = UAE_PHONE_ERROR
    }
    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password does not meet requirements"
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }
    if (!formData.businessType) {
      newErrors.businessType = "Business type is required"
    }
    if (!formData.insuranceNumber) {
      newErrors.insuranceNumber = "Confirm License Number is required"
    }
    if (!formData.licenseNumber) {
      newErrors.licenseNumber = "License Number is required"
    }
    if (!formData.experience) {
      newErrors.experience = "Years of experience is required"
    }
    if (!formData.description.trim()) {
      newErrors.description = "Business description is required"
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Business description must be at least 50 characters"
    }
    if (!formData.address.trim()) {
      newErrors.address = "Address is required"
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }
    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }


    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = () => {
    const newErrors = {}

    if (formData.services.length === 0) {
      newErrors.services = "Please select at least one service"
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the Terms of Service"
    }
    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = "You must agree to the Privacy Policy"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3Files = () => {
    const newErrors = {}

    if (!formData.licenseName || formData.licenseName.trim() === "") {
      newErrors.licenseName = "License name is required"
    }

    if (!formData.licenseFile) {
      newErrors.licenseFile = "License file is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }

    // Validate password in real-time
    if (field === 'password') {
      validatePassword(value)
    }
  }

  const handleServiceToggle = (service) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter((s) => s !== service)
        : [...prev.services, service],
    }))
  }

  const clearTheForm = () => {
    setFormData({
      // Personal Info
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      // Business Info
      businessName: "",
      businessType: "",
      licenseNumber: "",
      insuranceNumber: "",
      experience: "",
      description: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      // Services
      services: [],
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validate all steps before final submission
    const step1Valid = validateStep1()
    const step2Valid = validateStep2()
    const step3Valid = validateStep3Files()
    const step4Valid = validateStep3()
    if (!step1Valid || !step2Valid || !step3Valid) {
      // Go to the first step with errors
      if (!step1Valid) setCurrentStep(1)
      else if (!step2Valid) setCurrentStep(2)
      else if (!step3Valid) setCurrentStep(3)
      else if (!step4Valid) setCurrentStep(4)
      return
    }
    setIsLoading(true)

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      emailAddress: formData.email,
      phoneNumber: toUaePhoneDigits(formData.phone),
      pwd: formData.password,
      businessName: formData.businessName,
      businessType: formData.businessType,
      licenseNumber: formData.licenseNumber,
      insuranceNumber: formData.insuranceNumber,
      yearsofExperience: formData.experience,
      businessDescription: formData.description,
      businessStreetAddress: formData.address,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zipCode: formData.zipCode,
      providingServices: formData.services,
      licenseName: formData.licenseName,
      licenseFile: formData.licenseFile,
    };

    console.log("Payload to be sent:", payload);
    try {
      const response = await submitVendorRegistration(payload);
      // console.log(payload)
      // console.log(RetData.data)
      const RetData = response.data;
      if (response) {
        setTimeout(() => {
          setIsLoading(false)
          // document.cookie = `accessToken=${userRoles.accessToken}; path=/; max-age=${60 * 60 * 24}; secure; samesite=strict`
          // document.cookie = `refreshToken=${userRoles.refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`
          // document.cookie = `userName=${userRoles.userName}; path=/; max-age=${60 * 60 * 24}`
          // document.cookie = `userStatus=${userRoles.userStatus}; path=/; max-age=${60 * 60 * 24}`
          // document.cookie = `role=${userRoles.role}; path=/; max-age=${60 * 60 * 24}`
          // router.push("/vendor/dashboard")
          if (RetData.isSuccess === true) {
            toast({
              title: `✅  ${RetData.message}`,
              variant: "success",
            });
            setCurrentStep(5);
            setVendGuid(RetData.result.ven_id)
            clearTheForm();
          } else {
            console.log("hitted here !! in if else condition")
            setIsLoading(false)
            toast({
              title: ` ${RetData.title}`,
              variant: "destructive",
            })
          }
        }, 1000)
      }
    } catch (error) {
      console.log("hitted here !! in catch", error);
      setIsLoading(false);

      let errorMessage = "Something went wrong";

      if (error.response?.data) {
        const data = error.response.data;

        // If there's a message field
        if (data.message) {
          errorMessage = data.message;
        }
        // If there are field-specific errors like BusinessDescription
        else {
          // Collect all error messages from fields
          errorMessage = data.title
        }
      }

      toast({
        title: errorMessage,
        variant: "destructive",
      });
    }
  }

  const nextStep = () => {
    if (currentStep < 5) {
      let isValid = false

      // Validate current step before proceeding
      if (currentStep === 1) {
        isValid = validateStep1()
      } else if (currentStep === 2) {
        isValid = validateStep2()
      } else if (currentStep === 3) {
        isValid = validateStep3Files();
      }

      if (!isValid) {
        return // Don't proceed if validation fails
      }

      // Show confirmation dialog for step 2 (business info)
      if (currentStep === 3) {
        setShowConfirmationDialog(true)
      } else {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const handleFileChange = (index, key, value) => {
    const newFiles = [...formData.files]
    newFiles[index] = { ...newFiles[index], [key]: value }
    setFormData((prev) => ({ ...prev, files: newFiles }))
  }

  // const addFileField = () => {
  //   setFormData((prev) => ({ ...prev, files: [...prev.files, { fileName: "", fileAttachment: null }] }))
  // }

  const removeFileField = (index) => {
    setFormData((prev) => ({ ...prev, files: prev.files.filter((_, i) => i !== index) }))
  }

  const confirmNextStep = () => {
    setShowConfirmationDialog(false)
    setCurrentStep(currentStep + 1)
  }

  const cancelNextStep = () => {
    setShowConfirmationDialog(false)
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${step <= currentStep ? "bg-[#B80D2D] text-white" : "bg-gray-200 text-gray-500"
              }`}
          >
            {step < currentStep ? <CheckCircle className="lg:h-5 lg:w-5 h-3 w-3" /> : step}
          </div>
          {step < 5 && <div className={`lg:w-16 w-3 h-1 mx-2 ${step < currentStep ? "bg-[#B80D2D]" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-600">Let's start with your basic details</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeholder="Enter your first name"
            className={errors.firstName ? "border-red-500 focus:border-red-500" : ""}
            required
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeholder="Enter your last name"
            className={errors.lastName ? "border-red-500 focus:border-red-500" : ""}
            required
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="Enter your email"
              className={`pl-10 ${errors.email ? "border-red-500 focus:border-red-500" : ""}`}
              required
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder={UAE_PHONE_PLACEHOLDER}
              className={`pl-10 ${errors.phone ? "border-red-500 focus:border-red-500" : ""}`}
              required
            />
          </div>
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            placeholder="Create a strong password"
            className={errors.password ? "border-red-500 focus:border-red-500" : ""}
            required
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
          {/* Password Requirements */}
          {formData.password && (
            <div className="space-y-1 text-xs">
              <div className={`flex items-center gap-2 ${passwordValidation.length ? 'text-green-600' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.length ? 'bg-green-500' : 'bg-gray-300'}`} />
                At least 6 characters
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.uppercase ? 'bg-green-500' : 'bg-gray-300'}`} />
                One uppercase letter
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.lowercase ? 'bg-green-500' : 'bg-gray-300'}`} />
                One lowercase letter
              </div>
              <div className={`flex items-center gap-2 ${passwordValidation.specialChar ? 'text-green-600' : 'text-gray-500'}`}>
                <div className={`w-2 h-2 rounded-full ${passwordValidation.specialChar ? 'bg-green-500' : 'bg-gray-300'}`} />
                One special character
              </div>
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password *</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
            placeholder="Confirm your password"
            className={errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""}
            required
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Business Information</h2>
        <p className="text-gray-600">Tell us about your construction business</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="businessName">Business Name *</Label>
          <Input
            id="businessName"
            value={formData.businessName}
            onChange={(e) => handleInputChange("businessName", e.target.value)}
            placeholder="Enter your business name"
            className={errors.businessName ? "border-red-500 focus:border-red-500" : ""}
            required
          />
          {errors.businessName && (
            <p className="text-sm text-red-500">{errors.businessName}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessType">Business Type *</Label>
          <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
            <SelectTrigger className={errors.businessType ? "border-red-500 focus:border-red-500" : ""}>
              <SelectValue placeholder="Select business type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="llc">LLC</SelectItem>
              <SelectItem value="corporation">Corporation</SelectItem>
            </SelectContent>
          </Select>
          {errors.businessType && (
            <p className="text-sm text-red-500">{errors.businessType}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input
            id="licenseNumber"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
            placeholder="Enter your license number"
            className={errors.licenseNumber ? "border-red-500 focus:border-red-500" : ""}
          />
          {errors.licenseNumber && (
            <p className="text-sm text-red-500">{errors.licenseNumber}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="insuranceNumber">Confirm License Number</Label>
          <Input
            id="insuranceNumber"
            className={errors.insuranceNumber ? "border-red-500 focus:border-red-500" : ""}
            value={formData.insuranceNumber}
            onChange={(e) => handleInputChange("insuranceNumber", e.target.value)}
            placeholder="Confirm Your License number"
          />
          {errors.insuranceNumber && (
            <p className="text-sm text-red-500">{errors.insuranceNumber}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="experience">Years of Experience *</Label>
        <Select value={formData.experience} onValueChange={(value) => handleInputChange("experience", value)}>
          <SelectTrigger className={errors.experience ? "border-red-500 focus:border-red-500" : ""}>
            <SelectValue placeholder="Select your experience" />
          </SelectTrigger>
          <SelectContent>
            {experienceOptions.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.experience && (
          <p className="text-sm text-red-500">{errors.experience}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Business Description *</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          placeholder="Describe your business, specialties, and what makes you unique..."
          rows={4}
          className={errors.description ? "border-red-500 focus:border-red-500" : ""}
          required
        />
        {errors.description && (
          <p className="text-sm text-red-500">{errors.description}</p>
        )}
        <p className="text-xs text-gray-500">
          {formData.description.length}/50 characters minimum
        </p>
      </div>

      <div className="space-y-4">
        <Label>Business Address *</Label>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="space-y-2">
              <Input
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Street address"
                className={errors.address ? "border-red-500 focus:border-red-500" : ""}
                required
              />
              {errors.address && (
                <p className="text-sm text-red-500">{errors.address}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                value={formData.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                placeholder="City"
                className={errors.city ? "border-red-500 focus:border-red-500" : ""}
                required
              />
              {errors.city && (
                <p className="text-sm text-red-500">{errors.city}</p>
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 grid-cols-1">

            <div className="space-y-2">
              <Input
                value={formData.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                placeholder="State"
                className={errors.state ? "border-red-500 focus:border-red-500" : ""}
                required
              />
              {errors.state && (
                <p className="text-sm text-red-500">{errors.state}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                value={formData.country}
                onChange={(e) => handleInputChange("country", e.target.value)}
                placeholder="country"
                className={errors.country ? "border-red-500 focus:border-red-500" : ""}
                required
              />
              {errors.country && (
                <p className="text-sm text-red-500">{errors.country}</p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                value={formData.zipCode}
                onChange={(e) => handleInputChange("zipCode", e.target.value)}
                placeholder="ZIP Code"
                className={errors.zipCode ? "border-red-500 focus:border-red-500" : ""}
                required
              />
              {errors.zipCode && (
                <p className="text-sm text-red-500">{errors.zipCode}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep3Files = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Upload License</h2>
        <p className="text-gray-600">
          Please upload your business license file with a name
        </p>
      </div>

      {/* License Name */}
      <div className="space-y-2">
        <Label htmlFor="licenseName">License Name *</Label>
        <Input
          id="licenseName"
          placeholder="Enter license name"
          value={formData.licenseName || ""}
          onChange={(e) => handleInputChange("licenseName", e.target.value)}
        />
      </div>
      {errors.licenseName && (
        <p className="text-sm text-red-500">{errors.licenseName}</p>
      )}

      {/* License File */}
      <div className="space-y-2">
        <Label htmlFor="licenseFile">License File *</Label>
        <Input
          id="licenseFile"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          onChange={(e) =>
            handleInputChange("licenseFile", e.target.files?.[0] || null)
          }
        />
      </div>
      {errors.licenseFile && (
        <p className="text-sm text-red-500">{errors.licenseFile}</p>
      )}


      {/* Note */}
      <p className="text-sm text-gray-500 mt-4">
        ℹ️ You can upload additional documents later in your profile section.
      </p>
    </div>
  );


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 16; // how many services per page

  const totalPages = Math.ceil(filteredServices.length / pageSize);
  const paginatedServices = filteredServices.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Services Offered</h2>
        <p className="text-gray-600">Select the services you provide</p>
      </div>
      {/* Search Input */}
      <div>
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {paginatedServices.length > 0 ? (
          paginatedServices.map((service) => (
            <div
              key={service.id}
              className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50"
            >
              <Checkbox
                id={service.id}
                checked={formData.services.includes(service.id)}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <Label htmlFor={service} className="flex-1 cursor-pointer">
                {service.categoryName}
              </Label>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4 col-span-2">
            No services found.
          </div>
        )}

      </div>


      {errors.services && (
        <p className="text-sm text-red-500">{errors.services}</p>
      )}

      {formData.services.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-medium text-green-900 mb-2">Selected Services:</h3>
          <div className="flex flex-wrap gap-2">
            {formData.services.map((serviceId) => {
              const service = serviceList.find((s) => s.id === serviceId);
              return (
                <span key={serviceId} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {service ? service.categoryName : "Unknown"}
                </span>
              );
            })}
          </div>
        </div>
      )}
      <div className="flex justify-center items-center space-x-2 mt-4 ">
        <Button
          type="button"
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => p - 1)}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          type="button"
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      {/* Terms and Conditions */}
      <div className="space-y-4 pt-4 border-t">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked)}
          />
          <Label htmlFor="agreeToTerms" className="text-sm leading-relaxed">
            I agree to the{" "}
            <Link href="/terms-and-conditions" target="_blank" className="text-[#B80D2D] hover:underline">
              Terms of Service
            </Link>.
          </Label>
        </div>
        {errors.agreeToTerms && (
          <p className="text-sm text-red-500 ml-6">{errors.agreeToTerms}</p>
        )}
        <div className="flex items-start space-x-3">
          <Checkbox
            id="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked)}
          />
          <Label htmlFor="agreeToPrivacy" className="text-sm leading-relaxed">
            I agree to the{" "}
            <Link href="/privacy-policy" target="_blank" className="text-[#B80D2D] hover:underline">
              Privacy Policy
            </Link>{" "}
            and consent to the processing of my personal data.
          </Label>
        </div>
        {errors.agreeToPrivacy && (
          <p className="text-sm text-red-500 ml-6">{errors.agreeToPrivacy}</p>
        )}
      </div>


    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Email Verification</h2>
        <p className="text-gray-600">Please verify your email address to complete registration</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
        {/* <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-blue-600" />
        </div> */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Check your email</h3>
        <p className="text-gray-600 mb-4">
          We've sent a verification code to <strong>{formData.email}</strong>
        </p>
        <p className="text-sm text-gray-500">
          Please check your inbox and enter the 6-digit code below to verify your email address.
        </p>
      </div>

      <div className="space-y-4">
        <VendorOTPBox
          modalOpen={true}
          onVerificationSuccess={() => {
            // Redirect to dashboard after successful OTP verification
            router.push("/vendor/dashboard")
          }}
          vendGuid={vendGuid}
        />
      </div>
    </div>
  )

  const getServiceType = async () => {
    try {
      const ListAllServices = await getServiceTypes();
      console.log(ListAllServices.data.result);
      setServiceList(ListAllServices.data.result);
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getServiceType();
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}


      <div className="container mx-auto px-4 max-w-4xl py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join Nexus Built</h1>
          <p className="text-xl text-gray-600">Start and grow your construction business</p>
        </div>

        {renderStepIndicator()}

        <Card className="border-0 shadow-xl bg-white">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3Files()}
              {currentStep === 4 && renderStep3()}
              {currentStep === 5 && renderStep4()}

              {/* Only show buttons for steps 1-3, hide for step 4 (OTP verification) */}
              {currentStep < 5 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className="bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </Button>

                  {currentStep < 4 ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white"
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920] text-white"
                    >
                      {isLoading ? "Processing..." : "Submit Details"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmationDialog} onOpenChange={setShowConfirmationDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              Confirm Changes
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              {currentStep === 3
                ? "You are about to proceed to the services selection step. Once you continue, you won't be able to modify your business information without starting over. Are you sure you want to continue?"
                : "You are about to proceed to the final step. Once you continue, you won't be able to modify your selected services without starting over. Are you sure you want to continue?"
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelNextStep}>
              Go Back
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmNextStep}
              className="bg-gradient-to-r from-[#B80D2D] to-[#9A0B26] hover:from-[#9A0B26] hover:to-[#7A0920]"
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
